-- =============================================================================
-- iGaming Philippines — Internal Wiki  •  Seed data
-- Run AFTER schema.sql. Safe to re-run — uses ON CONFLICT DO UPDATE.
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- SECTIONS  (5 total)
-- ─────────────────────────────────────────────────────────────────────────────
INSERT INTO sections (slug, title, icon, colour, display_order) VALUES
  ('organisation',   'Organisation',     'Users',         '#0B704E', 1),
  ('kyc',            'KYC',              'Shield',        '#CC0B1A', 2),
  ('vip',            'VIP',              'Star',          '#AF5700', 3),
  ('fraud-payments', 'Fraud & Payments', 'AlertTriangle', '#E53C0E', 4),
  ('affiliate',      'Affiliate',        'Globe',         '#0B704E', 5)
ON CONFLICT (slug) DO UPDATE SET
  title         = EXCLUDED.title,
  icon          = EXCLUDED.icon,
  colour        = EXCLUDED.colour,
  display_order = EXCLUDED.display_order;

-- =============================================================================
-- ORGANISATION  (2 pages)
-- =============================================================================

-- ── Org Chart ────────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'organisation', 'org-chart', 'Org Chart',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Organisational Structure"}]},
    {"type":"paragraph","content":[{"type":"text","text":"iGaming Philippines operates under a flat management structure with five core departments, each reporting directly to the Country Manager. This page is the canonical reference for team ownership and reporting lines."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Leadership Team"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Country Manager","marks":[{"type":"bold"}]},{"type":"text","text":" — Overall P&L ownership, PAGCOR licensee representative, final escalation authority."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Operations","marks":[{"type":"bold"}]},{"type":"text","text":" — Platform stability, customer support, and cross-team SLA governance."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of KYC & Compliance","marks":[{"type":"bold"}]},{"type":"text","text":" — Identity verification, AML programme, PAGCOR regulatory submissions."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of VIP & Retention","marks":[{"type":"bold"}]},{"type":"text","text":" — High-value player management, tier governance, retention strategy."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Fraud & Payments","marks":[{"type":"bold"}]},{"type":"text","text":" — Transaction monitoring, chargeback management, payment gateway operations."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate","marks":[{"type":"bold"}]},{"type":"text","text":" — Partner acquisition, multi-tier commission structures, affiliate compliance."}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Support Functions"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Human Resources","marks":[{"type":"bold"}]},{"type":"text","text":" — Recruitment, onboarding, payroll, DOLE compliance."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Technology","marks":[{"type":"bold"}]},{"type":"text","text":" — Platform engineering, integrations, data infrastructure."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Finance","marks":[{"type":"bold"}]},{"type":"text","text":" — Accounting, treasury, regulatory financial reporting."}]}]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"This chart is reviewed and updated quarterly. For headcount changes or structural amendments, submit a request to HR with Country Manager approval."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Hiring Timeline ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'organisation', 'hiring-timeline', 'Hiring Timeline',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Hiring Process & Timeline"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The standard end-to-end hiring process for all roles. Target total duration is 3–4 weeks from job posting to start date. PAGCOR-regulated roles may require additional background checks."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Process Steps"}]},
    {"type":"orderedList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Job Posting","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 1–3) — JD approved by department head and HR. Published on LinkedIn, Jobstreet, and internal referral channels."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Application Screening","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 4–8) — HR shortlists top 5–10 candidates. Automated acknowledgement sent within 24 hours of application."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"First Interview","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 9–11) — 30-minute video call with HR. Covers culture fit, availability, and salary expectations."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical / Task Assessment","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 12–14) — Role-specific task administered asynchronously. 48-hour submission window."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Final Interview","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 15–17) — Panel interview with department head and a peer. Competency and scenario-based questions."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Offer & Negotiation","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 18) — Verbal offer extended by HR. Written offer letter issued within 24 hours of verbal acceptance."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Pre-employment Checks","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 19–23) — NBI clearance, PAGCOR suitability check for regulated roles, reference verification."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Onboarding Preparation","marks":[{"type":"bold"}]},{"type":"text","text":" (Day 24–28) — Equipment provisioning, system access setup, buddy assignment, first-week schedule issued."}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Headcount Request Process"}]},
    {"type":"paragraph","content":[{"type":"text","text":"New headcount must be requested via the HR intake form at least 6 weeks before the target start date. Headcount requests require department head sign-off and Finance budget approval before HR can begin sourcing."}]},
    {"type":"callout","attrs":{"variant":"critical"},"content":[{"type":"paragraph","content":[{"type":"text","text":"All roles with access to player funds or personal data require PAGCOR suitability clearance. Do not grant system access until clearance is confirmed in writing."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- =============================================================================
-- KYC  (4 pages)
-- =============================================================================

-- ── Escalation Flow ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'kyc', 'escalation-flow', 'Escalation Flow',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"KYC Escalation Flow"}]},
    {"type":"paragraph","content":[{"type":"text","text":"This document defines the three-tier escalation path for KYC cases. Agents must exhaust all options at their level before escalating. Incorrect escalation wastes compliance capacity and may breach PAGCOR turnaround obligations."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Level 1 — KYC Agent"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Handles all standard document submissions. Scope includes:"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Government-issued ID verification (passport, UMID, driver''s licence, SSS)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Proof of address (utility bill, bank statement — max 3 months old)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Source of funds for deposits ≥ PHP 50,000 in a rolling 30-day window"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Selfie / liveness check for first-time verification"}]}]}
    ]},
    {"type":"paragraph","content":[{"type":"text","text":"Escalate to Level 2 if: document is expired, image quality is insufficient after one rejection, or the player submits a foreign document requiring additional validation."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Level 2 — KYC Team Lead"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Handles complex or borderline cases. Scope includes:"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Foreign national identity documents (passport + visa required)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"PEP (Politically Exposed Person) initial screening and documentation"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Enhanced Due Diligence (EDD) for high-risk player profiles"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Discrepancy between declared source of funds and observed transaction patterns"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Deceased account or estate claims"}]}]}
    ]},
    {"type":"paragraph","content":[{"type":"text","text":"Escalate to Level 3 if: case involves a PEP with elevated risk score, SAR/STR threshold is met, or a regulatory inquiry is received."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Level 3 — Compliance Officer"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Final authority for all compliance decisions. Sole point of contact for PAGCOR submissions. Scope includes:"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Suspicious Activity Report (SAR) and Suspicious Transaction Report (STR) filings"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"PAGCOR mandatory disclosure submissions"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Account freezes pending law enforcement requests"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Final approval on all account closures for compliance reasons"}]}]}
    ]},
    {"type":"callout","attrs":{"variant":"critical"},"content":[{"type":"paragraph","content":[{"type":"text","text":"SAR and STR filings are legally privileged. Do not inform the player of a filing. All PAGCOR submissions must be reviewed and signed by the Compliance Officer only."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Decision Matrix ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'kyc', 'decision-matrix', 'Decision Matrix',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"KYC Decision Matrix"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Use this matrix to determine the correct action for each document scenario. When in doubt, escalate — do not approve a case you cannot fully verify."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Scenario"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Action"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"SLA"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Who"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Valid PH government ID, clear image"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Approve"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L1 Agent"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"ID image blurry or partially obscured"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Request resubmission (one retry)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L1 Agent"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Foreign passport (non-PH national)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Escalate + request visa copy"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L2 Lead"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"POA older than 3 months"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Reject, request fresh document"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L1 Agent"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Player identified as PEP"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Escalate, flag EDD required"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L2 Lead → L3 CO"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"SOF inconsistent with deposits"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Suspend withdrawals, escalate"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1 hour"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L2 Lead → L3 CO"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"SAR/STR threshold reached"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Immediately escalate to Compliance Officer"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"30 min"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L3 CO only"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"PAGCOR requires that all KYC decisions be recorded in the case management system with a reason code. Undocumented decisions are a compliance breach."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── SLA & Timers ──────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'kyc', 'sla-timers', 'SLA & Timers',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"KYC SLA & Timers"}]},
    {"type":"paragraph","content":[{"type":"text","text":"All KYC actions must be completed within the timeframes below. SLAs are measured from the moment a task is assigned in the case management system. Breach of PAGCOR-mandated SLAs must be reported to the Compliance Officer within 1 hour."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Task"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Standard SLA"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Priority SLA"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Notes"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Standard ID verification"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1 hour"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Priority applies when withdrawal ≥ PHP 100k is pending"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Proof of address review"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"—"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Source of funds review"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Escalate at 24h if unresolved"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Enhanced Due Diligence (EDD)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"72 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"L2 lead must approve closure"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PEP screening decision"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Compliance Officer sign-off required"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"SAR/STR filing"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Within 5 business days of suspicion"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Immediately"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PAGCOR statutory obligation"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Withdrawal hold pending KYC"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Max 5 business days"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"—"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Player must be notified within 24h of hold"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"critical"},"content":[{"type":"paragraph","content":[{"type":"text","text":"PAGCOR mandates that SAR/STR filings are submitted within 5 business days of a suspicious transaction being identified. Failure to file on time is a criminal liability for the Compliance Officer."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Glossary ──────────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'kyc', 'glossary', 'Glossary',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"KYC & AML Glossary"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Key terms used across KYC workflows, compliance documentation, and PAGCOR regulatory submissions."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"AML — Anti-Money Laundering"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The set of laws, regulations, and procedures intended to prevent criminals from disguising illegally obtained funds as legitimate income. In the Philippines, governed by R.A. 9160 (AMLA) and its amendments."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"CDD — Customer Due Diligence"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The process of verifying a customer''s identity, assessing their risk profile, and understanding the nature of their activity. Minimum CDD includes ID verification and address confirmation."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"EDD — Enhanced Due Diligence"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A higher level of scrutiny applied to high-risk customers, including PEPs, customers with complex ownership structures, or those in high-risk jurisdictions. EDD requires source of wealth documentation in addition to standard CDD."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"KYC — Know Your Customer"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The mandatory process of verifying the identity of a customer before and during the business relationship. Encompasses identity verification, address verification, and ongoing transaction monitoring."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"PAGCOR — Philippine Amusement and Gaming Corporation"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The government-owned corporation that regulates all gambling activities in the Philippines. iGaming Philippines operates under a PAGCOR Interactive Gaming licence."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"PEP — Politically Exposed Person"}]},
    {"type":"paragraph","content":[{"type":"text","text":"An individual who holds or has held a prominent public position, such as a government official, senior executive of a state-owned enterprise, or a close family member or associate of such a person. PEPs require EDD."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"SAR — Suspicious Activity Report"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A report filed with AMLC (Anti-Money Laundering Council) when a transaction or series of transactions is deemed suspicious. Distinct from an STR in that it covers a broader range of suspicious behaviour beyond a single transaction."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"SOF — Source of Funds"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Documentation showing the origin of the money being deposited or wagered. Common SOF documents include payslips, bank statements, business income certificates, or investment account statements."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"STR — Suspicious Transaction Report"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A mandatory report filed with AMLC for covered transactions (single cash transactions ≥ PHP 500,000) and suspicious transactions. Filing is a statutory requirement under R.A. 9160."}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- =============================================================================
-- VIP  (5 pages)
-- =============================================================================

-- ── Player Lifecycle ──────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'vip', 'player-lifecycle', 'Player Lifecycle',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"VIP Player Lifecycle"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The VIP player lifecycle tracks a player from initial registration through to our highest loyalty tier. Each stage has defined criteria, assigned ownership, and a set of expected touchpoints."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Stage 1 — Registered (Bronze)"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Player has verified their account. Eligible for all standard promotions. No assigned VIP host. Automated welcome sequence triggered. Upgrade criteria: ≥ PHP 10,000 net deposits within 30 days."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Stage 2 — Active Player (Silver)"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Player meets initial deposit threshold. Assigned to a junior VIP host. Monthly personalised bonus offer. Eligible for birthday bonus and seasonal campaigns. Upgrade criteria: ≥ PHP 50,000 net deposits in a rolling 90-day window."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Stage 3 — High Value (Gold)"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Dedicated VIP host assigned. Bi-weekly personal check-in call. Priority customer support queue. Exclusive access to higher withdrawal limits (PHP 500k/day). Upgrade criteria: ≥ PHP 200,000 net deposits in a rolling 90-day window."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Stage 4 — VIP (Platinum)"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Top-tier status. Senior VIP host. Weekly touchpoints. Unlimited withdrawal limits (subject to compliance review). Exclusive events, merchandise, and bespoke bonus structures. Maintenance criteria: ≥ PHP 200,000 net deposits per quarter."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Downgrade Policy"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Tier maintenance is assessed quarterly. A player who fails to meet the deposit threshold in a given quarter receives a 30-day grace period with a personalised re-engagement offer before downgrade."}]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Tier upgrades are processed within 24 hours of threshold confirmation. Never upgrade a player manually without Head of VIP approval. Fraudulent or bonus-abusing players are ineligible for VIP regardless of deposit volume."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Escalation Matrix ─────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'vip', 'escalation-matrix', 'Escalation Matrix',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"VIP Escalation Matrix"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Defines who handles VIP player complaints, requests, and incidents by tier. Always attempt resolution at the lowest appropriate level before escalating."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Issue Type"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Bronze / Silver"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Gold"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Platinum"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonus query or dispute"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Support agent → Team lead"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Assigned VIP host"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Senior VIP host — same day"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Withdrawal delay"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Payments team"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"VIP host → Payments team"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Senior VIP host → Head of Payments"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"KYC document request"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"KYC agent"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"VIP host coordinates with KYC"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Senior VIP host — fast-track KYC queue"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Complaint — service quality"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Support team lead"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of VIP"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of VIP → Country Manager"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Chargeback / fraud flag"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud team"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud team + notify VIP host"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud team + Head of VIP + Country Manager"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Platinum players must receive a response within 2 hours on any escalated issue, 24/7. Ensure on-call coverage is rostered for all holiday periods."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Tiers & Benefits ──────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'vip', 'tiers-benefits', 'Tiers & Benefits',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Tier Structure & Benefits"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A summary of all four VIP tiers, their qualification thresholds, and the full benefits package available at each level."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Tier"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Qualification (rolling 90 days)"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Daily Withdrawal Limit"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Cashback"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Dedicated Host"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Bronze"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"< PHP 10,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PHP 50,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"None"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"No"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Silver"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PHP 10,000 – 49,999"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PHP 150,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"3% weekly losses"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Junior host"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Gold"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PHP 50,000 – 199,999"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"PHP 500,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"5% weekly losses"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Dedicated host"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Platinum"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"≥ PHP 200,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Unlimited (CO review)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"8% weekly losses"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Senior host"}]}]}
      ]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Additional Platinum Perks"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Priority processing on all withdrawals (target: same business day)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Annual gift — personalised based on player preferences logged by host"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Invitations to exclusive events (sports, hospitality, product launches)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bespoke reload bonus structures negotiated individually"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Monthly loss insurance up to PHP 50,000 on written agreement"}]}]}
    ]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── SLA & Touchpoints ─────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'vip', 'sla-touchpoints', 'SLA & Touchpoints',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"VIP SLA & Touchpoint Schedule"}]},
    {"type":"paragraph","content":[{"type":"text","text":"This page defines the minimum required touchpoint frequency and response SLAs for each VIP tier. VIP hosts are measured monthly against these standards."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Tier"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Min Proactive Contact"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Inbound Response SLA"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Complaint Response SLA"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Withdrawal SLA"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Bronze"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Automated only"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"48 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"3 business days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Silver"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Monthly check-in"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"12 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 business days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Gold"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Bi-weekly call or message"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"8 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Next business day"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Platinum"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Weekly (call preferred)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours (24/7)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours (24/7)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Same business day"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"All touchpoints must be logged in the CRM within 2 hours of the interaction. Unlogged touchpoints will not count toward host performance metrics."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── VIP Glossary ──────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'vip', 'glossary', 'Glossary',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"VIP Glossary"}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"CLV — Customer Lifetime Value"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The total projected net revenue a player is expected to generate over the duration of their relationship with the platform. Used to guide investment in personalised retention offers."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Churn Risk"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A predictive score assigned by the analytics system indicating the likelihood that a player will stop depositing within the next 30 days. Players with a churn risk score > 70% are flagged for proactive outreach."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"GGR — Gross Gaming Revenue"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Total wagers minus total winnings paid out. GGR is the primary revenue metric used for tier qualification thresholds and host performance reporting."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"NGR — Net Gaming Revenue"}]},
    {"type":"paragraph","content":[{"type":"text","text":"GGR minus bonuses, promotions, and affiliate commissions. NGR is used for financial reporting and P&L calculations."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Reactivation"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A campaign or direct host action aimed at re-engaging a player who has been dormant for 30+ days. Reactivation offers require Head of VIP approval for any bonus value > PHP 5,000."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Wagering Requirement (WR)"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The number of times a bonus amount must be wagered before any winnings derived from it can be withdrawn. Standard WR for VIP bonuses is 10x; this can be reduced at Platinum tier by host discretion."}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- =============================================================================
-- FRAUD & PAYMENTS  (5 pages)
-- =============================================================================

-- ── Fraud Detection ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'fraud-payments', 'fraud-detection', 'Fraud Detection',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Fraud Detection"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Outlines the signals, tools, and processes used to identify fraudulent activity on the platform. Detection is a shared responsibility across Fraud, Payments, and KYC teams."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Automated Detection Signals"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Multiple accounts sharing the same device fingerprint or IP address"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Deposit immediately followed by withdrawal with minimal gameplay (bonus abuse / money laundering indicator)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"High-velocity deposit pattern: ≥ 5 deposits within 1 hour"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Withdrawal to a different payment method than the deposit method"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"E-wallet linked to multiple accounts across the platform"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Card BIN country mismatch with player''s declared country of residence"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Manual Review Triggers"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Chargeback received on an account with active balance"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Player reports their own account as compromised"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonus exploitation pattern flagged by the promotions system"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Third-party fraud database match (card or identity)"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Detection Tools"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Device fingerprinting — tracks device ID, browser, OS across sessions"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"IP velocity checks — flags accounts from same IP within 24h"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Transaction monitoring rules engine — configurable thresholds managed by Fraud team"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Third-party fraud consortium database integration"}]}]}
    ]},
    {"type":"callout","attrs":{"variant":"critical"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Accounts flagged by the automated system must not be contacted or alerted before the Fraud team completes its initial review. Tipping off a fraudulent player is a compliance and legal risk."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Payments Flow ─────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'fraud-payments', 'payments-flow', 'Payments Flow',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Payments Processing Flow"}]},
    {"type":"paragraph","content":[{"type":"text","text":"End-to-end process for deposit and withdrawal transactions. All payment operations must comply with PAGCOR transaction reporting requirements and BSP e-money regulations."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Deposit Flow"}]},
    {"type":"orderedList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Player selects payment method (GCash, Maya, InstaPay, debit card, online banking)."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Payment gateway validates the request and returns a reference number."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Automated fraud check runs against transaction rules engine (< 2 seconds)."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"If cleared: balance credited instantly. Player receives in-app notification."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"If flagged: transaction held, Fraud team notified, player sees ''pending'' status."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Transaction logged in the payments ledger and reported to PAGCOR daily batch file."}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Withdrawal Flow"}]},
    {"type":"orderedList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Player submits withdrawal request. System checks: available balance, wagering completion, KYC status."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"If KYC incomplete: withdrawal held, KYC notification sent to player."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Automated fraud check + AML threshold check (flags if ≥ PHP 500k covered transaction)."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Payment team reviews queue — approves or escalates within SLA."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Approved: funds sent via payment gateway to player''s registered payout method."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Transaction logged in ledger. If ≥ PHP 500k, STR trigger reviewed by Compliance."}]}]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Withdrawals to a different method than the deposit source are not permitted unless the original payment method is no longer active. This is an AML requirement. Exceptions require Compliance Officer sign-off."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Decision Matrix ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'fraud-payments', 'decision-matrix', 'Decision Matrix',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Fraud & Payments Decision Matrix"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Reference guide for the correct action, ownership, and escalation path for each fraud and payment scenario."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Scenario"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Action"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Owner"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"SLA"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Chargeback received"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Freeze account, gather evidence, file dispute"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud analyst"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Duplicate account detected"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Suspend secondary account, merge balances, KYC re-review"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud analyst + KYC lead"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonus abuse — single account"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Void bonus, restrict promotions, issue warning"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud analyst"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Organised bonus abuse ring"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Suspend all linked accounts, escalate to Compliance"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Fraud + Compliance Officer"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Failed withdrawal — gateway error"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Retry via alternate gateway, notify player"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Payments team"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1 hour"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Suspected account takeover"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Immediately freeze account, force re-KYC, notify player via registered contact"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud analyst → Head of Fraud"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"30 minutes"}]}]}
      ]}
    ]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── SLA & Timers ──────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'fraud-payments', 'sla-timers', 'SLA & Timers',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Fraud & Payments SLA & Timers"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Processing targets and maximum hold times for all payment and fraud case types. SLAs are measured from the moment the case is created or the transaction is flagged."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Task"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Target"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Max Hold"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Escalate If"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Standard withdrawal (Bronze/Silver)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 business days"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"3 business days"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Unresolved after 3 days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"VIP Gold withdrawal"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Next business day"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 business days"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of VIP to be notified on breach"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"VIP Platinum withdrawal"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Same business day"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Next business day"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Country Manager to be notified"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud hold — low risk"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"48 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Unresolved after 48h"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fraud hold — high risk"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"4 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Fraud immediately"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Chargeback dispute response"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Within 5 business days"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Gateway deadline (varies)"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Fraud + Finance on breach"}]}]}
      ]}
    ]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Fraud & Payments Glossary ─────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'fraud-payments', 'glossary', 'Glossary',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Fraud & Payments Glossary"}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"ATO — Account Takeover"}]},
    {"type":"paragraph","content":[{"type":"text","text":"When a fraudster gains unauthorised access to a player account, typically via phishing, credential stuffing, or SIM-swap. ATO events trigger an immediate account freeze and re-KYC process."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"BIN — Bank Identification Number"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The first 6–8 digits of a credit or debit card number, identifying the issuing bank and card type. Used in fraud detection to check for BIN-country mismatches with the player''s registered location."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Chargeback"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A reversal of a credit/debit card transaction initiated by the cardholder''s bank, typically after a dispute. Chargebacks are costly — each carries a processing fee plus the disputed amount. High chargeback rates can result in gateway termination."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"GCash / Maya"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The two dominant e-wallet payment methods in the Philippines, operated by Mynt and PayMaya Philippines respectively. Both are BSP-regulated e-money issuers and are the primary deposit channels for the platform."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"InstaPay"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A real-time interbank fund transfer service regulated by BSP, enabling instant transfers between any participating Philippine bank or e-wallet. Used for both deposits and payouts."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"3DS — 3D Secure"}]},
    {"type":"paragraph","content":[{"type":"text","text":"An authentication protocol for card-not-present transactions, adding an additional cardholder verification step (OTP or biometric) during checkout. All card deposits on the platform use 3DS2."}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- =============================================================================
-- AFFILIATE  (6 pages)
-- =============================================================================

-- ── Multi-Level Structure ─────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'multi-level-structure', 'Multi-Level Structure',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Multi-Level Affiliate Structure"}]},
    {"type":"paragraph","content":[{"type":"text","text":"iGaming Philippines operates a two-tier affiliate network. Master Affiliates recruit and manage Sub-Affiliates, who in turn drive player traffic. Each level earns commission from the activity generated by their downline."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Tier 1 — Master Affiliate"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Directly contracted with iGaming Philippines. Responsible for recruiting, training, and managing Sub-Affiliates. Earns on direct player traffic plus an override commission on all Sub-Affiliate NGR."}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Direct player NGR commission: up to 40% RevShare (negotiated individually)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Sub-Affiliate override: 5% of Sub-Affiliate NGR commission"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Dedicated affiliate manager"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Access to full reporting dashboard including Sub-Affiliate performance"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Tier 2 — Sub-Affiliate"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Recruited by a Master Affiliate. Operates under the Master''s account umbrella. Earns RevShare on direct player NGR only — no override on further downstream referrals."}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Direct player NGR commission: 25–35% RevShare (set by Master, within platform cap)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Access to standard reporting dashboard"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Support via Master Affiliate (not direct affiliate manager)"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Commission Models Available"}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Model"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Description"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Applicable To"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"RevShare"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"% of player NGR — ongoing for lifetime of player"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"All tiers"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"CPA"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Fixed payment per qualifying first deposit"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Master Affiliates only"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Hybrid"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Reduced CPA + reduced RevShare"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Master Affiliates — negotiated"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"All affiliate agreements must be reviewed by the Head of Affiliate and signed before any tracking links are issued. Unauthorised affiliate links are not commissionable and may result in account suspension."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Partner Onboarding ────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'partner-onboarding', 'Partner Onboarding',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Partner Onboarding Process"}]},
    {"type":"paragraph","content":[{"type":"text","text":"The standard onboarding flow for new affiliate partners. Target completion time is 5 business days from application to first link activation."}]},
    {"type":"orderedList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Application Submission","marks":[{"type":"bold"}]},{"type":"text","text":" — Partner completes the affiliate application form. Required fields: business name, contact details, primary traffic channels, estimated monthly unique visitors, and target player geography."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Compliance Screening","marks":[{"type":"bold"}]},{"type":"text","text":" — Affiliate team reviews for brand safety, prohibited traffic types (arbitrage, incentivised, or self-referred traffic), and PAGCOR eligibility. Rejection is notified within 48 hours."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Commercial Negotiation","marks":[{"type":"bold"}]},{"type":"text","text":" — Head of Affiliate or assigned manager agrees commission model and rates. CPA rates are locked for the first 90 days; RevShare rates are permanent unless renegotiated."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Agreement Signing","marks":[{"type":"bold"}]},{"type":"text","text":" — Digital affiliate agreement sent via DocuSign. Both parties must sign before any link activation."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Account Setup","marks":[{"type":"bold"}]},{"type":"text","text":" — Affiliate portal account created. Tracking links, marketing materials, and creatives shared. Sub-Affiliate accounts created if applicable."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Activation & Briefing","marks":[{"type":"bold"}]},{"type":"text","text":" — 30-minute onboarding call with affiliate manager. Dashboard walkthrough, reporting cadence agreed, first payment date confirmed."}]}]}
    ]},
    {"type":"callout","attrs":{"variant":"warning"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliates promoting to Philippine residents must comply with PAGCOR''s responsible gambling advertising guidelines. Non-compliant creatives must be pulled within 24 hours of notification."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Operations ────────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'operations', 'Operations',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Affiliate Operations"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Day-to-day operational responsibilities for the Affiliate team, covering reporting, compliance, partner communication, and payment administration."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Daily Tasks"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Review new affiliate applications (SLA: 48 hours from submission)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Check fraud queue for suspicious affiliate traffic patterns (cookie stuffing, self-referral)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Respond to partner support tickets (SLA: same business day)"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Monitor top 10 partners'' player registration and deposit KPIs"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Weekly Tasks"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Generate and distribute weekly performance reports to Master Affiliates"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Review and update creative library with new promotions and banners"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission reconciliation — verify system-calculated commissions against manual spot checks"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Partner pipeline review — track active negotiations and pending agreements"}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Monthly Tasks"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission calculation lock — freeze figures by the 1st of each month for the prior month"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission payment processing — submit to Finance by the 3rd for payment by the 10th"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Partner performance review — identify underperforming affiliates for re-engagement or termination"}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"PAGCOR affiliate compliance audit — verify all active partners'' promotional materials"}]}]}
    ]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Decision Matrix ───────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'decision-matrix', 'Decision Matrix',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Affiliate Decision Matrix"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Reference guide for resolving common affiliate disputes, commission queries, and compliance issues."}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Scenario"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Action"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Owner"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"SLA"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission dispute — tracking issue"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Review raw click/registration logs, reconcile with system"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliate manager"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"5 business days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Self-referral detected"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Void commission, issue formal warning, flag for monitoring"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"24 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Cookie stuffing / fraudulent traffic"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Immediately suspend account, void all affected commissions, refer to legal"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate + Legal"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"2 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliate promotes to under-18s"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Immediate account suspension, PAGCOR notification required"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate + Compliance Officer"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1 hour"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Payment method change request"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Verify identity, update banking details, confirm next payment cycle"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliate manager + Finance"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"3 business days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Negative carryover dispute"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Review agreement, apply policy, escalate if > PHP 50,000"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"5 business days"}]}]}
      ]}
    ]},
    {"type":"callout","attrs":{"variant":"critical"},"content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliates promoting to minors or operating without PAGCOR-compliant disclaimers must be reported to the Compliance Officer immediately. This is a licensee-level regulatory risk."}]}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── SLA & Payments ────────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'sla-payments', 'SLA & Payments',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Affiliate SLA & Payment Schedule"}]},
    {"type":"paragraph","content":[{"type":"text","text":"Defines all payment timelines, minimum thresholds, and operational SLAs for affiliate commission processing."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Monthly Payment Schedule"}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Date"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Action"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Owner"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1st of month"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission figures for prior month locked in system. No further adjustments."}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliate manager"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"1st – 3rd of month"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Dispute window — affiliates may raise calculation queries."}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Affiliate manager"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"3rd of month"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Finalised payment file submitted to Finance."}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Head of Affiliate"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"10th of month"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"All commissions paid to affiliates'' registered bank accounts / e-wallets."}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Finance"}]}]}
      ]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Commission Thresholds & Rules"}]},
    {"type":"bulletList","content":[
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Minimum payout threshold: PHP 5,000. Earnings below threshold roll over to the next month."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Negative carryover: by default, negative NGR months carry over and offset future commissions. Master Affiliates may negotiate a no-negative-carryover clause at the time of agreement."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Chargebacks are deducted from the affiliate''s commission for the month in which the chargeback is confirmed, not the month of the original deposit."}]}]},
      {"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bonus costs are deducted from NGR before commission is calculated. Affiliates are advised of bonus deduction policies in their agreement."}]}]}
    ]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Operational SLAs"}]},
    {"type":"table","content":[
      {"type":"tableRow","content":[
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"Task"}]}]},
        {"type":"tableHeader","content":[{"type":"paragraph","content":[{"type":"text","text":"SLA"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"New application review"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"48 hours"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Tracking link issue resolution"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Same business day"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Commission dispute resolution"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"5 business days"}]}]}
      ]},
      {"type":"tableRow","content":[
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Partner support ticket response"}]}]},
        {"type":"tableCell","content":[{"type":"paragraph","content":[{"type":"text","text":"Same business day"}]}]}
      ]}
    ]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- ── Affiliate Glossary ────────────────────────────────────────────────────────
INSERT INTO documents (section_slug, page_slug, title, content, updated_at, updated_by) VALUES (
'affiliate', 'glossary', 'Glossary',
'{
  "type": "doc",
  "content": [
    {"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Affiliate Glossary"}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"CPA — Cost Per Acquisition"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A fixed commission paid to the affiliate for each player who meets a defined qualifying action, typically a first deposit above a minimum threshold. CPA rates are agreed in the affiliate contract."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Cookie Stuffing"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A fraudulent technique where an affiliate places tracking cookies on users'' browsers without their knowledge, fraudulently attributing organic or direct player traffic to themselves. This is grounds for immediate account termination and potential legal action."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"EPC — Earnings Per Click"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A performance metric calculated as total commission earned divided by total clicks. Used to evaluate the quality and conversion efficiency of an affiliate''s traffic. A higher EPC indicates better-qualified traffic."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"FTD — First-Time Depositor"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A player who makes their first qualifying deposit on the platform after being referred by an affiliate. FTDs are the primary KPI for CPA commission structures."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Negative Carryover"}]},
    {"type":"paragraph","content":[{"type":"text","text":"A policy where a negative NGR balance in one month is carried forward and deducted from the affiliate''s commission in subsequent months. Standard in most RevShare agreements unless explicitly waived."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"RevShare — Revenue Share"}]},
    {"type":"paragraph","content":[{"type":"text","text":"An ongoing commission model where the affiliate earns a percentage of the NGR generated by their referred players, for the lifetime of those players'' activity on the platform."}]},
    {"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Sub-Affiliate"}]},
    {"type":"paragraph","content":[{"type":"text","text":"An affiliate who operates under the umbrella of a Master Affiliate rather than having a direct agreement with iGaming Philippines. Sub-Affiliates earn RevShare on their direct player traffic only."}]}
  ]
}'::jsonb, NOW(), 'system')
ON CONFLICT (section_slug, page_slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;
