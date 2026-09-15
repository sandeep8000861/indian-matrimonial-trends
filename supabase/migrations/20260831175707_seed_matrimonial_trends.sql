/*
# Seed matrimonial_trends with 100 multi-source queries

1. Data
- Inserts 100 curated Indian matrimonial / family-law queries spanning five categories.
- Each row is tagged with a source_platform: google_trends, reddit, or indian_kanoon.
- Reddit rows are phrased as real-world community questions (lowercase, conversational).
- Indian Kanoon rows are phrased as legal citation / search strings.
- Google Trends rows are phrased as consumer search queries.

2. Metrics
- baseline_volume, trend_percentage, region, and status_badge are computed
  deterministically from the row id using modulo arithmetic so values stay stable
  across re-runs and match the dashboard's seeded display.

3. Idempotency
- Uses a unique constraint on (query_text, source_platform) and ON CONFLICT DO NOTHING,
  so re-running the migration does not duplicate rows.
*/

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'matrimonial_trends_query_source_unique'
  ) THEN
    ALTER TABLE matrimonial_trends
      ADD CONSTRAINT matrimonial_trends_query_source_unique
      UNIQUE (query_text, source_platform);
  END IF;
END $$;

INSERT INTO matrimonial_trends (query_text, category, source_platform) VALUES
-- 498A & BNS 85 (24)
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
('Landmark judgments on 498A quashing by Bombay High Court','498a','indian_kanoon'),
('Cross-examination strategy for complainant in dowry case','498a','indian_kanoon'),
('Can mother-in-law get bail in false 498A case?','498a','google_trends'),
('Landmark Supreme Court rulings on misuse of dowry laws','498a','indian_kanoon'),
('Compounding of 498A offense through mutual settlement','498a','indian_kanoon'),
('What happens if husband fails to appear for 41A CrPC notice?','498a','google_trends'),
('wife filed false 498a on me and my parents how to get anticipatory bail','498a','reddit'),
('498A quashing compromise grounds high court recent judgment','498a','indian_kanoon'),
('police came with 41a notice what should i do now','498a','reddit'),
('BNS section 85 cruelty elements proof required trial court','498a','indian_kanoon'),
-- Maintenance & Alimony (24)
('Interim maintenance formula for working wife in India','maintenance','google_trends'),
('Section 144 BNSS vs Section 125 CrPC maintenance changes','maintenance','google_trends'),
('Can a well-educated wife claim maintenance under Indian law?','maintenance','google_trends'),
('Landmark judgment on maintenance: Rajnesh v. Neha compliance','maintenance','indian_kanoon'),
('Affidavit of assets and liabilities mandatory format download','maintenance','google_trends'),
('Interim maintenance enhancement application grounds','maintenance','google_trends'),
('How to track actual salary of husband for alimony calculation','maintenance','google_trends'),
('Is ancestral property considered while calculating permanent alimony?','maintenance','google_trends'),
('Can husband claim maintenance from earning wife under HMA?','maintenance','google_trends'),
('Maintenance rights of child after turning 18 in India','maintenance','google_trends'),
('Enforcement of maintenance order if husband changes job','maintenance','google_trends'),
('Interim maintenance timeline in family court Bengaluru','maintenance','google_trends'),
('Striking off defense if husband fails to pay interim maintenance','maintenance','indian_kanoon'),
('Can second wife claim maintenance under section 125 CrPC?','maintenance','google_trends'),
('Interim maintenance stay orders from High Court','maintenance','indian_kanoon'),
('Recovery of maintenance arrears under new BNSS provisions','maintenance','google_trends'),
('Standard percentage of salary awarded as alimony by courts','maintenance','google_trends'),
('Does voluntary unemployment excuse husband from paying maintenance?','maintenance','google_trends'),
('Challenging ex-parte maintenance order in family court','maintenance','google_trends'),
('Right to residence for wife under Domestic Violence Act','maintenance','indian_kanoon'),
('husband hiding income to avoid maintenance how to prove actual salary','maintenance','reddit'),
('Rajnesh v Neha affidavit assets format family court filing','maintenance','indian_kanoon'),
('wife earning 1 lakh still claiming maintenance is this legal','maintenance','reddit'),
('section 125 CrPC maintenance arrears recovery BNSS 144','maintenance','indian_kanoon'),
-- Child Custody (24)
('Child custody rights for father of a 5 year old boy','custody','google_trends'),
('Shared parenting guidelines issued by Indian courts','custody','google_trends'),
('Visitation rights on weekends format family court','custody','google_trends'),
('Can mother deny visitation rights if maintenance is delayed?','custody','google_trends'),
('Custody of minor child under Hindu Minority and Guardianship Act','custody','indian_kanoon'),
('Guardian and Wards Act section 25 petition by father','custody','indian_kanoon'),
('Transfer of custody petition from one state to another','custody','google_trends'),
('Passport renewal of child in single parent custody India','custody','google_trends'),
('Interim custody during summer vacations family court rules','custody','google_trends'),
('Can a father get overnight visitation of a toddler?','custody','google_trends'),
('Grandparents visitation rights in Indian matrimonial disputes','custody','google_trends'),
('Psychological evaluation of child in custody battles','custody','indian_kanoon'),
('Welfare of the child is paramount landmark judgments','custody','indian_kanoon'),
('International child abduction by parent legal remedies India','custody','google_trends'),
('Modifying final child custody decree grounds','custody','google_trends'),
('Can a child choose which parent to live with at age 12?','custody','google_trends'),
('Legal action against maternal grandparents for alienating child','custody','google_trends'),
('Parental Alienation Syndrome evidence in Indian courts','custody','indian_kanoon'),
('School admission without father''s NOC in sole custody cases','custody','google_trends'),
('Emergency custody petition under Guardian and Wards Act','custody','google_trends'),
('ex wife not allowing visitation despite court order what can i do','custody','reddit'),
('Guardian Wards Act section 25 father custody petition grounds','custody','indian_kanoon'),
('how to get custody of my 6 year old daughter as a father','custody','reddit'),
('Hindu Minority Guardianship Act welfare child paramount judgment','custody','indian_kanoon'),
-- Mutual & Contested Divorce (24)
('Mutual consent divorce cooling-off period waiver 6 months','divorce','google_trends'),
('Steps to file mutual consent divorce under section 13B HMA','divorce','google_trends'),
('Contested divorce on grounds of mental cruelty by wife','divorce','google_trends'),
('How long does a contested divorce take in Mumbai Family Court?','divorce','google_trends'),
('Desertion as a ground for divorce evidence required','divorce','google_trends'),
('Can mutual consent divorce be withdrawn after First Motion?','divorce','google_trends'),
('Desertion for 2 years continuous legal separation rule','divorce','google_trends'),
('Irretrievable breakdown of marriage supreme court article 142','divorce','indian_kanoon'),
('Adultery as a ground for divorce under new BNS code','divorce','google_trends'),
('Family court counseling sessions what to expect','divorce','google_trends'),
('Ex-parte divorce decree set aside timeline','divorce','indian_kanoon'),
('Conversion of contested divorce into mutual consent petition','divorce','google_trends'),
('Void and voidable marriages under Hindu Marriage Act section 11','divorce','indian_kanoon'),
('Divorce petition drafting format for Hindu marriage','divorce','google_trends'),
('Online status tracking for divorce petition eCourts','divorce','google_trends'),
('Cost of contested divorce court fees in India','divorce','google_trends'),
('Can text messages be used as evidence for cruelty in divorce?','divorce','google_trends'),
('Legal notice for restitution of conjugal rights section 9 HMA','divorce','indian_kanoon'),
('Mediation cell process in family court dispute resolution','divorce','google_trends'),
('What happens if spouse refuses to sign second motion divorce?','divorce','google_trends'),
('Husband filed section 9 hma what to do next','divorce','reddit'),
('Article 142 irretrievable breakdown marriage Supreme Court judgment','divorce','indian_kanoon'),
('mutual consent divorce cooling off period waiver chances','divorce','reddit'),
('Hindu Marriage Act section 13B mutual consent divorce format','divorce','indian_kanoon'),
-- NRI Marriages (24)
('Overseas divorce recognition in Indian courts validity','nri','google_trends'),
('How to serve divorce summons to husband living in USA','nri','google_trends'),
('NRI husband absconding lookup legal steps for Indian wife','nri','google_trends'),
('Red Corner Notice against NRI husband in dowry case','nri','google_trends'),
('Impounding passport of NRI husband under Passport Act India','nri','google_trends'),
('Can an Indian court stop an NRI spouse from filing divorce abroad?','nri','google_trends'),
('Anti-suit injunction in cross border matrimonial disputes','nri','indian_kanoon'),
('Execution of foreign maintenance order in Indian courts','nri','indian_kanoon'),
('Validity of a foreign mutual consent divorce decree in India','nri','indian_kanoon'),
('Look Out Circular (LOC) cancellation procedure for NRI husband','nri','google_trends'),
('Abandoned NRI wives grievance cell helpline details','nri','google_trends'),
('Jurisdiction of Indian courts for marriages solemnized abroad','nri','indian_kanoon'),
('Extradition process for matrimonial offenses under BNS','nri','google_trends'),
('Serving family court notices via email or WhatsApp to NRI','nri','google_trends'),
('Power of attorney format for divorce filing by NRI','nri','google_trends'),
('Child custody dispute when child is a US citizen in India','nri','google_trends'),
('Financial settlement guidelines for NRI divorces','nri','google_trends'),
('Ministry of External Affairs assistance for NRI marriage disputes','nri','google_trends'),
('Can an NRI file for anticipatory bail via video conferencing?','nri','google_trends'),
('High Court writ petition for quashing LOC in matrimonial case','nri','indian_kanoon'),
('NRI husband left me after 2 months of marriage what legal options','nri','reddit'),
('foreign divorce decree recognition India Section 13 CPC judgment','nri','indian_kanoon'),
('how to serve divorce notice to wife who went back to india from usa','nri','reddit'),
('Look Out Circular LOC quashing High Court matrimonial case','nri','indian_kanoon')
ON CONFLICT (query_text, source_platform) DO NOTHING;

-- Compute deterministic display metrics from id.
UPDATE matrimonial_trends SET
  baseline_volume = 5000 + ((id * 137) % 495000),
  trend_percentage = 50 + ((id * 311) % 950),
  region = (ARRAY['Delhi Region','Maharashtra','Karnataka','Tamil Nadu','Uttar Pradesh','West Bengal','Telangana','Gujarat','Rajasthan','Punjab','Haryana','Kerala','Bihar','Madhya Pradesh','Andhra Pradesh'])[1 + ((id * 17) % 15)],
  status_badge = CASE WHEN ((id * 53) % 100) > 45 THEN 'Active' ELSE 'Recent Spike' END
WHERE baseline_volume = 0 OR region IS NULL OR status_badge IS NULL;
