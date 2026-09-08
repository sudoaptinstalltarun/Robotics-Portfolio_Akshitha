import fitz
from pathlib import Path
pdf = Path('attached_assets/Profile_1788874551041.pdf')
out = Path('.agents/outputs/linkedin-pages')
out.mkdir(parents=True, exist_ok=True)
doc = fitz.open(pdf)
print('pages', doc.page_count)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=fitz.Matrix(2, 2), alpha=False)
    target = out / f'page-{i+1}.png'
    pix.save(target)
    print(target, page.rect)
