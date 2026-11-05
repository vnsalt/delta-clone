// Importa os posts do blog de roadtodigital.com.br para road/blog/<slug>.json, com as imagens em road/ext/.
// Uso: node road/importar-blog.mjs
import { writeFile, mkdir, access } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'https://www.roadtodigital.com.br';
const AQUI = dirname(fileURLToPath(import.meta.url));

const entidades = { amp: '&', lt: '<', gt: '>', quot: '"', '#39': "'", nbsp: ' ' };
const desescapar = (s) => s.replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (m, e) => {
  if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
  return entidades[e] ?? m;
});
const semTags = (s) => desescapar(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

// liga os links internos às páginas do nosso site
export function linkLocal(href) {
  if (!href.startsWith('/')) return href;
  const [p, h = ''] = href.split('#');
  const ancora = h ? '#' + h : '';
  if (p === '/' || p === '') return '/en' + ancora;
  if (p.startsWith('/blog')) return '/en' + p + ancora;
  if (p.startsWith('/cases')) return '/en' + p + ancora;
  if (p === '/contato') return '/en/contato';
  if (p === '/privacidade' || p === '/termos') return '/en' + p;
  const servico = { '/criacao-de-site': 'web-e-produto', '/identidade-visual': 'estrategia-de-marca', '/trafego-pago': 'performance-e-midia', '/software-sob-medida': 'web-e-produto', '/estruturacao-comercial': 'estruturacao-comercial' }[p];
  if (servico) return '/en/servicos#' + servico;
  if (p.startsWith('/marketing-')) return '/en/sobre#segmentos';
  return '/en' + p + ancora;
}

async function baixar(caminho) {
  const destino = join(AQUI, 'ext', caminho);
  try { await access(destino); return; } catch {}
  const r = await fetch(BASE + caminho);
  if (!r.ok) return;
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, Buffer.from(await r.arrayBuffer()));
}

function limpar(html, imagens) {
  return html
    .replace(/<details\b[^>]*><summary\b[^>]*>Neste artigo[\s\S]*?<\/details>/gi, '')
    .replace(/<(script|style|svg|button|aside|form|noscript)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<(details|summary)\b[^>]*>/gi, '<$1>')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(\/?)(div|span|section|figure|picture|header|footer|dl|dt|dd|nav)\b[^>]*>/gi, (m, f, t) => (/figure/i.test(t) ? `<${f}figure>` : ' '))
    .replace(/<img\b[^>]*>/gi, (m) => {
      const src = (m.match(/\ssrc="([^"]+)"/) || [])[1];
      const alt = (m.match(/\salt="([^"]*)"/) || [])[1] || '';
      if (!src || src.startsWith('/equipe/')) return '';
      imagens.add(src);
      return `<img src="/road/ext${src}" alt="${alt}" loading="lazy">`;
    })
    .replace(/<a\b[^>]*href="([^"]+)"[^>]*>/gi, (m, h) => {
      const d = linkLocal(desescapar(h));
      return d.startsWith('http') ? `<a href="${d}" target="_blank" rel="noopener">` : `<a href="${d}">`;
    })
    .replace(/<(h2|h3|h4)\b[^>]*?(\sid="[^"]+")?[^>]*>/gi, (m, t, id) => `<${t}${id || ''}>`)
    .replace(/<(p|ul|ol|li|table|thead|tbody|tr|th|td|blockquote|strong|em|b|i|cite|figcaption)\b[^>]*>/gi, '<$1>')
    .replace(/\s{2,}/g, ' ')
    .replace(/<(p|li|h2|h3)>\s*<\/\1>/g, '')
    .trim();
}

async function importarPost(slug) {
  const html = await (await fetch(`${BASE}/blog/${slug}`)).text();
  const art = html.slice(html.indexOf('<article'), html.indexOf('</article>'));
  const cab = art.slice(0, art.indexOf('</header>'));
  const titulo = semTags((cab.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '');
  const categoria = semTags(([...cab.matchAll(/href="\/blog\/categoria\/[^"]+"[^>]*>([\s\S]*?)<\/a>/g)].pop() || [])[1] || '');
  const data = semTags((cab.match(/<time[^>]*>([\s\S]*?)<\/time>/) || [])[1] || '');
  const iso = (cab.match(/dateTime="([^"]+)"/) || [])[1] || '';
  const autor = semTags((cab.match(/href="\/blog\/autor\/[^"]+"[^>]*>([\s\S]*?)<\/a>/) || [])[1] || '').replace(/Sócio-fundador|Diretor criativo/, (m) => ' · ' + m);
  const leitura = semTags((cab.match(/Tempo de leitura<\/dt><dd[^>]*>([\s\S]*?)<\/dd>/) || [])[1] || '');
  const descricao = desescapar((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
  const resto = art.slice(art.indexOf('</header>') + 9);
  const capa = (resto.match(/<img[^>]*\ssrc="([^"]+)"/) || [])[1] || '';
  // corpo: a partir do resumo, sem a capa
  const corpo = resto.slice(resto.indexOf('<section'));
  const imagens = new Set(capa ? [capa] : []);
  const conteudo = limpar(corpo, imagens);
  for (const i of imagens) await baixar(i);
  return { slug, titulo, categoria, data, iso, autor, leitura, descricao, capa: capa && '/road/ext' + capa, html: conteudo };
}

const indice = await (await fetch(`${BASE}/blog`)).text();
const slugs = [...new Set([...indice.matchAll(/href="\/blog\/([a-z0-9-]+)"/g)].map((m) => m[1]))];
await mkdir(join(AQUI, 'blog'), { recursive: true });
const lista = [];
for (const s of slugs) {
  const p = await importarPost(s);
  await writeFile(join(AQUI, 'blog', s + '.json'), JSON.stringify(p, null, 1));
  lista.push({ slug: p.slug, titulo: p.titulo, categoria: p.categoria, data: p.data, iso: p.iso, descricao: p.descricao, capa: p.capa, leitura: p.leitura });
  console.log('ok', s, p.html.length);
}
lista.sort((a, b) => (a.iso < b.iso ? 1 : -1));
await writeFile(join(AQUI, 'blog', 'indice.json'), JSON.stringify(lista, null, 1));
