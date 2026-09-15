/*
# Re-seed matrimonial_trends with corrected 100-query source distribution

1. Data
- Replaces the previous 120-row seed with exactly 100 curated queries.
- Source distribution per the dashboard spec:
  * Group 1 (498A & BNS 85) -> google_trends (consumer search)
  * Group 4 (Mutual & Contested Divorce) -> google_trends (consumer search)
  * Group 2 (Maintenance & Alimony) -> reddit (community forum)
  * Group 3 (Child Custody) -> reddit (community forum)
  * Group 5 (NRI Marriages) -> indian_kanoon (legal database)
- Reddit rows are phrased as conversational community questions.
- Indian Kanoon rows are phrased as legal citation / search strings.

2. Idempotency
- Truncates and re-inserts to guarantee the exact 100-row set.
- Re-applies deterministic display metrics from id.
*/

TRUNCATE TABLE matrimonial_trends RESTART IDENTITY;

INSERT INTO matrimonial_trends (query_text, category, source_platform) VALUES
-- Group 1: 498A & BNS 85 -> google_trends (20)
('Cruelty by husband under section 85 BNS vs 498A IPC','498a','google_trends'),
('Ground for quashing 498A FIR in High Court','498a','google_trends'),
('Police notice section 35 BNSS instead of 41A CrPC','498a','google_trends'),
('Can NRI husband get anticipatory bail in 498A case?','498a','google_trends'),
('Arnesh Kumar guidelines for automatic arrest in dowry cases','498a','google_trends'),
('False 498A FIR quashing success rate','498a','google_trends'),
('Quashing of matrimonial case supreme court guidelines 2026','498a','google_trends'),
('How to prove innocence in false dowry harassment case','498a','google_trends'),
('Can distance relatives be removed from 498A FIR?','498a','google_trends'),
('Limitation period for filing 498A complaint after separation','498a','google_trends'),
('Immediate steps after FIR under section 85 BNS','498a','google_trends'),
('Anticipatory bail conditions for NRI matrimonial disputes','498a','google_trends'),
('Police investigation timeline in domestic cruelty cases','498a','google_trends'),
('FIR under section 86 BNS definition of cruelty','498a','google_trends'),
('Landmark judgments on 498A quashing by Bombay High Court','498a','google_trends'),
('Cross-examination strategy for complainant in dowry case','498a','google_trends'),
('Can mother-in-law get bail in false 498A case?','498a','google_trends'),
('Landmark Supreme Court rulings on misuse of dowry laws','498a','google_trends'),
('Compounding of 498A offense through mutual settlement','498a','google_trends'),
('What happens if husband fails to appear for 41A CrPC notice?','498a','google_trends'),
-- Group 2: Maintenance & Alimony -> reddit (20)
('wife filed maintenance case but i lost my job can i reduce it','maintenance','reddit'),
('how is interim maintenance calculated for working wife in india','maintenance','reddit'),
('section 144 bnss vs 125 crpc what actually changed for maintenance','maintenance','reddit'),
('my wife is well educated and earning can she still claim maintenance','maintenance','reddit'),
('what is rajnesh v neha affidavit of assets format and is it mandatory','maintenance','reddit'),
('how to prove husband is hiding income to avoid paying maintenance','maintenance','reddit'),
('can i get interim maintenance increased after job change of husband','maintenance','reddit'),
('is ancestral property counted when calculating permanent alimony','maintenance','reddit'),
('can husband claim maintenance from wife who earns more than him','maintenance','reddit'),
('does maintenance for child continue after turning 18 in india','maintenance','reddit'),
('what to do if husband changed jobs to avoid maintenance enforcement','maintenance','reddit'),
('how long does interim maintenance take in family court bengaluru','maintenance','reddit'),
('can court strike off my defense if i fail to pay interim maintenance','maintenance','reddit'),
('can second wife claim maintenance under section 125 crpc','maintenance','reddit'),
('got ex parte maintenance order how to challenge it in family court','maintenance','reddit'),
('how to recover maintenance arrears under new bnss provisions','maintenance','reddit'),
('what percentage of salary is usually awarded as alimony by courts','maintenance','reddit'),
('i voluntarily quit my job does that excuse me from paying maintenance','maintenance','reddit'),
('can i get stay on interim maintenance order from high court','maintenance','reddit'),
('wife claiming right to residence under domestic violence act advice','maintenance','reddit'),
-- Group 3: Child Custody -> reddit (20)
('what are child custody rights for father of 5 year old boy in india','custody','reddit'),
('are shared parenting guidelines actually followed by indian courts','custody','reddit'),
('how to get weekend visitation rights format for family court','custody','reddit'),
('can my ex deny visitation if i am delayed on maintenance payment','custody','reddit'),
('how to file custody petition under hindu minority and guardianship act','custody','reddit'),
('can father file under guardian and wards act section 25 for custody','custody','reddit'),
('how to transfer custody petition from one state family court to another','custody','reddit'),
('passport renewal of child when i have single parent custody india','custody','reddit'),
('interim custody rules during summer vacations in family court','custody','reddit'),
('can a father get overnight visitation rights for a toddler','custody','reddit'),
('do grandparents have visitation rights in matrimonial disputes in india','custody','reddit'),
('can i request psychological evaluation of child in custody battle','custody','reddit'),
('which landmark judgments say welfare of child is paramount','custody','reddit'),
('what legal remedies if parent abducts child internationally from india','custody','reddit'),
('grounds to modify a final child custody decree in family court','custody','reddit'),
('can my 12 year old child choose which parent to live with in india','custody','reddit'),
('legal action against maternal grandparents for alienating my child','custody','reddit'),
('how to prove parental alienation syndrome evidence in indian courts','custody','reddit'),
('school admission without fathers noc in sole custody case advice','custody','reddit'),
('how to file emergency custody petition under guardian and wards act','custody','reddit'),
-- Group 4: Mutual & Contested Divorce -> google_trends (20)
('Mutual consent divorce cooling-off period waiver 6 months','divorce','google_trends'),
('Steps to file mutual consent divorce under section 13B HMA','divorce','google_trends'),
('Contested divorce on grounds of mental cruelty by wife','divorce','google_trends'),
('How long does a contested divorce take in Mumbai Family Court?','divorce','google_trends'),
('Desertion as a ground for divorce evidence required','divorce','google_trends'),
('Can mutual consent divorce be withdrawn after First Motion?','divorce','google_trends'),
('Desertion for 2 years continuous legal separation rule','divorce','google_trends'),
('Irretrievable breakdown of marriage supreme court article 142','divorce','google_trends'),
('Adultery as a ground for divorce under new BNS code','divorce','google_trends'),
('Family court counseling sessions what to expect','divorce','google_trends'),
('Ex-parte divorce decree set aside timeline','divorce','google_trends'),
('Conversion of contested divorce into mutual consent petition','divorce','google_trends'),
('Void and voidable marriages under Hindu Marriage Act section 11','divorce','google_trends'),
('Divorce petition drafting format for Hindu marriage','divorce','google_trends'),
('Online status tracking for divorce petition eCourts','divorce','google_trends'),
('Cost of contested divorce court fees in India','divorce','google_trends'),
('Can text messages be used as evidence for cruelty in divorce?','divorce','google_trends'),
('Legal notice for restitution of conjugal rights section 9 HMA','divorce','google_trends'),
('Mediation cell process in family court dispute resolution','divorce','google_trends'),
('What happens if spouse refuses to sign second motion divorce?','divorce','google_trends'),
-- Group 5: NRI Marriages -> indian_kanoon (20)
('Overseas divorce recognition Indian courts validity Section 13 CPC','nri','indian_kanoon'),
('Service divorce summons husband residing USA Order V CPC','nri','indian_kanoon'),
('NRI husband absconding legal steps Indian wife proceedings','nri','indian_kanoon'),
('Red Corner Notice NRI husband dowry case CrPC 488','nri','indian_kanoon'),
('Impounding passport NRI husband Passport Act Section 10','nri','indian_kanoon'),
('Indian court injunction NRI spouse filing divorce abroad anti-suit','nri','indian_kanoon'),
('Anti-suit injunction cross border matrimonial dispute landmark','nri','indian_kanoon'),
('Execution foreign maintenance order Indian courts Section 44A CPC','nri','indian_kanoon'),
('Foreign mutual consent divorce decree validity India Section 13','nri','indian_kanoon'),
('Look Out Circular LOC cancellation procedure NRI husband','nri','indian_kanoon'),
('Abandoned NRI wives grievance cell helpline MEA guidelines','nri','indian_kanoon'),
('Jurisdiction Indian courts marriages solemnized abroad Section 20 CPC','nri','indian_kanoon'),
('Extradition matrimonial offenses BNS bilateral treaty','nri','indian_kanoon'),
('Service family court notices email WhatsApp NRI Order V Rule 21','nri','indian_kanoon'),
('Power attorney divorce filing NRI Section 32 Powers of Attorney Act','nri','indian_kanoon'),
('Child custody dispute US citizen child India Guardian Wards Act','nri','indian_kanoon'),
('Financial settlement guidelines NRI divorces Supreme Court','nri','indian_kanoon'),
('Ministry External Affairs assistance NRI marriage disputes circular','nri','indian_kanoon'),
('NRI anticipatory bail video conferencing Section 438 CrPC BNSS','nri','indian_kanoon'),
('High Court writ petition quashing LOC matrimonial case Article 226','nri','indian_kanoon')
ON CONFLICT (query_text, source_platform) DO NOTHING;

-- Compute deterministic display metrics from id.
UPDATE matrimonial_trends SET
  baseline_volume = 5000 + ((id * 137) % 495000),
  trend_percentage = 50 + ((id * 311) % 950),
  region = (ARRAY['Delhi Region','Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh','West Bengal','Telangana','Gujarat','Rajasthan','Punjab','Haryana','Kerala','Bihar','Madhya Pradesh','Andhra Pradesh'])[1 + ((id * 17) % 15)],
  status_badge = CASE WHEN ((id * 53) % 100) > 45 THEN 'Active' ELSE 'Recent Spike' END;
