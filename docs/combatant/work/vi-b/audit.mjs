import{readFileSync as read,writeFileSync as write}from'node:fs';
import{decodeSnapshot}from'../../../../scripts/import-e7bot.mjs';
const ids=['1039','1040','1043','1049','1050','1055','1056','1057','1060','1061','1062'];
const json=p=>JSON.parse(read(p,'utf8')),catalog=json('data/deck-builder/catalog.json').cards;
const failures=[],english=[],nameFailures=[];let compared=0;
const names=[...new Set(catalog.filter(c=>ids.includes(c.ownerId)).map(c=>c.name))];
const plain=s=>s.replace(/<[^>]+>/g,'').replace(/[’‘]/g,"'");
const numbers=s=>(s.match(/\d+(?:\.\d+)?/g)??[]).sort();const tags=s=>(s.match(/<[^>]+>/g)??[]).sort();
for(const id of ids){let raw=decodeSnapshot(read(`docs/combatant/current/api/czn/characters/${id}.html`,'utf8'),'2egkWEkLvR9idARLvjqfJdWKfR24HJgY').data,c=raw.combatant,cards=[],nodes=[];
const visit=c=>{cards.push(c);(c.r_spark_cards??[]).forEach(visit)};[...c.start_cards,...c.spark_cards,...c.collapse_passive.collapse_cards,...c.potential_target_cards,c.collapse_skill_card].forEach(visit);catalog.filter(c=>c.ownerId===id&&!cards.some(x=>x.id===c.id)).forEach(c=>cards.push({...c,desc_display:c.description}));const walk=n=>{nodes.push(n);n.upgrade_nodes.forEach(walk)};raw.potential_nodes.forEach(walk);
const tc=json(`data/wiki/translations/vi/${id}.cards.json`),tg=json(`data/wiki/translations/vi/${id}.glossary.json`),tp=json(`data/wiki/translations/vi/${id}.progression.json`);
const check=(key,src,dst)=>{compared++;if(!dst)failures.push({id,key,type:'missing'});else{if(JSON.stringify(numbers(src))!==JSON.stringify(numbers(dst)))failures.push({id,key,type:'numbers',src,dst});if(JSON.stringify(tags(src))!==JSON.stringify(tags(dst)))failures.push({id,key,type:'tags',src,dst});if(/\b(?:the|when|card|damage|gain|this|target|turn|increase|decrease|create|apply|gain|activate|draw|for|shield|each|chance|cost|amount|effect|all|random)\b/i.test(dst.replace(/<[^>]*>/g,'')))english.push({id,key,src,dst});for(const name of names){if(name!=="Cards"&&name.length>=4&&plain(src).includes(plain(name))&&!plain(dst).includes(plain(name)))nameFailures.push({id,key,name,src,dst});}}};
cards.forEach(c=>check(c.id,c.desc_display,tc[c.id]));for(const t of new Map(cards.flatMap(c=>[...(c.talent??[]),...(c.tooltips??[])]).map(t=>[t.id+'|'+t.desc,t])).values()){const g=tg.terms.find(g=>g.id===t.id && (!g.englishDesc || g.englishDesc===t.desc));check(t.id,t.desc,g?.desc);}c.combatant_limit_breaks.forEach(n=>check(n.id,n.desc,tp.manifestEgo[n.id]));nodes.forEach(n=>check(n.id,n.desc,tp.potentialNodes[n.id]));
}
write('docs/combatant/work/vi-b/audit.json',JSON.stringify({compared,failures,nameFailures,english},null,2));console.log(JSON.stringify({compared,failures:failures.length,nameFailures:nameFailures.length,english:english.length}));

