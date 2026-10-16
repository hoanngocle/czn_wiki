import fs from 'node:fs';
import { spans } from './skeleton.mjs';
const ids=['1028','1064','1069','30047','30048','30084','30093','30097','30113','30115','30117'];
const dir='data/wiki/translations/vi/';
const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const catalog=read('data/deck-builder/catalog.json').cards;
const cards=d=>{const m=new Map();const add=c=>{if(m.has(c.id))return;m.set(c.id,c);c.variants.forEach(add)};[...d.startCards,...d.sparkCards,...d.collapseCards,...d.potentialTargetCards,...(d.collapseSkillCard?[d.collapseSkillCard]:[]),...catalog.filter(c=>c.ownerId===d.id)].forEach(add);return [...m.values()]};
const norm=s=>s.replace(/\d+(?:\.\d+)?/g,'§');
const numbers=s=>s.match(/\d+(?:\.\d+)?/g)??[];
const tags=s=>(s.match(/<[^>]*>/g)??[]).sort().join('|');
const known=new Map();
function add(en,vi){if(!en||!vi||tags(en)!==tags(vi)||JSON.stringify(numbers(en))!==JSON.stringify(numbers(vi)))return;known.set(norm(en),norm(vi));const a=en.split('<br>'),b=vi.split('<br>');if(a.length===b.length&&a.length>1)a.forEach((s,i)=>add(s,b[i]));}
for(const [id,slug] of [['1041','renoa'],['1052','narja'],['1033','veronica'],['30075','sereniel']]){const d=read(`data/wiki/characters/${id}.json`), c=read(`${dir}${slug}.cards.json`), g=read(`${dir}${slug}.glossary.json`),p=read(`${dir}${slug}.progression.json`);for(const card of cards(d)){add(card.description,c[card.id]);for(const term of [...card.talent,...card.tooltips]){const t=g.terms.find(t=>t.id===term.id);if(t){add(term.title,t.title);add(term.desc,t.desc)}}}for(const e of d.manifestEgo)add(e.desc,p.manifestEgo[e.id]);for(const n of d.potentialNodes.flatMap(n=>[n,...n.upgrade_nodes]))add(n.desc,p.potentialNodes[n.id]);}
const manual=fs.existsSync('docs/combatant/work/vi-c/manual.json')?read('docs/combatant/work/vi-c/manual.json'):{};
for(const [en,vi] of Object.entries(manual))known.set(en,vi);
const missing=new Map();
const skeletons=read('docs/combatant/work/vi-c/skeletons.json');
const skel=new Map(fs.readFileSync('docs/combatant/work/vi-c/skel-translations.txt','utf8').trim().split('\n').map(line=>{const at=line.indexOf('|');return [skeletons[Number(line.slice(0,at))],line.slice(at+1).trim()]}));
const atoms={...read(`${dir}terminology.json`),...(fs.existsSync('docs/combatant/work/vi-c/atoms.json')?read('docs/combatant/work/vi-c/atoms.json'):{})};
for(const [en,vi] of skel)if(!en.includes('@')&&!en.includes('§'))atoms[en]=vi;
const names=new Set(catalog.filter(c=>ids.includes(c.ownerId)).map(c=>c.name));
const missingAtoms=new Set();
function translateSpan(s){return s.split(/(<[^>]*>)/).map(part=>{if(!part||part.startsWith('<'))return part;const trim=part.trim();if(atoms[trim])return part.replace(trim,atoms[trim]);if(known.has(norm(trim))){let n=0;return known.get(norm(trim)).replace(/§/g,()=>numbers(trim)[n++]);}if(names.has(trim)||!/[A-Za-z]/.test(trim)||/^X(?:\+\d+)?$/.test(trim))return part;const match=trim.match(/^(\d+(?:\.\d+)? )(.+)$/);if(match&&atoms[match[2]])return part.replace(trim,match[1]+atoms[match[2]]);missingAtoms.add(trim);return part;}).join('');}
function translate(s,context){let t=known.get(norm(s));if(t!==undefined){let n=0,nums=numbers(s);return t.replace(/§/g,()=>nums[n++]);}if(s.includes('<br>'))return s.split('<br>').map(x=>translate(x,context)).join('<br>');const parsed=spans(s),normalized=spans(norm(s)).skeleton;const template=skel.get(normalized);if(template!==undefined){let n=0;const nums=numbers(parsed.skeleton);return template.replace(/§/g,()=>nums[n++]).replace(/@([A-Z])/g,(_,letter)=>translateSpan(parsed.parts[letter.charCodeAt(0)-65].raw));}if(!missing.has(norm(s)))missing.set(norm(s),[]);missing.get(norm(s)).push(context);return s;}
const conflicts=[];let failures=[];
function checked(s,context){const vi=translate(s,context);if(tags(s)!==tags(vi)||JSON.stringify(numbers(s).sort())!==JSON.stringify(numbers(vi).sort()))failures.push({context,en:s,vi});return vi;}
for(const id of ids){const d=read(`data/wiki/characters/${id}.json`), c={},terms=new Map(),p={manifestEgo:{},potentialNodes:{}};for(const card of cards(d)){c[card.id]=checked(card.description,`${id}/${card.id}`);for(const t of [...card.talent,...card.tooltips]){const key=t.id+'|'+t.desc;if(!terms.has(key))terms.set(key,{id:t.id,title:checked(t.title,`${id}/term ${t.id} title`),englishTitle:t.title,englishDesc:t.desc,desc:checked(t.desc,`${id}/term ${t.id}`)});}}for(const e of d.manifestEgo)p.manifestEgo[e.id]=checked(e.desc,`${id}/ego`);for(const n of d.potentialNodes.flatMap(n=>[n,...n.upgrade_nodes]))p.potentialNodes[n.id]=checked(n.desc,`${id}/potential`);const byId=new Map();for(const t of terms.values()){if(byId.has(t.id))conflicts.push(`${id}/${t.id}`);byId.set(t.id,t)}if(process.argv.includes('--write')){for(const [suffix,value] of [['cards',c],['glossary',{characterId:id,terms:[...terms.values()]}],['progression',p]])fs.writeFileSync(`${dir}${id}.${suffix}.json`,JSON.stringify(value,null,2)+'\n');}}
fs.writeFileSync('docs/combatant/work/vi-c/missing.json',JSON.stringify([...missing].map(([source,contexts])=>({source,context:contexts[0]})),null,2));
console.log('Missing templates:',missing.size);
console.log([...missing].map(([s,c],i)=>`${i}: ${s} (${c[0]})`).join('\n'));
console.log('ATOMS',JSON.stringify([...missingAtoms]));
console.log('CONFLICTS',conflicts);console.log('VALIDATION',JSON.stringify(failures));
