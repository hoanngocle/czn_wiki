import fs from 'node:fs';
export function spans(s){let parts=[],depth=0,start=0;const re=/<[^>]*>/g;let m;while((m=re.exec(s))){if(m[0].startsWith('</')){depth--;if(depth===0)parts.push({start,end:re.lastIndex,raw:s.slice(start,re.lastIndex)});}else if(m[0]==='<br>'){}else{if(depth===0)start=m.index;depth++;}}let skeleton='',last=0;parts.forEach((p,i)=>{skeleton+=s.slice(last,p.start)+'@'+String.fromCharCode(65+i);last=p.end});skeleton+=s.slice(last);return {skeleton,parts};}
const rows=JSON.parse(fs.readFileSync('docs/combatant/work/vi-c/inventory.json'));
const unique=[...new Set(rows.map(r=>spans(r.source).skeleton))];
fs.writeFileSync('docs/combatant/work/vi-c/skeletons.json',JSON.stringify(unique));
