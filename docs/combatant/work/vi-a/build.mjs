import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {decodeSnapshot} from '../../../../scripts/import-e7bot.mjs';
const ids=['1003','1004','1005','1008','1009','1010','1012','1017','1018','1021','1024','1027'];
const readJson=p=>JSON.parse(read(p,'utf8'));
const load=id=>decodeSnapshot(read(`docs/combatant/current/api/czn/characters/${id}.html`,'utf8'),'2egkWEkLvR9idARLvjqfJdWKfR24HJgY').data;
const catalog=readJson('data/deck-builder/catalog.json').cards;
function kit(raw){let c=raw.combatant;let cards=[];const visit=c=>{cards.push(c);(c.r_spark_cards??[]).forEach(visit)};[...c.start_cards,...c.spark_cards,...c.collapse_passive.collapse_cards,...c.potential_target_cards,c.collapse_skill_card].filter(Boolean).forEach(visit);for(const extra of catalog.filter(c=>c.ownerId===String(raw.id)&&!cards.some(x=>x.id===c.id)))cards.push({...extra,desc_display:extra.description});let terms=[...new Map(cards.flatMap(c=>[...(c.talent??[]),...(c.tooltips??[])]).map(t=>[t.id,t])).values()];let nodes=[];const node=n=>{nodes.push(n);(n.upgrade_nodes??[]).forEach(node)};raw.potential_nodes.forEach(node);return {cards,terms,ego:c.combatant_limit_breaks,nodes};}
const dict=new Map();
for(const [id,name] of [['1041','renoa'],['1052','narja'],['1033','veronica'],['30075','sereniel']]){
 const detail=readJson(`data/wiki/characters/${id}.json`),sourceCards=[];const visit=card=>{sourceCards.push({...card,desc_display:card.description});card.variants.forEach(visit)};[...detail.startCards,...detail.sparkCards,...detail.collapseCards,...detail.potentialTargetCards,detail.collapseSkillCard].filter(Boolean).forEach(visit);const nodes=[];const walk=n=>{nodes.push(n);(n.upgrade_nodes??[]).forEach(walk)};detail.potentialNodes.forEach(walk);const k={cards:sourceCards,terms:sourceCards.flatMap(c=>[...c.talent,...c.tooltips]),ego:detail.manifestEgo,nodes},cards=readJson(`data/wiki/translations/vi/${name}.cards.json`),gl=readJson(`data/wiki/translations/vi/${name}.glossary.json`),p=readJson(`data/wiki/translations/vi/${name}.progression.json`);
 for(const c of k.cards)if(cards[c.id])dict.set(c.desc_display,cards[c.id]);
 for(const t of k.terms){const g=gl.terms.find(g=>g.id===t.id);if(g){dict.set(t.title,g.title);dict.set(t.desc,g.desc);}}
 for(const n of k.ego)if(p.manifestEgo[n.id])dict.set(n.desc,p.manifestEgo[n.id]);
 for(const n of k.nodes)if(p.potentialNodes[n.id])dict.set(n.desc,p.potentialNodes[n.id]);
}
const numeric=s=>s.replace(/\d+(?:\.\d+)?/g,'#');
const templates=new Map([...dict].filter(([a,b])=>JSON.stringify(a.match(/\d+(?:\.\d+)?/g))===JSON.stringify(b.match(/\d+(?:\.\d+)?/g))).map(([a,b])=>[numeric(a),b]));
const authored=existsSync('docs/combatant/work/vi-a/dictionary.json')?readJson('docs/combatant/work/vi-a/dictionary.json'):{};
const rules=existsSync('docs/combatant/work/vi-a/rules.json')?readJson('docs/combatant/work/vi-a/rules.json'):{};
const words=existsSync('docs/combatant/work/vi-a/words.json')?readJson('docs/combatant/work/vi-a/words.json'):{};
const names=[...new Set(ids.flatMap(id=>{let r=load(id);return [r.name,...kit(r).cards.map(c=>c.name)]}))].sort((a,b)=>b.length-a.length);
const unknownRules=new Map(),unknownWords=new Set();
function word(s){if(!/[a-z]/i.test(s)||names.includes(s))return s;if(words[s])return words[s];if(dict.has(s))return dict.get(s);unknownWords.add(s);return s;}
function group(s){return s.replace(/[^<>]+(?=<|$)/g,(text,offset)=>offset&&s[offset-1]==='<'?text:word(text));}
function segment(s){let slots=[],pattern='',start=0,depth=0,begin=0;const matches=[...s.matchAll(/<[^>]+>/g)];for(const m of matches){if(m[0][1]!=='/'){if(depth===0){pattern+=s.slice(start,m.index);begin=m.index;}depth++;}else{depth--;if(depth===0){pattern+=`{${slots.length}}`;slots.push(group(s.slice(begin,m.index+m[0].length)));start=m.index+m[0].length;}}}pattern+=s.slice(start);for(const name of names){pattern=pattern.split(name).join(`{${slots.length}}`);slots.push(name);}pattern=pattern.replace(/(?<!\{)\b\d+(?:\.\d+)?\b(?!\})/g,m=>{const i=slots.length;slots.push(m);return `{${i}}`;});let remap=[],canonical=pattern.replace(/\{(\d+)\}/g,(_,i)=>{remap.push(slots[+i]);return `{${remap.length-1}}`;});let target=rules[canonical];if(!target){if(!/[a-z]/i.test(canonical))target=canonical;else unknownRules.set(canonical,s);}return (target??canonical).replace(/\{(\d+)\}/g,(_,i)=>remap[+i]);}
const pending=new Map();
function translate(s){if(!s)return s;if(authored[s])return authored[s];if(s==='Handgun Bullet')return 'Đạn súng ngắn';if(s==='Launcher Bullet')return 'Đạn súng phóng';if(words[s])return words[s];if(dict.has(s))return dict.get(s).replaceAll('Rút bài','Rút');if(templates.has(numeric(s))){let ns=s.match(/\d+(?:\.\d+)?/g)??[],i=0;return templates.get(numeric(s)).replace(/\d+(?:\.\d+)?/g,()=>ns[i++]).replaceAll('Rút bài','Rút');}pending.set(s,s);return s.split('<br>').map(segment).join('<br>').replaceAll('Sát thương Kiên cường','Sát thương sức bền');}
let stats=[];
for(const id of ids){const raw=load(id),k=kit(raw);let cards=Object.fromEntries(k.cards.map(c=>[c.id,translate(c.desc_display)]));let glossary={characterId:id,terms:k.terms.map(t=>({id:t.id,title:translate(t.title),englishTitle:t.title,desc:translate(t.desc)}))};let progression={manifestEgo:Object.fromEntries(k.ego.map(n=>[n.id,translate(n.desc)])),potentialNodes:Object.fromEntries(k.nodes.map(n=>[n.id,translate(n.desc)]))};stats.push({id,name:raw.name,cards:k.cards.length,terms:k.terms.length,ego:k.ego.length,potential:k.nodes.length});if(process.argv.includes('--write')){for(const [type,value]of Object.entries({cards,glossary,progression}))write(`data/wiki/translations/vi/${id}.${type}.json`,JSON.stringify(value,null,2)+'\n');}}
write('docs/combatant/work/vi-a/pending.json',JSON.stringify([...pending.keys()],null,2)+'\n');console.log(JSON.stringify(stats));console.log('Source strings handled by authored sentence rules:',pending.size);
write('docs/combatant/work/vi-a/unknown-rules.json',JSON.stringify([...unknownRules],null,2));write('docs/combatant/work/vi-a/unknown-words.json',JSON.stringify([...unknownWords],null,2));console.log('rules',unknownRules.size,'words',unknownWords.size);
