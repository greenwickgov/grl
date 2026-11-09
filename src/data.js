export const teams=[
{slug:'kinbara-knights',facebook:'https://www.facebook.com/profile.php?id=61584026663612',name:'Kinbara Knights',short:'KNI',color:'#344cbc',symbol:'♞'},
{slug:'winton-bay-warriors',facebook:'https://www.facebook.com/profile.php?id=61589754275375',name:'Winton Bay Warriors',short:'WAR',color:'#974337',symbol:'⚔'},
{slug:'corrobin-crows',name:'Corrobin Crows',short:'CRO',color:'#2f3f54',symbol:'✦'},
{slug:'northbridge-eagles',name:'Northbridge Eagles',short:'EAG',color:'#257874',symbol:'⌁'},
{slug:'terrabrook-dolphins',name:'Terrabrook Dolphins',short:'DOL',color:'#1997ac',symbol:'≈'},
{slug:'clearwyn-bay-lions',name:'Clearwyn Bay Lions',short:'LIO',color:'#cf7626',symbol:'♛'}];

export const news=[{slug:'clearwyn-bay-2026-champions',title:'The pride of Clearwyn Bay.',category:'2026 PREMIERS',team:'clearwyn-bay-lions',summary:'Clearwyn Bay Lions are your 2026 GRL champions.',body:'Clearwyn Bay Lions are the 2026 Greenwick Rugby League champions. Follow the official GRL website for future competition announcements, fixtures and results.',publishedAt:Date.UTC(2026,10,9),published:true},{slug:'6flix-broadcast-partnership',title:'A new home for GRL.',category:'BROADCAST',summary:'6FLIX holds exclusive GRL broadcast rights for 2027–2032.',body:'6FLIX holds exclusive broadcast rights for Greenwick Rugby League for 2027–2032. Match schedules and viewing information will be published when confirmed.',publishedAt:Date.UTC(2026,10,8),published:true}];

const grounds={
  'clearwyn-bay-lions':'Clearwyn Bay Stadium','corrobin-crows':'Corrobin Oval',
  'kinbara-knights':'Kinbara Park','northbridge-eagles':'Northbridge Sports Ground',
  'terrabrook-dolphins':'Terrabrook Oval','winton-bay-warriors':'Winton Bay Oval'
};
const A='clearwyn-bay-lions',B='corrobin-crows',C='kinbara-knights',D='northbridge-eagles',E='terrabrook-dolphins',F='winton-bay-warriors';
const firstLeg=[[[A,F],[B,E],[C,D]],[[A,E],[F,D],[B,C]],[[A,D],[E,C],[F,B]],[[A,C],[D,B],[E,F]],[[A,B],[C,F],[D,E]]];
const roundRobin=[...firstLeg,...firstLeg.map(round=>round.map(([home,away])=>[away,home]))];
const dateFor=(year,round,slot)=>new Date(Date.UTC(year,3,3+(round-1)*7,9+slot*3)).toISOString();
const match=(year,round,slot,[home,away],status='scheduled',homeScore=null,awayScore=null)=>({_id:`${year}-${round}-${slot}-${home}`,round,kickoff:dateFor(year,round,slot),home,away,venue:grounds[home],status,homeScore,awayScore});
const score2026=(round,slot,[home,away])=>{
  if(home===A)return [24+(round%4)*2,10+(slot%3)*4];
  if(away===A)return [10+(slot%3)*4,24+(round%4)*2];
  const homeWins=(round+slot)%3!==0;return homeWins?[22+(round%3)*2,14+(slot%3)*2]:[12+(slot%3)*2,24+(round%3)*2];
};
export const fixtures2026=roundRobin.flatMap((round,index)=>round.map((pair,slot)=>{const [homeScore,awayScore]=score2026(index+1,slot,pair);return match(2026,index+1,slot,pair,'final',homeScore,awayScore)}));

// Six selected games move into rounds 11–12. This gives each club two byes,
// while retaining a true home-and-away competition (every pairing twice).
const moved=new Set(['1-0','2-2','3-0','4-2','5-2','7-2']);
export const fixtures2027=roundRobin.flatMap((round,index)=>round.flatMap((pair,slot)=>{
  const key=`${index+1}-${slot}`;
  if(moved.has(key))return [];
  return [match(2027,index+1,slot,pair)];
})).concat(
  [[A,F],[D,E],[B,C]].map((pair,index)=>match(2027,11,index,pair)),
  [[A,D],[E,F],[C,B]].map((pair,index)=>match(2027,12,index,pair))
);

export const ladder2026=[
{slug:A,name:'Clearwyn Bay Lions',p:10,w:10,d:0,l:0,pf:260,pa:120,diff:140,pts:20},
{slug:D,name:'Northbridge Eagles',p:10,w:6,d:1,l:3,pf:220,pa:170,diff:50,pts:13},
{slug:B,name:'Corrobin Crows',p:10,w:4,d:2,l:4,pf:190,pa:185,diff:5,pts:10},
{slug:C,name:'Kinbara Knights',p:10,w:3,d:3,l:4,pf:174,pa:195,diff:-21,pts:9},
{slug:E,name:'Terrabrook Dolphins',p:10,w:2,d:4,l:4,pf:160,pa:220,diff:-60,pts:8},
{slug:F,name:'Winton Bay Warriors',p:10,w:0,d:0,l:10,pf:110,pa:224,diff:-114,pts:0}
];
export const ladder2027=[...teams].sort((a,b)=>a.name.localeCompare(b.name)).map(t=>({slug:t.slug,name:t.name,p:0,w:0,d:0,l:0,pf:0,pa:0,diff:0,pts:0}));
export const fallback={teams,news,matches:fixtures2026,ladder:ladder2026};
export const fallbackForSeason=season=>({teams,news,matches:season===2027?fixtures2027:fixtures2026,ladder:season===2027?ladder2027:ladder2026});
