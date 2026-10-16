"""Extract factual recommendations from saved, observed Prydwen DOM panels."""
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).parent

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def all(self, tag=None, cls=None, **attrs):
        found=[]
        for child in self.children:
            if isinstance(child, Node):
                if (tag is None or child.tag == tag) and (cls is None or cls in child.attrs.get('class','').split()) and all(child.attrs.get(k)==v for k,v in attrs.items()):
                    found.append(child)
                found.extend(child.all(tag,cls,**attrs))
        return found
    def first(self, tag=None, cls=None, **attrs):
        return next(iter(self.all(tag,cls,**attrs)), Node())
    def text(self):
        return re.sub(r'\s+', ' ', ''.join(c.text() if isinstance(c,Node) else c for c in self.children)).strip()

class Parser(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root=Node(); self.stack=[self.root]; self.feed(html)
    def handle_starttag(self, tag, attrs):
        n=Node(tag,attrs); self.stack[-1].children.append(n)
        if tag not in {'img','input','meta','link','hr','br','source','wbr','area','base','embed','param','track','col'}: self.stack.append(n)
        elif tag=='br': self.stack[-1].children.append(' ')
    def handle_endtag(self,tag):
        for i in range(len(self.stack)-1,0,-1):
            if self.stack[i].tag==tag:
                self.stack=self.stack[:i]; return
    def handle_data(self,s): self.stack[-1].children.append(s)

def texts(node,tag=None,cls=None): return [x.text() for x in node.all(tag,cls) if x.text()]

def extract(path):
    raw=json.loads(path.read_text(encoding='utf-8'))
    panels={x['id']:Parser(x['html']).root for x in raw['panels']}
    review,build,decks=panels['review'],panels['build'],panels['decks']
    item={'name':raw['title'].split(' Best Build')[0], 'url':raw['url'], 'sourceFile':path.name, 'capturedAt':raw['capturedAt'],
          'reviewSource':{'introduction':review.first(cls='review-short-kit').first(cls='review-source-body').text(), 'pros':texts(review.first(cls='pros'),'li'), 'cons':texts(review.first(cls='cons'),'li')},
          'partners':[], 'fragments':[], 'stats':[], 'equipment':[], 'decks':[], 'synergies':[]}
    for row in build.all(cls='build-rank-row'):
        partner=row.first(cls='czn-partner-cell')
        if partner.text():
            item['partners'].append({'name':partner.first(cls='inline-name').text(),'ego':partner.first(cls='czn-partner-dupes').text(),'performance':row.first(cls='czn-partner-value').text(),'notesSource':row.first(cls='cell-notes').first(cls='czn-rte').text()})
    for group in build.all(cls='czn-fragment-group'):
        for row in group.all(cls='build-rank-row'):
            sets=texts(row,cls='inline-name')
            if row.first(cls='flex-choice').text(): sets.append('Flex')
            item['fragments'].append({'group':group.first('h5').text(),'sets':sets,'notesSource':row.first(cls='cell-notes').first(cls='czn-rte').text()})
    for article in build.all('article'):
        if article.first(cls='czn-main-stats-grid').children:
            item['stats'].append({'label':article.first('h3').text(), 'priorities':{n.first(cls='czn-main-stat-label').text():n.first('p').text() for n in article.all(cls='czn-main-stat')}})
    for panel in build.all(role='tabpanel'):
        if panel.attrs.get('id','').startswith('equipment-group-panel'):
            button=build.first(id=panel.attrs['aria-labelledby'])
            item['equipment'].append({'label':button.text(),'slots':{col.first('h6').text():texts(col,cls='inline-name') for col in panel.all(cls='czn-equipment-column')}})
    for panel in decks.all(cls='czn-deck-tabs-panel'):
        cards=[]
        for card in panel.all(cls='preview-card-item'):
            name=card.first(cls='name').text()
            if not name: continue
            badge=card.first(cls='pw-card-count-badge-preview').text()
            count=int(re.search(r'\d+',badge).group()) if re.search(r'\d+',badge) else 1
            cards.append({'name':name,'count':count,'cost':card.first(cls='cost').text(),'type':card.first(cls='type').first('strong').text(),'tags':re.findall(r'\[([^\]]+)\]',card.first(cls='tags').text()),'classRestriction':card.first(cls='rules').text(),'divine':card.first(cls='divine').text(),'epiphanyEffect':card.first(cls='epi').text(),'description':card.first(cls='skill-with-coloring').text(),'image':card.first(cls='chaos-image').first('img').attrs.get('src','')})
        item['decks'].append({'name':decks.first(id=panel.attrs.get('aria-labelledby','')).text(), 'cards':cards,'partner':panel.first(cls='partner-preview').first('img').attrs.get('alt',''), 'equipment':texts(panel,cls='equipment-name'),'fragments':texts(panel.first(cls='fragments-preview-list'),cls='inline-name'),'code':panel.first('code').text(), 'notesSource':panel.first(cls='review-source-body').text()})
    # Single-deck pages omit the tab wrapper.
    if not item['decks']:
        for display in decks.all(cls='chaos-deck-display'):
            cards=[]
            for card in display.all(cls='preview-card-item'):
                badge=card.first(cls='pw-card-count-badge-preview').text()
                cards.append({'name':card.first(cls='name').text(),'count':int(re.search(r'\d+',badge).group()) if re.search(r'\d+',badge) else 1,'cost':card.first(cls='cost').text(),'type':card.first(cls='type').first('strong').text(),'tags':re.findall(r'\[([^\]]+)\]',card.first(cls='tags').text()),'classRestriction':card.first(cls='rules').text(),'divine':card.first(cls='divine').text(),'epiphanyEffect':card.first(cls='epi').text(),'description':card.first(cls='skill-with-coloring').text(),'image':card.first(cls='chaos-image').first('img').attrs.get('src','')})
            item['decks'].append({'name':'Recommended deck','cards':cards,'partner':display.first(cls='partner-preview').first('img').attrs.get('alt',''),'equipment':texts(display,cls='equipment-name'),'fragments':texts(display.first(cls='fragments-preview-list'),cls='inline-name'),'code':display.first('code').text(),'notesSource':next((a.first(cls='review-source-body').text() for a in decks.all('article') if a.first(cls='chaos-deck-display').children),'')})
    for synergy in decks.all(cls='synergy-card'):
        item['synergies'].append({'name':synergy.first(cls='emp-name').text(), 'notesSource':texts(synergy,'li')})
    item['images']=[{'alt':img.attrs.get('alt',''),'src':img.attrs.get('src','')} for panel in [build,decks] for img in panel.all('img') if img.attrs.get('alt')]
    item['teams']=[{'name':t.first(cls='czn-team-name').text(),'members':texts(t,cls='emp-name')} for t in decks.all(cls='czn-team-tile')]
    for d in item['decks']:
        match=re.search(r'Deck Code:\s*([A-Za-z0-9_-]+)',d['notesSource'])
        if match: d['code']=match.group(1)
    return item

if __name__=='__main__':
    result=[extract(p) for p in sorted(ROOT.glob('*.json')) if 'panels' in json.loads(p.read_text(encoding='utf-8'))]
    (ROOT/'extracted.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps([{'name':x['name'],'partners':len(x['partners']),'decks':len(x['decks']),'fragments':len(x['fragments']),'stats':len(x['stats'])} for x in result],indent=2))
