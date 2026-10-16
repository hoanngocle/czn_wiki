"""Retain source notes previously omitted from the compact guide extract."""
import json
from pathlib import Path
from extract import Parser, texts

ROOT = Path(__file__).parent
result = []
for path in sorted(ROOT.glob('*.json')):
    raw = json.loads(path.read_text(encoding='utf8'))
    if not isinstance(raw, dict) or 'panels' not in raw:
        continue
    panels = {p['id']: Parser(p['html']).root for p in raw['panels']}
    build = panels['build']
    out = {'name': raw['title'].split(' Best Build')[0], 'statsNotes': [], 'potential': '', 'equipmentNotes': [], 'seasonal': [], 'dupes': [], 'cards': []}
    for article in build.all('article'):
        title = article.first('h3').text()
        if article.first(cls='czn-main-stats-grid').children:
            out['statsNotes'].append({'name': title, 'text': '\n'.join(texts(article, cls='czn-rte'))})
        if 'Potential Priority' in title:
            out['potential'] = article.first(cls='build-table-body').text()
        for panel in article.all(role='tabpanel'):
            label = build.first(id=panel.attrs.get('aria-labelledby', '')).text()
            note = '\n'.join(texts(panel, cls='czn-rte'))
            if panel.attrs.get('id', '').startswith('seasonal-power-panel'):
                out['seasonal'].append({'name': label, 'text': note})
            elif panel.attrs.get('id', '').startswith('equipment-group-panel'):
                out['equipmentNotes'].append({'name': label, 'text': note})
        for row in article.all(cls='czn-dupe-row'):
            cells = row.all(cls='czn-dupe-cell')
            if cells:
                out['dupes'].append({'name': cells[0].text(), 'text': cells[-1].text()})
    for article in panels['cards'].all('article'):
        out['cards'].append({'name': article.first('h3').text(), 'variants': [{'name': c.first(cls='name').text(), 'rating': c.first(cls='rating').text().count('★')} for c in article.all(cls='single-card')], 'text': '\n'.join(texts(article, cls='czn-card-group-comment'))})
    result.append(out)
(ROOT/'supplement-source.json').write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf8')
print(json.dumps({'characters': len(result), 'cardGroups': sum(len(x['cards']) for x in result), 'seasonal': sum(len(x['seasonal']) for x in result)}))
