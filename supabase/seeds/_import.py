#!/usr/bin/env python3
import os, re, json, urllib.request, urllib.error
from pathlib import Path

# Parse .env.local
env = {}
env_path = Path(__file__).parent.parent.parent / '.env.local'
for line in env_path.read_text().splitlines():
    if '=' in line and not line.startswith('#'):
        k, _, v = line.partition('=')
        env[k.strip()] = v.strip()

url_base = env['NEXT_PUBLIC_SUPABASE_URL'].rstrip('/')
service_key = env['SUPABASE_SERVICE_ROLE_KEY']
endpoint = f"{url_base}/rest/v1/documents"

headers = {
    'Authorization': f'Bearer {service_key}',
    'apikey': service_key,
    'Content-Type': 'application/json',
    'Prefer': 'resolution=merge-duplicates,return=minimal',
}

seeds_dir = Path(__file__).parent
sql_files = sorted(f for f in seeds_dir.iterdir() if f.suffix == '.sql' and not f.name.startswith('_'))

for sql_file in sql_files:
    sql = sql_file.read_text()

    json_match = re.search(r'\$JSON\$([\s\S]*?)\$JSON\$', sql)
    slugs_match = re.search(r"VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'", sql)

    if not json_match or not slugs_match:
        print(f"❌ Could not parse {sql_file.name}")
        continue

    section_slug, page_slug, title = slugs_match.groups()
    try:
        content = json.loads(json_match.group(1).strip())
    except json.JSONDecodeError as e:
        print(f"❌ Invalid JSON in {sql_file.name}: {e}")
        continue

    payload = json.dumps({
        'section_slug': section_slug,
        'page_slug': page_slug,
        'title': title,
        'content': content,
        'updated_by': 'system',
    }).encode()

    req = urllib.request.Request(endpoint, data=payload, headers=headers, method='POST')
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"✅ {section_slug}/{page_slug} — {title}")
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"❌ {section_slug}/{page_slug}: HTTP {e.code} — {body[:200]}")
