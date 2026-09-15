export interface CodeTransition {
  id: string;
  oldLaw: string;
  oldSection: string;
  newLaw: string;
  newSection: string;
  title: string;
  summary: string;
  confusionRating: number; // 0-100
  momentum: 'High Trend Spike' | 'Rising' | 'Historical Trend Only' | 'Steady';
}

export const CODE_TRANSITIONS: CodeTransition[] = [
  {
    id: '498a',
    oldLaw: 'IPC',
    oldSection: 'Section 498A',
    newLaw: 'BNS',
    newSection: 'Section 85 / 86',
    title: 'Cruelty by Husband',
    summary:
      'BNS Sections 85 and 86 reframe the offence of cruelty by husband or relatives. Section 85 covers cruelty with intent to drive suicide or cause injury, while Section 86 defines "cruelty" more precisely. The core punishment framework is preserved, but the definitions are modernised and separated for clarity.',
    confusionRating: 92,
    momentum: 'High Trend Spike',
  },
  {
    id: '125',
    oldLaw: 'CrPC',
    oldSection: 'Section 125',
    newLaw: 'BNSS',
    newSection: 'Section 144',
    title: 'Maintenance Claims',
    summary:
      'BNSS Section 144 retains the substance of CrPC Section 125 for maintenance of wives, children, and parents. Procedural timelines are tightened and the affidavit-of-assets requirement (per Rajnesh v. Neha) is reinforced. The right to claim maintenance is unchanged.',
    confusionRating: 78,
    momentum: 'High Trend Spike',
  },
  {
    id: '41a',
    oldLaw: 'CrPC',
    oldSection: 'Section 41A',
    newLaw: 'BNSS',
    newSection: 'Section 35',
    title: 'Police Notice of Appearance',
    summary:
      'BNSS Section 35 replaces CrPC Section 41A notices. The structure of a written notice requiring appearance is preserved, with clearer formatting requirements. The Arnesh Kumar arrest guidelines still apply, keeping the safeguard against automatic arrest.',
    confusionRating: 64,
    momentum: 'Rising',
  },
  {
    id: '497',
    oldLaw: 'IPC',
    oldSection: 'Section 497',
    newLaw: 'BNS',
    newSection: 'Section 84',
    title: 'Adultery',
    summary:
      'IPC Section 497 was struck down by the Supreme Court in 2018 (Joseph Shine v. Union of India) and is no longer an offence. BNS does not re-criminalise adultery. This transition is historical only — public interest now centres on adultery as a ground for civil divorce.',
    confusionRating: 41,
    momentum: 'Historical Trend Only',
  },
  {
    id: '340',
    oldLaw: 'CrPC',
    oldSection: 'Section 340',
    newLaw: 'BNSS',
    newSection: 'Section 379',
    title: 'Perjury / False Evidence',
    summary:
      'BNSS Section 379 carries forward CrPC Section 340 on perjury and false evidence before a court. The inquiry procedure and referral to a magistrate remain substantively the same, with minor procedural streamlining.',
    confusionRating: 35,
    momentum: 'Steady',
  },
  {
    id: '494',
    oldLaw: 'IPC',
    oldSection: 'Section 494',
    newLaw: 'BNS',
    newSection: 'Section 81',
    title: 'Bigamy',
    summary:
      'BNS Section 81 carries forward the offence of bigamy from IPC Section 494. Marrying again during the lifetime of a spouse remains punishable, with the same exceptions for a spouse absent for seven years or whose death was unknown. The punishment framework is unchanged.',
    confusionRating: 58,
    momentum: 'Rising',
  },
  {
    id: '417',
    oldLaw: 'IPC',
    oldSection: 'Section 417',
    newLaw: 'BNS',
    newSection: 'Section 318',
    title: 'Cheating',
    summary:
      'BNS Section 318 replaces IPC Section 417 (cheating). The essence of deception-induced harm is preserved, with the offence now more clearly delineated from fraud and breach of trust. Punishment for simple cheating remains comparable, with aggravated forms addressed in adjacent sections.',
    confusionRating: 55,
    momentum: 'Rising',
  },
  {
    id: '405',
    oldLaw: 'IPC',
    oldSection: 'Section 405 / 406',
    newLaw: 'BNS',
    newSection: 'Section 316',
    title: 'Criminal Breach of Trust',
    summary:
      'BNS Section 316 consolidates IPC Sections 405 and 406 on criminal breach of trust. The definition of dishonest misappropriation of property entrusted to a person is retained, with punishment for the basic offence and aggravated forms (e.g. by public servant, carrier) structured across subsections.',
    confusionRating: 62,
    momentum: 'Steady',
  },
  {
    id: '503',
    oldLaw: 'IPC',
    oldSection: 'Section 503 / 506',
    newLaw: 'BNS',
    newSection: 'Section 351',
    title: 'Criminal Intimidation',
    summary:
      'BNS Section 351 replaces IPC Sections 503 and 506 on criminal intimidation. The offence of threatening injury, harm, or damage to person, property, or reputation is preserved. The gradation of punishment by severity of the threat is retained, with clearer definitions of intent.',
    confusionRating: 49,
    momentum: 'Rising',
  },
  {
    id: '499',
    oldLaw: 'IPC',
    oldSection: 'Section 499 / 500',
    newLaw: 'BNS',
    newSection: 'Section 356',
    title: 'Defamation',
    summary:
      'BNS Section 356 carries forward IPC Sections 499 and 500 on defamation. The offence of harming the reputation of another by words, signs, or visible representations is retained, along with the ten statutory exceptions. Punishment for simple defamation remains comparable.',
    confusionRating: 52,
    momentum: 'Steady',
  },
  {
    id: '312',
    oldLaw: 'IPC',
    oldSection: 'Section 312 / 313',
    newLaw: 'BNS',
    newSection: 'Section 88',
    title: 'Miscarriage',
    summary:
      'BNS Section 88 consolidates IPC Sections 312 and 313 on causing miscarriage. The offence of voluntarily causing a woman with child to miscarry is retained, with the aggravated form (without consent) carrying heavier punishment. The Medical Termination of Pregnancy Act exceptions remain outside the criminal scope.',
    confusionRating: 67,
    momentum: 'Historical Trend Only',
  },
  {
    id: '378',
    oldLaw: 'IPC',
    oldSection: 'Section 378 / 379',
    newLaw: 'BNS',
    newSection: 'Section 303',
    title: 'Theft',
    summary:
      'BNS Section 303 replaces IPC Sections 378 and 379 on theft. The core definition of dishonestly taking movable property out of possession of another is preserved, with the basic punishment retained. Aggravated forms (snatching, theft in dwelling, by servant) are structured in adjacent subsections.',
    confusionRating: 44,
    momentum: 'Steady',
  },
  {
    id: '448',
    oldLaw: 'IPC',
    oldSection: 'Section 448',
    newLaw: 'BNS',
    newSection: 'Section 329',
    title: 'House Trespass',
    summary:
      'BNS Section 329 replaces IPC Section 448 on house trespass. Entering into or remaining in any building, tent, or vessel used as a human dwelling with intent to commit an offence remains punishable. Aggravated forms (house-breaking, lurking) are addressed in related sections.',
    confusionRating: 38,
    momentum: 'Steady',
  },
  {
    id: '166',
    oldLaw: 'IPC',
    oldSection: 'Section 166',
    newLaw: 'BNS',
    newSection: 'Section 201',
    title: 'Public Servant Disobeying Law',
    summary:
      'BNS Section 201 carries forward IPC Section 166. A public servant who knowingly disobeys a direction of the law with intent to cause injury remains punishable. The offence is non-cognisable and bailable, with punishment of simple imprisonment up to three months.',
    confusionRating: 46,
    momentum: 'Steady',
  },
  {
    id: '167',
    oldLaw: 'IPC',
    oldSection: 'Section 167',
    newLaw: 'BNS',
    newSection: 'Section 202',
    title: 'Public Servant Framing Incorrect Document',
    summary:
      'BNS Section 202 replaces IPC Section 167. A public servant who, with intent to cause injury, frames an incorrect document with the belief it will cause injury remains punishable. Punishment is simple imprisonment up to three years and a fine.',
    confusionRating: 43,
    momentum: 'Steady',
  },
  {
    id: '193',
    oldLaw: 'IPC',
    oldSection: 'Section 193',
    newLaw: 'BNS',
    newSection: 'Section 226',
    title: 'Public Servant Giving False Evidence',
    summary:
      'BNS Section 226 consolidates IPC Section 193 for giving false evidence. Where a public servant (including a judge or police officer) knowingly gives or fabricates false evidence in a judicial proceeding, the offence carries up to seven years imprisonment and a fine.',
    confusionRating: 59,
    momentum: 'Rising',
  },
  {
    id: '217',
    oldLaw: 'IPC',
    oldSection: 'Section 217',
    newLaw: 'BNS',
    newSection: 'Section 232',
    title: 'Public Servant Disobeying Direction of Law',
    summary:
      'BNS Section 232 replaces IPC Section 217. A public servant who, with intent to save a person from punishment or property from forfeiture, disobeys a direction of law remains punishable. The offence is bailable with imprisonment up to two years and a fine.',
    confusionRating: 40,
    momentum: 'Steady',
  },
  {
    id: '218',
    oldLaw: 'IPC',
    oldSection: 'Section 218',
    newLaw: 'BNS',
    newSection: 'Section 233',
    title: 'Public Servant Framing Incorrect Record',
    summary:
      'BNS Section 233 carries forward IPC Section 218. A public servant charged with preparing a record who knowingly frames it incorrectly with intent to save a person from punishment remains punishable with imprisonment up to three years and a fine.',
    confusionRating: 38,
    momentum: 'Steady',
  },
  {
    id: '219',
    oldLaw: 'IPC',
    oldSection: 'Section 219',
    newLaw: 'BNS',
    newSection: 'Section 234',
    title: 'Public Servant in Corrupt Practice',
    summary:
      'BNS Section 234 replaces IPC Section 219. A public servant who corruptly makes or pronounces a false report or order while acting in a judicial capacity remains punishable with imprisonment up to seven years and a fine.',
    confusionRating: 54,
    momentum: 'Rising',
  },
  {
    id: '220',
    oldLaw: 'IPC',
    oldSection: 'Section 220',
    newLaw: 'BNS',
    newSection: 'Section 235',
    title: 'Public Servant Negligently Suffering Prisoner to Escape',
    summary:
      'BNS Section 235 carries forward IPC Section 220. A public servant (typically a police officer) who negligently suffers a prisoner in custody to escape remains punishable. The offence is bailable with imprisonment up to two years, or up to three years if the escape is intentional.',
    confusionRating: 36,
    momentum: 'Steady',
  },
  {
    id: '221',
    oldLaw: 'IPC',
    oldSection: 'Section 221',
    newLaw: 'BNS',
    newSection: 'Section 236',
    title: 'Public Servant Intentionally Allowing Escape',
    summary:
      'BNS Section 236 replaces IPC Section 221. A public servant who intentionally allows a prisoner in custody to escape remains punishable. Where the prisoner was charged with a capital offence, the punishment extends to life imprisonment.',
    confusionRating: 34,
    momentum: 'Steady',
  },
  {
    id: '353',
    oldLaw: 'IPC',
    oldSection: 'Section 353',
    newLaw: 'BNS',
    newSection: 'Section 132',
    title: 'Assault on Public Servant',
    summary:
      'BNS Section 132 replaces IPC Section 353. Assaulting or using criminal force on a public servant (including a police officer or judge) in the execution of duty remains punishable with imprisonment up to two years, or up to three years if the assault causes hurt.',
    confusionRating: 48,
    momentum: 'Rising',
  },
  {
    id: '186',
    oldLaw: 'IPC',
    oldSection: 'Section 186',
    newLaw: 'BNS',
    newSection: 'Section 132',
    title: 'Obstructing Public Servant in Duty',
    summary:
      'BNS Section 132 also covers IPC Section 186. Voluntarily obstructing a public servant in the discharge of public functions remains punishable. The offence is non-cognisable and bailable, with imprisonment up to three months and a fine.',
    confusionRating: 42,
    momentum: 'Steady',
  },
  {
    id: '197',
    oldLaw: 'IPC',
    oldSection: 'Section 197',
    newLaw: 'BNS',
    newSection: 'Section 230',
    title: 'Issuing or Signing False Certificate',
    summary:
      'BNS Section 230 replaces IPC Section 197. A public servant (including a doctor or registrar) who issues or signs a false certificate relating to a matter they are authorised to certify remains punishable with imprisonment up to two years and a fine.',
    confusionRating: 45,
    momentum: 'Steady',
  },
  {
    id: '199',
    oldLaw: 'IPC',
    oldSection: 'Section 199',
    newLaw: 'BNS',
    newSection: 'Section 230',
    title: 'False Statement Made on Declaration',
    summary:
      'BNS Section 230 also covers IPC Section 199. A person who, in a declaration made under law, makes a false statement they know or believes to be false remains punishable. This applies to public servants certifying documents and to private individuals making statutory declarations.',
    confusionRating: 50,
    momentum: 'Steady',
  },
];

export interface TimelineStage {
  label: string;
  icon: string;
  mutualMonths: string;
  contestedMonths: string;
}

export const TIMELINE_STAGES: TimelineStage[] = [
  { label: 'Filing & Admission', icon: 'FilePlus', mutualMonths: '0.5', contestedMonths: '1' },
  { label: 'Mediation Cell', icon: 'Handshake', mutualMonths: '1', contestedMonths: '2-3' },
  { label: 'First Motion', icon: 'FileCheck', mutualMonths: '1', contestedMonths: '4-6' },
  { label: 'Evidence & Cross-Examination', icon: 'ScrollText', mutualMonths: '1-2', contestedMonths: '12-24' },
  { label: 'Final Arguments', icon: 'Gavel', mutualMonths: '1', contestedMonths: '6-12' },
  { label: 'Decree / Judgment', icon: 'BadgeCheck', mutualMonths: '0.5', contestedMonths: '3-6' },
];

export interface MetroProfile {
  key: string;
  label: string;
  mutualDuration: string;
  contestedDuration: string;
  complexityBase: number;
  tip: string;
}

export const METRO_PROFILES: MetroProfile[] = [
  {
    key: 'delhi',
    label: 'Delhi NCR',
    mutualDuration: '6 to 12 Months',
    contestedDuration: '3 to 5 Years',
    complexityBase: 72,
    tip: 'Delhi NCR family courts often push early mediation referral; contested matters here see heavy interim-maintenance litigation before evidence stages begin.',
  },
  {
    key: 'mumbai',
    label: 'Mumbai',
    mutualDuration: '6 to 10 Months',
    contestedDuration: '3 to 4 Years',
    complexityBase: 68,
    tip: 'Mumbai Family Courts frequently waive the 6-month cooling-off period for long-separated couples filing mutual consent divorce.',
  },
  {
    key: 'bengaluru',
    label: 'Bengaluru',
    mutualDuration: '7 to 12 Months',
    contestedDuration: '4 to 6 Years',
    complexityBase: 75,
    tip: 'Trend Alert: Bengaluru Family Courts heavily enforce the Rajnesh v. Neha asset affidavit deadline early in the timeline.',
  },
  {
    key: 'chennai',
    label: 'Chennai',
    mutualDuration: '6 to 11 Months',
    contestedDuration: '3 to 5 Years',
    complexityBase: 66,
    tip: 'Chennai family courts emphasise counselling-led mediation; contested timelines stretch most during the evidence stage.',
  },
  {
    key: 'kolkata',
    label: 'Kolkata',
    mutualDuration: '8 to 14 Months',
    contestedDuration: '4 to 6 Years',
    complexityBase: 70,
    tip: 'Kolkata family courts often see prolonged contested timelines due to high pendency; mutual consent filings move comparatively faster.',
  },
  {
    key: 'tier2',
    label: 'Tier-2 Cities',
    mutualDuration: '8 to 18 Months',
    contestedDuration: '5 to 7 Years',
    complexityBase: 80,
    tip: 'Tier-2 city family courts face the longest pendency; expect significant delays in contested evidence and final-argument stages.',
  },
];

// ==========================================
// ADVOCATE SCREENING MATRIX
// ==========================================

export type CaseTypeKey = 'false_498a' | 'complex_alimony' | 'fathers_custody' | 'perjury_340';

export interface AdvocateQuestion {
  question: string;
  why: string;
}

export interface CaseTypeProfile {
  key: CaseTypeKey;
  label: string;
  description: string;
  questions: AdvocateQuestion[];
}

export const CASE_TYPES: CaseTypeProfile[] = [
  {
    key: 'false_498a',
    label: 'False 498A / BNS 85 Defence',
    description: 'Defending against a fabricated cruelty or dowry harassment FIR.',
    questions: [
      { question: 'How many 498A quashing petitions have you filed in the High Court in the last 3 years?', why: 'Quashing requires High Court experience. A lawyer who only practices in trial courts may lack the procedural fluency to get an FIR quashed at the appellate level.' },
      { question: 'What is your approach to the Arnesh Kumar guidelines and Section 35 BNSS notice compliance?', why: 'A specialist should immediately check whether the police followed the Arnesh Kumar arrest safeguards. Failure to comply is a strong grounds for bail and quashing.' },
      { question: 'How do you handle anticipatory bail applications for NRI or out-of-state clients?', why: 'NRI clients face Look Out Circulars (LOCs) and passport impoundment. The lawyer must know how to coordinate bail across jurisdictions.' },
      { question: 'Do you pursue perjury or defamation counter-cases after acquittal?', why: 'A strong defence lawyer should also advise on post-acquittal remedies — filing perjury (BNSS 379) or defamation (BNS 356) against the complainant.' },
      { question: 'Can you share the outcome of a recent 498A acquittal or quashing you secured?', why: 'Past results are the strongest signal. A lawyer who deflects this question may not have actual trial-court acquittal experience.' },
    ],
  },
  {
    key: 'complex_alimony',
    label: 'Complex Contested Alimony',
    description: 'Disputing or negotiating high-value maintenance and permanent alimony.',
    questions: [
      { question: 'How do you structure the Rajnesh v. Neha affidavit of assets to challenge the opponent\u2019s claimed income?', why: 'The Supreme Court made the asset affidavit mandatory. A specialist should know how to use it to expose hidden income or assets.' },
      { question: 'What is your strategy when the husband claims job loss or reduced income to avoid maintenance?', why: 'Courts look for voluntary unemployment. The lawyer must know how to prove intentional income suppression using bank statements and tax records.' },
      { question: 'How do you calculate a fair lump-sum permanent alimony vs. monthly maintenance?', why: 'Lump-sum settlements carry tax and enforcement advantages. The lawyer should be able to model both scenarios and advise on the trade-offs.' },
      { question: 'Have you handled cases where the wife is well-qualified and earning \u2014 what was the outcome?', why: 'Courts increasingly deny maintenance to qualified, earning wives. The lawyer should cite recent judgments where earning wives were denied or reduced maintenance.' },
      { question: 'What is your approach to attachment of property for maintenance arrears under BNSS?', why: 'If the husband defaults, the wife\u2019s lawyer must know how to attach property. If you are the husband, you need a lawyer who can anticipate and defend against attachment.' },
    ],
  },
  {
    key: 'fathers_custody',
    label: "Father's Child Custody Battle",
    description: 'Pursuing custody, guardianship, or visitation rights as a father.',
    questions: [
      { question: 'How many custody cases have you won for fathers in the last 2 years?', why: 'Indian courts still lean toward the mother. A lawyer with actual father-favourable outcomes understands how to prove the welfare-of-child test under the Guardian and Wards Act.' },
      { question: 'How do you document and present parental alienation evidence in court?', why: 'Parental alienation is increasingly recognised. The lawyer must know how to gather school records, counsellor reports, and witness statements to prove alienation.' },
      { question: 'What is your strategy for getting interim visitation while the custody petition is pending?', why: 'Custody cases take years. Interim visitation is often the only practical remedy. The lawyer should have a fast-track interim visitation strategy.' },
      { question: 'Do you use psychological evaluations or child welfare reports as evidence?', why: 'Courts give weight to professional evaluations. A specialist should know when and how to request a court-appointed counsellor or child welfare report.' },
      { question: 'How do you handle international child abduction or Hague Convention cases?', why: 'If the mother has taken the child abroad, the lawyer must know the Hague Convention framework and how to coordinate with MEA and foreign authorities.' },
    ],
  },
  {
    key: 'perjury_340',
    label: 'Perjury / Section 340 Actions',
    description: 'Initiating perjury or contempt proceedings for false evidence.',
    questions: [
      { question: 'How many Section 340 CrPC / BNSS 379 applications have you filed in family court?', why: 'Perjury applications are procedurally complex and rarely granted. A lawyer with a track record of filed applications knows the evidentiary threshold.' },
      { question: 'What is the success rate of your perjury applications \u2014 and what made the successful ones work?', why: 'A lawyer who has never had a perjury application referred to a magistrate may not know what evidence the court requires.' },
      { question: 'How do you cross-reference false affidavits with prior court filings to prove inconsistency?', why: 'The strongest perjury cases use the opponent\u2019s own prior affidavits. The lawyer must know how to extract and present contradictory filings.' },
      { question: 'Do you simultaneously pursue contempt if the false statement violated a standing court order?', why: 'Contempt is faster and carries immediate penalties. A specialist should advise on both perjury and contempt in parallel.' },
      { question: 'What is the typical timeline from perjury application to magistrate referral in your experience?', why: 'Perjury referrals can take 1\u20133 years. The lawyer should set realistic expectations and know how to expedite the referral.' },
    ],
  },
];

// ==========================================
// GLOBAL LEGAL TECH STACK DIRECTORY
// ==========================================

export type ToolTier = 'FREE' | 'PAID' | 'OPENSOURCE';
export type ToolCategoryKey = 'search' | 'drafting' | 'case_mgmt' | 'reporters';

export interface LegalTool {
  name: string;
  url: string;
  description: string;
  tier: ToolTier;
  category: ToolCategoryKey;
}

export const TOOL_CATEGORIES: { key: ToolCategoryKey; label: string; icon: string }[] = [
  { key: 'search', label: 'Search Engines & Databases', icon: 'Search' },
  { key: 'drafting', label: 'Drafting & AI Workspaces', icon: 'PenTool' },
  { key: 'case_mgmt', label: 'Case Management & Tracking', icon: 'FolderKanban' },
  { key: 'reporters', label: 'Law Reporters', icon: 'Newspaper' },
];

export const LEGAL_TOOLS: LegalTool[] = [
  // Search Engines & Databases
  { name: 'Indian Kanoon', url: 'https://indiankanoon.org', description: 'Free searchable database of Indian court judgments and statutes.', tier: 'FREE', category: 'search' },
  { name: 'SCC Online', url: 'https://www.scconline.com', description: 'Premium legal research database with Supreme Court and High Court judgments.', tier: 'PAID', category: 'search' },
  { name: 'CaseMine', url: 'https://www.casemine.com', description: 'AI-powered legal research platform mapping case relationships and citations.', tier: 'PAID', category: 'search' },
  { name: 'Manupatra', url: 'https://www.manupatra.com', description: 'Comprehensive legal research database with advanced search and analytics.', tier: 'PAID', category: 'search' },
  { name: 'Indian Case Search (OpenLaw)', url: 'https://openlaw.in', description: 'Open-source case law search tool for Indian judgments.', tier: 'OPENSOURCE', category: 'search' },
  { name: 'PRG Database (Legislative)', url: 'https://lddashboard.gov.in', description: 'Free government database of central acts and amendments.', tier: 'FREE', category: 'search' },

  // Drafting & AI Workspaces
  { name: 'JuniorLawyer AI', url: 'https://www.juniorlawyer.ai', description: 'AI-assisted legal drafting and document generation for Indian practice.', tier: 'PAID', category: 'drafting' },
  { name: 'Provakil', url: 'https://www.provakil.com', description: 'Legal document automation, drafting, and matter management workspace.', tier: 'PAID', category: 'drafting' },
  { name: 'LegalDocs (Vakilsearch)', url: 'https://www.vakilsearch.com', description: 'Online legal document creation and filing service.', tier: 'PAID', category: 'drafting' },
  { name: 'DocuMate', url: 'https://www.documate.org', description: 'Open-source document automation tool for legal aid and pro bono drafting.', tier: 'OPENSOURCE', category: 'drafting' },
  { name: 'AI Advocate (Beta)', url: 'https://www.aiadvocate.in', description: 'Free AI tool for generating basic legal notices and petitions.', tier: 'FREE', category: 'drafting' },

  // Case Management & Tracking
  { name: 'CLAW Case Tracking', url: 'https://www.claw.in', description: 'Dedicated case tracking platform for Indian litigators and firms.', tier: 'PAID', category: 'case_mgmt' },
  { name: 'Provakil CaseFlow', url: 'https://www.provakil.com', description: 'Matter management, hearing tracking, and client communication portal.', tier: 'PAID', category: 'case_mgmt' },
  { name: 'Practice League', url: 'https://www.practiceleague.com', description: 'Law practice management with billing, scheduling, and document storage.', tier: 'PAID', category: 'case_mgmt' },
  { name: 'eCourts Services', url: 'https://services.ecourts.gov.in', description: 'Free government portal for case status, cause lists, and court tracking.', tier: 'FREE', category: 'case_mgmt' },
  { name: 'CaseFlow OSS', url: 'https://github.com/topics/case-management', description: 'Open-source case management system for small firms and solo practitioners.', tier: 'OPENSOURCE', category: 'case_mgmt' },

  // Law Reporters
  { name: 'LiveLaw', url: 'https://www.livelaw.in', description: 'Real-time legal news, Supreme Court reporting, and judgment summaries.', tier: 'FREE', category: 'reporters' },
  { name: 'Bar & Bench', url: 'https://www.barandbench.com', description: 'Legal journalism, analysis, and reporting on Indian judiciary developments.', tier: 'FREE', category: 'reporters' },
  { name: 'Shonee Kapoor Legal Journal', url: 'https://www.shoneekapoor.com', description: 'Men\u2019s rights focused legal reporting and case analysis.', tier: 'FREE', category: 'reporters' },
  { name: 'MyNation Legal Reports', url: 'https://www.mynation.net', description: 'Matrimonial law reporting with a men\u2019s rights perspective.', tier: 'FREE', category: 'reporters' },
  { name: 'Supreme Court Observer', url: 'https://www.scobserver.in', description: 'Curated Supreme Court case summaries and plain-English analysis.', tier: 'FREE', category: 'reporters' },
  { name: 'LawBeat', url: 'https://www.lawbeat.in', description: 'Legal news aggregator covering courts, tribunals, and regulatory bodies.', tier: 'FREE', category: 'reporters' },
];
