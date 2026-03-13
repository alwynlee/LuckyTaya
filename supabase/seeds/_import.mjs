import { createClient } from '../../node_modules/@supabase/supabase-js/dist/module/index.js';
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Parse .env.local manually
const envPath = join(dirname(fileURLToPath(import.meta.url)), '../../.env.local');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(l => l.includes('=') && !l.startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim()]; })
);

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

const seedDir = dirname(fileURLToPath(import.meta.url));
const files = readdirSync(seedDir).filter(f => f.endsWith('.sql') && !f.startsWith('_')).sort();

for (const file of files) {
  const sql = readFileSync(join(seedDir, file), 'utf8');

  // Extract values between the $JSON$ delimiters
  const jsonMatch = sql.match(/\$JSON\$([\s\S]*?)\$JSON\$/);
  if (!jsonMatch) { console.error(`No JSON found in ${file}`); continue; }

  // Extract section_slug, page_slug, title from the VALUES block
  const slugsMatch = sql.match(/VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'/);
  if (!slugsMatch) { console.error(`Could not parse slugs in ${file}`); continue; }

  const [, section_slug, page_slug, title] = slugsMatch;
  let content;
  try {
    content = JSON.parse(jsonMatch[1].trim());
  } catch (e) {
    console.error(`Invalid JSON in ${file}:`, e.message);
    continue;
  }

  const { error } = await supabase.from('documents').upsert(
    { section_slug, page_slug, title, content, updated_by: 'system' },
    { onConflict: 'section_slug,page_slug' }
  );

  if (error) {
    console.error(`❌ ${file}: ${error.message}`);
  } else {
    console.log(`✅ ${section_slug}/${page_slug} — ${title}`);
  }
}
