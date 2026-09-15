export type CategoryKey =
  | '498a'
  | 'maintenance'
  | 'custody'
  | 'divorce'
  | 'nri'
  | 'perjury'
  | 'defamation'
  | 'fines'
  | 'mensrights';

export type SourcePlatform =
  | 'google_trends'
  | 'reddit'
  | 'indian_kanoon'
  | 'livelaw'
  | 'barbench'
  | 'scc'
  | 'shonee'
  | 'mynation';

export interface Category {
  key: CategoryKey;
  label: string;
  icon: string;
}

export interface TrendItem {
  id: number;
  query: string;
  category: CategoryKey;
  source: SourcePlatform;
}

export const CATEGORIES: Category[] = [
  { key: '498a', label: '498A & BNS 85', icon: 'Scale' },
  { key: 'maintenance', label: 'Maintenance & Alimony', icon: 'Wallet' },
  { key: 'custody', label: 'Child Custody', icon: 'Users' },
  { key: 'divorce', label: 'Mutual & Contested Divorce', icon: 'FileText' },
  { key: 'nri', label: 'NRI Marriages', icon: 'Globe' },
  { key: 'perjury', label: 'Perjury & Contempt', icon: 'Gavel' },
  { key: 'defamation', label: 'Defamation & Malicious Cases', icon: 'ShieldAlert' },
  { key: 'fines', label: 'Fines & False Cases Jail Terms', icon: 'Lock' },
  { key: 'mensrights', label: "Men's Rights Frameworks", icon: 'Hand' },
];

export const SOURCE_META: Record<SourcePlatform, { label: string; emoji: string; ring: string; text: string; bg: string }> = {
  google_trends: { label: 'Consumer Search', emoji: '\uD83D\uDD0D', ring: 'ring-sky-200', text: 'text-sky-700', bg: 'bg-sky-50' },
  reddit: { label: 'Community Forum', emoji: '\uD83D\uDCAC', ring: 'ring-orange-200', text: 'text-orange-700', bg: 'bg-orange-50' },
  indian_kanoon: { label: 'Legal Database', emoji: '\u2696\uFE0F', ring: 'ring-violet-200', text: 'text-violet-700', bg: 'bg-violet-50' },
  livelaw: { label: 'LiveLaw', emoji: '\uD83D\uDCF0', ring: 'ring-rose-200', text: 'text-rose-700', bg: 'bg-rose-50' },
  barbench: { label: 'Bar & Bench', emoji: '\uD83D\uDCD8', ring: 'ring-amber-200', text: 'text-amber-700', bg: 'bg-amber-50' },
  scc: { label: 'SCC Online', emoji: '\uD83D\uDCDA', ring: 'ring-indigo-200', text: 'text-indigo-700', bg: 'bg-indigo-50' },
  shonee: { label: 'Shonee Kapoor', emoji: '\uD83D\uDCC4', ring: 'ring-emerald-200', text: 'text-emerald-700', bg: 'bg-emerald-50' },
  mynation: { label: 'MyNation', emoji: '\uD83C\uDF0F', ring: 'ring-cyan-200', text: 'text-cyan-700', bg: 'bg-cyan-50' },
};

interface RawEntry {
  q: string;
  s: SourcePlatform;
}

const RAW: Record<CategoryKey, RawEntry[]> = {
  '498a': [
    { q: 'Cruelty by husband under section 85 BNS vs 498A IPC', s: 'google_trends' },
    { q: 'Ground for quashing 498A FIR in High Court', s: 'google_trends' },
    { q: 'Police notice section 35 BNSS instead of 41A CrPC', s: 'google_trends' },
    { q: 'Can NRI husband get anticipatory bail in 498A case?', s: 'google_trends' },
    { q: 'Arnesh Kumar guidelines for automatic arrest in dowry cases', s: 'google_trends' },
    { q: 'False 498A FIR quashing success rate', s: 'google_trends' },
    { q: 'Quashing of matrimonial case supreme court guidelines 2026', s: 'google_trends' },
    { q: 'How to prove innocence in false dowry harassment case', s: 'google_trends' },
    { q: 'Can distance relatives be removed from 498A FIR?', s: 'google_trends' },
    { q: 'Limitation period for filing 498A complaint after separation', s: 'google_trends' },
    { q: 'Immediate steps after FIR under section 85 BNS', s: 'google_trends' },
    { q: 'Anticipatory bail conditions for NRI matrimonial disputes', s: 'google_trends' },
    { q: 'Police investigation timeline in domestic cruelty cases', s: 'google_trends' },
    { q: 'FIR under section 86 BNS definition of cruelty', s: 'google_trends' },
    { q: 'Landmark judgments on 498A quashing by Bombay High Court', s: 'google_trends' },
    { q: 'Cross-examination strategy for complainant in dowry case', s: 'google_trends' },
    { q: 'Can mother-in-law get bail in false 498A case?', s: 'google_trends' },
    { q: 'Landmark Supreme Court rulings on misuse of dowry laws', s: 'google_trends' },
    { q: 'Compounding of 498A offense through mutual settlement', s: 'google_trends' },
    { q: 'What happens if husband fails to appear for 41A CrPC notice?', s: 'google_trends' },
  ],
  maintenance: [
    { q: 'wife filed maintenance case but i lost my job can i reduce it', s: 'reddit' },
    { q: 'how is interim maintenance calculated for working wife in india', s: 'reddit' },
    { q: 'section 144 bnss vs 125 crpc what actually changed for maintenance', s: 'reddit' },
    { q: 'my wife is well educated and earning can she still claim maintenance', s: 'reddit' },
    { q: 'what is rajnesh v neha affidavit of assets format and is it mandatory', s: 'reddit' },
    { q: 'how to prove husband is hiding income to avoid paying maintenance', s: 'reddit' },
    { q: 'can i get interim maintenance increased after job change of husband', s: 'reddit' },
    { q: 'is ancestral property counted when calculating permanent alimony', s: 'reddit' },
    { q: 'can husband claim maintenance from wife who earns more than him', s: 'reddit' },
    { q: 'does maintenance for child continue after turning 18 in india', s: 'reddit' },
    { q: 'what to do if husband changed jobs to avoid maintenance enforcement', s: 'reddit' },
    { q: 'how long does interim maintenance take in family court bengaluru', s: 'reddit' },
    { q: 'can court strike off my defense if i fail to pay interim maintenance', s: 'reddit' },
    { q: 'can second wife claim maintenance under section 125 crpc', s: 'reddit' },
    { q: 'got ex parte maintenance order how to challenge it in family court', s: 'reddit' },
    { q: 'how to recover maintenance arrears under new bnss provisions', s: 'reddit' },
    { q: 'what percentage of salary is usually awarded as alimony by courts', s: 'reddit' },
    { q: 'i voluntarily quit my job does that excuse me from paying maintenance', s: 'reddit' },
    { q: 'can i get stay on interim maintenance order from high court', s: 'reddit' },
    { q: 'wife claiming right to residence under domestic violence act advice', s: 'reddit' },
  ],
  custody: [
    { q: 'what are child custody rights for father of 5 year old boy in india', s: 'reddit' },
    { q: 'are shared parenting guidelines actually followed by indian courts', s: 'reddit' },
    { q: 'how to get weekend visitation rights format for family court', s: 'reddit' },
    { q: 'can my ex deny visitation if i am delayed on maintenance payment', s: 'reddit' },
    { q: 'how to file custody petition under hindu minority and guardianship act', s: 'reddit' },
    { q: 'can father file under guardian and wards act section 25 for custody', s: 'reddit' },
    { q: 'how to transfer custody petition from one state family court to another', s: 'reddit' },
    { q: 'passport renewal of child when i have single parent custody india', s: 'reddit' },
    { q: 'interim custody rules during summer vacations in family court', s: 'reddit' },
    { q: 'can a father get overnight visitation rights for a toddler', s: 'reddit' },
    { q: 'do grandparents have visitation rights in matrimonial disputes in india', s: 'reddit' },
    { q: 'can i request psychological evaluation of child in custody battle', s: 'reddit' },
    { q: 'which landmark judgments say welfare of child is paramount', s: 'reddit' },
    { q: 'what legal remedies if parent abducts child internationally from india', s: 'reddit' },
    { q: 'grounds to modify a final child custody decree in family court', s: 'reddit' },
    { q: 'can my 12 year old child choose which parent to live with in india', s: 'reddit' },
    { q: 'legal action against maternal grandparents for alienating my child', s: 'reddit' },
    { q: 'how to prove parental alienation syndrome evidence in indian courts', s: 'reddit' },
    { q: 'school admission without fathers noc in sole custody case advice', s: 'reddit' },
    { q: 'how to file emergency custody petition under guardian and wards act', s: 'reddit' },
  ],
  divorce: [
    { q: 'Mutual consent divorce cooling-off period waiver 6 months', s: 'google_trends' },
    { q: 'Steps to file mutual consent divorce under section 13B HMA', s: 'google_trends' },
    { q: 'Contested divorce on grounds of mental cruelty by wife', s: 'google_trends' },
    { q: 'How long does a contested divorce take in Mumbai Family Court?', s: 'google_trends' },
    { q: 'Desertion as a ground for divorce evidence required', s: 'google_trends' },
    { q: 'Can mutual consent divorce be withdrawn after First Motion?', s: 'google_trends' },
    { q: 'Desertion for 2 years continuous legal separation rule', s: 'google_trends' },
    { q: 'Irretrievable breakdown of marriage supreme court article 142', s: 'google_trends' },
    { q: 'Adultery as a ground for divorce under new BNS code', s: 'google_trends' },
    { q: 'Family court counseling sessions what to expect', s: 'google_trends' },
    { q: 'Ex-parte divorce decree set aside timeline', s: 'google_trends' },
    { q: 'Conversion of contested divorce into mutual consent petition', s: 'google_trends' },
    { q: 'Void and voidable marriages under Hindu Marriage Act section 11', s: 'google_trends' },
    { q: 'Divorce petition drafting format for Hindu marriage', s: 'google_trends' },
    { q: 'Online status tracking for divorce petition eCourts', s: 'google_trends' },
    { q: 'Cost of contested divorce court fees in India', s: 'google_trends' },
    { q: 'Can text messages be used as evidence for cruelty in divorce?', s: 'google_trends' },
    { q: 'Legal notice for restitution of conjugal rights section 9 HMA', s: 'google_trends' },
    { q: 'Mediation cell process in family court dispute resolution', s: 'google_trends' },
    { q: 'What happens if spouse refuses to sign second motion divorce?', s: 'google_trends' },
  ],
  nri: [
    { q: 'Overseas divorce recognition Indian courts validity Section 13 CPC', s: 'indian_kanoon' },
    { q: 'Service divorce summons husband residing USA Order V CPC', s: 'indian_kanoon' },
    { q: 'NRI husband absconding legal steps Indian wife proceedings', s: 'indian_kanoon' },
    { q: 'Red Corner Notice NRI husband dowry case CrPC 488', s: 'indian_kanoon' },
    { q: 'Impounding passport NRI husband Passport Act Section 10', s: 'indian_kanoon' },
    { q: 'Indian court injunction NRI spouse filing divorce abroad anti-suit', s: 'indian_kanoon' },
    { q: 'Anti-suit injunction cross border matrimonial dispute landmark', s: 'indian_kanoon' },
    { q: 'Execution foreign maintenance order Indian courts Section 44A CPC', s: 'indian_kanoon' },
    { q: 'Foreign mutual consent divorce decree validity India Section 13', s: 'indian_kanoon' },
    { q: 'Look Out Circular LOC cancellation procedure NRI husband', s: 'indian_kanoon' },
    { q: 'Abandoned NRI wives grievance cell helpline MEA guidelines', s: 'indian_kanoon' },
    { q: 'Jurisdiction Indian courts marriages solemnized abroad Section 20 CPC', s: 'indian_kanoon' },
    { q: 'Extradition matrimonial offenses BNS bilateral treaty', s: 'indian_kanoon' },
    { q: 'Service family court notices email WhatsApp NRI Order V Rule 21', s: 'indian_kanoon' },
    { q: 'Power attorney divorce filing NRI Section 32 Powers of Attorney Act', s: 'indian_kanoon' },
    { q: 'Child custody dispute US citizen child India Guardian Wards Act', s: 'indian_kanoon' },
    { q: 'Financial settlement guidelines NRI divorces Supreme Court', s: 'indian_kanoon' },
    { q: 'Ministry External Affairs assistance NRI marriage disputes circular', s: 'indian_kanoon' },
    { q: 'NRI anticipatory bail video conferencing Section 438 CrPC BNSS', s: 'indian_kanoon' },
    { q: 'High Court writ petition quashing LOC matrimonial case Article 226', s: 'indian_kanoon' },
  ],
  perjury: [
    { q: 'Section 340 CrPC application in false matrimonial case perjury', s: 'livelaw' },
    { q: 'BNSS Section 379 perjury proceedings against false affidavit in maintenance', s: 'livelaw' },
    { q: 'How to file perjury case against wife for false allegations in 498A', s: 'shonee' },
    { q: 'Contempt of court petition against false DV act allegations', s: 'barbench' },
    { q: 'Perjury application format family court false evidence affidavit', s: 'shonee' },
    { q: 'Landmark Supreme Court perjury judgments matrimonial disputes', s: 'scc' },
    { q: 'Section 193 IPC false evidence in divorce case conviction rate', s: 'indian_kanoon' },
    { q: 'BNSS 226 giving false evidence in family court proceedings', s: 'livelaw' },
    { q: 'How to initiate contempt proceedings for violating court orders', s: 'barbench' },
    { q: 'Perjury charges for fabricated evidence in custody case', s: 'shonee' },
    { q: 'False sworn affidavit consequences under BNSS perjury section', s: 'scc' },
    { q: 'Contempt petition draft format for family court order violation', s: 'mynation' },
    { q: 'Can perjury be filed during ongoing matrimonial case?', s: 'reddit' },
    { q: 'Section 340 CrPC vs BNSS 379 what changed for perjury', s: 'livelaw' },
    { q: 'Punishment for perjury in Indian courts imprisonment term', s: 'indian_kanoon' },
    { q: 'How to prove false evidence was given in maintenance hearing', s: 'shonee' },
    { q: 'Perjury application dismissed by family court what next', s: 'mynation' },
    { q: 'Contempt of court act Section 12 punishment for false statements', s: 'scc' },
    { q: 'Judgments on perjury section 340 CrPC against complainant wife', s: 'indian_kanoon' },
    { q: 'Contempt of court rules for violating child visitation interim orders', s: 'barbench' },
    { q: 'Filing perjury applications during cross-examination stage in family court', s: 'livelaw' },
    { q: 'BNSS 379 perjury referral timeline from family court to magistrate', s: 'scc' },
    { q: 'How to prove fabricated affidavit evidence in maintenance hearing perjury', s: 'shonee' },
    { q: 'Contempt petition against wife for violating injunction order family court', s: 'mynation' },
    { q: 'Section 340 CrPC application format draft template matrimonial cases', s: 'reddit' },
  ],
  defamation: [
    { q: 'Defamation case against wife for false 498A allegations BNS 356', s: 'shonee' },
    { q: 'BNS Section 356 defamation by false matrimonial accusations', s: 'livelaw' },
    { q: 'How to file defamation suit for false dowry harassment claims', s: 'shonee' },
    { q: 'IPC 499 500 defamation false DV act allegations landmark cases', s: 'scc' },
    { q: 'Malicious prosecution case against false FIR matrimonial dispute', s: 'barbench' },
    { q: 'Defamation damages claim amount for false 498A case', s: 'mynation' },
    { q: 'BNS 356 defamation punishment imprisonment and fine', s: 'indian_kanoon' },
    { q: 'Can husband file defamation after acquittal in 498A case', s: 'shonee' },
    { q: 'Defamation suit against wife relatives for false allegations', s: 'mynation' },
    { q: 'Malicious prosecution elements proof required Indian courts', s: 'barbench' },
    { q: 'Defamation by wife on social media during divorce case', s: 'reddit' },
    { q: 'Criminal defamation vs civil defamation in matrimonial cases', s: 'livelaw' },
    { q: 'BNS 358 defamation against women false matrimonial context', s: 'scc' },
    { q: 'Defamation complaint format magistrate court filing', s: 'shonee' },
    { q: 'Landmark defamation judgments acquittal after false 498A', s: 'indian_kanoon' },
    { q: 'False rape allegations defamation case BNS provisions', s: 'mynation' },
    { q: 'Criminal defamation section 356 BNS counters against false complaints', s: 'livelaw' },
    { q: 'Can husband sue for malicious prosecution after 498A acquittal?', s: 'shonee' },
    { q: 'Defamation damages calculation for false dowry harassment case', s: 'indian_kanoon' },
    { q: 'BNS 356 defamation complaint against in-laws for false 498A allegations', s: 'barbench' },
    { q: 'Malicious prosecution civil suit compensation after acquittal India', s: 'scc' },
    { q: 'Defamation by false domestic violence allegations BNS 356 punishment', s: 'mynation' },
    { q: 'Criminal defamation vs civil suit for malicious prosecution strategy', s: 'reddit' },
  ],
  fines: [
    { q: 'BNS Section 85 punishment imprisonment fine cruelty by husband', s: 'indian_kanoon' },
    { q: 'False 498A FIR punishment for misuse of dowry law', s: 'shonee' },
    { q: 'BNS Section 226 false evidence jail term 7 years', s: 'livelaw' },
    { q: 'Punishment for filing false FIR against husband BNS provisions', s: 'barbench' },
    { q: 'Section 340 CrPC punishment for perjury in family court', s: 'scc' },
    { q: 'BNS 356 defamation imprisonment term 2 years fine', s: 'indian_kanoon' },
    { q: 'False DV act case punishment misuse of domestic violence law', s: 'shonee' },
    { q: 'Jail term for false allegations in matrimonial case India', s: 'mynation' },
    { q: 'BNS 241 false charge of offence made to injure person punishment', s: 'livelaw' },
    { q: 'Fine amount for false 498A case compensation to husband', s: 'shonee' },
    { q: 'BNS 217 false information to public servant punishment', s: 'scc' },
    { q: 'Punishment for misuse of section 85 BNS cruelty provision', s: 'barbench' },
    { q: 'Compensation for false matrimonial case harassment Supreme Court', s: 'indian_kanoon' },
    { q: 'BNS 222 false evidence in judicial proceeding jail term', s: 'livelaw' },
    { q: 'False affidavit in maintenance case punishment BNSS 379', s: 'shonee' },
    { q: 'BNS 248 false charge of offence punishment imprisonment', s: 'scc' },
    { q: 'Exemplary fines imposed by Supreme Court for malicious 498A litigation', s: 'scc' },
    { q: 'Jail term timeline for conspiracy to frame husband under section 85 BNS', s: 'indian_kanoon' },
    { q: 'BNS Section 85 quashing timelines vs legacy 498A IPC petitions', s: 'livelaw' },
    { q: 'Compensation amount for wrongful arrest in false dowry case Supreme Court', s: 'barbench' },
    { q: 'BNS 241 false charge of offence punishment jail term and fine', s: 'shonee' },
    { q: 'Fine and imprisonment for filing false affidavit in maintenance case', s: 'mynation' },
    { q: 'Punishment for misuse of domestic violence act BNS provisions', s: 'scc' },
  ],
  mensrights: [
    { q: 'Men rights organization India false 498A support', s: 'mynation' },
    { q: 'Save Indian Family Foundation helpline false dowry case', s: 'shonee' },
    { q: 'Husband rights in divorce India property division', s: 'mynation' },
    { q: 'Fathers rights custody India shared parenting movement', s: 'shonee' },
    { q: 'Men rights activists India matrimonial law reform', s: 'reddit' },
    { q: 'False 498A victim support group India men rights', s: 'mynation' },
    { q: 'Shonee Kapoor men rights legal guidance false cases', s: 'shonee' },
    { q: 'MyNation foundation men rights matrimonial harassment', s: 'mynation' },
    { q: 'Vaastav foundation false DV act victims support', s: 'shonee' },
    { q: 'Men rights legal aid free consultation false case', s: 'mynation' },
    { q: 'Husband harassment by wife legal remedies India', s: 'shonee' },
    { q: 'BNS provisions protecting husbands from false allegations', s: 'barbench' },
    { q: 'Men rights PIL Supreme Court misuse of 498A', s: 'livelaw' },
    { q: 'Fathers rights joint custody legal framework India', s: 'scc' },
    { q: 'Men rights awareness campaign matrimonial law abuse', s: 'mynation' },
    { q: 'Gender neutral matrimonial laws India men rights demand', s: 'livelaw' },
    { q: 'Husband protection from false DV act BNS provisions', s: 'shonee' },
    { q: 'Men rights forum India legal support community', s: 'mynation' },
    { q: 'Husband rights against false 498A BNS 85 misuse legal remedies', s: 'shonee' },
    { q: 'Men rights PIL filed Supreme Court gender neutral matrimonial laws', s: 'livelaw' },
    { q: 'False dowry case victim support helpline men rights India', s: 'mynation' },
    { q: 'Fathers rights joint custody landmark judgments India 2024', s: 'scc' },
    { q: 'Men rights movement demand repeal of section 85 BNS misuse', s: 'barbench' },
    { q: 'Husband legal defense strategy false cruelty allegations BNS 86', s: 'shonee' },
    { q: 'Men rights awareness matrimonial law abuse statistics India', s: 'reddit' },
  ],
};

export const TRENDS: TrendItem[] = Object.entries(RAW).flatMap(
  ([category, entries]) =>
    entries.map((entry, i) => ({
      id: Number(`${Object.keys(RAW).indexOf(category)}${String(i).padStart(2, '0')}`),
      query: entry.q,
      category: category as CategoryKey,
      source: entry.s,
    })),
);

export const REGIONS = [
  'Delhi Region',
  'Maharashtra',
  'Karnataka',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
  'Telangana',
  'Gujarat',
  'Rajasthan',
  'Punjab',
  'Haryana',
  'Kerala',
  'Bihar',
  'Madhya Pradesh',
  'Andhra Pradesh',
];

export const TIME_LABELS = [
  '12 minutes ago',
  '38 minutes ago',
  '1 hour ago',
  '2 hours ago',
  '4 hours ago',
  '6 hours ago',
  '9 hours ago',
  '12 hours ago',
  '18 hours ago',
  '1 day ago',
];
