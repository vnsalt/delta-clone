// Servidor local do site novo da Road to Digital, montado sobre o espelho da Delta.
// Serve site/ como está e aplica, na hora de servir, a camada road/:
//   road/textos.json   pares [original, novo] trocados nos payloads do Nuxt e no HTML
//   road/imagens.json  {trecho-do-nome-da-imagem-sanity: "/road/cases/arquivo.webp"}
//   road/cases.json    dados dos cases, usados nas páginas /en/cases e /en/cases/<slug>
//   road/injetar.html  trecho incluído no fim de toda página (logo, ajustes de estilo)
// Nada dentro de site/ é alterado. Uso: node servidor-road.mjs [porta]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { paginaCases, paginaCase, paginaServicos, paginaSobre, paginaBlog } from './road/paginas.mjs';

const RAIZ = path.resolve('site');
const ROAD = path.resolve('road');
const PORTA = Number(process.argv[2] || 4179);
const ORIGEM = 'https://deltacafes.com';
const EXTRAS = ['burospaces1.fra1.cdn.digitaloceanspaces.com', 'cdn.sanity.io'];
const TIPOS = { '.html': 'text/html', '.json': 'application/json', '.js': 'application/javascript', '.mjs': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.gif': 'image/gif', '.avif': 'image/avif', '.mp4': 'video/mp4', '.webm': 'video/webm', '.woff2': 'font/woff2', '.woff': 'font/woff', '.riv': 'application/octet-stream', '.wasm': 'application/wasm', '.webmanifest': 'application/manifest+json', '.mp3': 'audio/mpeg' };

const lerJson = (f, padrao) => { try { return JSON.parse(fs.readFileSync(path.join(ROAD, f), 'utf8')); } catch (e) { if (fs.existsSync(path.join(ROAD, f))) console.error('Erro em', f, e.message); return padrao; } };
const camada = () => ({
  textos: lerJson('textos.json', { globais: [] }).globais,
  posicoes: lerJson('textos.json', { posicoes: {} }).posicoes || {},
  imagens: lerJson('imagens.json', {}),
  cases: lerJson('cases.json', []),
  injetar: fs.existsSync(path.join(ROAD, 'injetar.html')) ? fs.readFileSync(path.join(ROAD, 'injetar.html'), 'utf8') : '',
});

const escHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Payload do Nuxt: array JSON. Troca strings que batem exatamente (ignorando espaços nas pontas)
// e, para pedaços curtos e ambíguos ("The", "coffee "), troca pela posição no array do arquivo.
function trocarPayload(texto, { textos, posicoes }, arquivo) {
  let dados;
  try { dados = JSON.parse(texto); } catch { return texto; }
  const fixos = arquivo && posicoes[arquivo];
  if (fixos && Array.isArray(dados)) for (const [i, novo] of Object.entries(fixos)) if (typeof dados[i] === 'string') dados[i] = novo;
  const mapa = new Map(textos.map(([a, b]) => [a.trim(), b]));
  const visitar = (v) => {
    if (typeof v === 'string') { const t = mapa.get(v.trim()); return t === undefined ? v : t; }
    if (Array.isArray(v)) return v.map(visitar);
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) v[k] = visitar(v[k]); return v; }
    return v;
  };
  return JSON.stringify(visitar(dados));
}

// O template dimensiona várias imagens pelo tamanho natural do arquivo. As da Sanity trazem
// esse tamanho no nome (…-349x269.jpg); a imagem da Road é recortada para o mesmo tamanho.
function versaoNoTamanho(original, novo) {
  const d = /-(\d{2,4})x(\d{2,4})[.-]/.exec(original);
  if (!d || !/\.(webp|jpe?g|png)$/.test(novo)) return novo;
  return `/road/r/${d[1]}x${d[2]}/${path.basename(novo)}`;
}

function trocarImagens(texto, { imagens }) {
  for (const [chave, novo] of Object.entries(imagens)) {
    // qualquer URL da Sanity (ou do CDN de vídeos) que contenha a chave vira o arquivo da Road
    const k = chave.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`[^"'\\s(),]*?${k}[^"'\\s(),]*`, 'g');
    texto = texto.replace(re, (orig) => versaoNoTamanho(orig, novo));
  }
  return texto;
}

const CACHE = path.join(ROAD, '.cache');
const gerando = new Map();
function redimensionar(w, h, nome) {
  const origem = path.join(ROAD, 'cases', nome);
  const destino = path.join(CACHE, `${w}x${h}-${nome.replace(/\.\w+$/, '.jpg')}`);
  if (fs.existsSync(destino)) return Promise.resolve(destino);
  if (!fs.existsSync(origem)) return Promise.resolve(null);
  if (!gerando.has(destino)) {
    fs.mkdirSync(CACHE, { recursive: true });
    // mesmo tamanho em pixels da original (o layout depende disso), sem passar de 2400 px
    const f = Math.min(1, 2400 / Math.max(w, h));
    const W = Math.round(w * f / 2) * 2, H = Math.round(h * f / 2) * 2;
    gerando.set(destino, new Promise((ok) => {
      execFile('ffmpeg', ['-v', 'error', '-y', '-i', origem, '-vf', `scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H}`, '-q:v', '3', destino], (erro) => ok(erro ? null : destino));
    }));
  }
  return gerando.get(destino);
}

function trocarHtml(texto, c) {
  // payload embutido
  texto = texto.replace(/(<script[^>]*id="__NUXT_DATA__"[^>]*>)([\s\S]*?)(<\/script>)/, (_, a, json, z) => a + trocarPayload(json, c).replace(/<\//g, '<\\/') + z);
  // texto já renderizado no HTML (primeira pintura, antes do Vue assumir)
  for (const [a, b] of c.textos) {
    if (a.length < 3) continue;
    const linhasA = a.trim().split('\n').map((l) => escHtml(l.trim()));
    const linhasB = b.trim().split('\n').map((l) => escHtml(l.trim()));
    texto = texto.split(linhasA.join('<br>')).join(linhasB.join('<br>'));
    if (linhasA.length === 1) texto = texto.split('>' + linhasA[0] + '<').join('>' + linhasB.join('<br>') + '<');
  }
  texto = texto.replace('<html lang="en"', '<html lang="pt-BR"');
  // cookies e analytics da Delta não vão para o site da Road
  texto = texto.replace(/<script[^>]*(cookiebot|hotjar|googletagmanager|gtag)[^>]*>[\s\S]*?<\/script>/gi, '');
  return texto.replace('</body>', c.injetar + '</body>');
}

function reescreverHosts(t) {
  for (const h of EXTRAS) {
    t = t.split('https://' + h).join('/__ext/' + h).split('https:\\/\\/' + h).join('\\/__ext\\/' + h).split('https:\\u002F\\u002F' + h).join('\\u002F__ext\\u002F' + h);
  }
  return t;
}

const baixando = new Map();
async function garantir(local, url) {
  if (fs.existsSync(local)) return true;
  if (!baixando.has(local)) {
    baixando.set(local, (async () => {
      try {
        const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        if (!r.ok) return false;
        fs.mkdirSync(path.dirname(local), { recursive: true });
        fs.writeFileSync(local + '.baixando', Buffer.from(await r.arrayBuffer()));
        fs.renameSync(local + '.baixando', local);
        return true;
      } catch { return false; }
    })());
  }
  return baixando.get(local);
}

function enviar(res, status, tipo, corpo) {
  res.writeHead(status, { 'Content-Type': tipo, 'Cache-Control': 'no-store' });
  res.end(corpo);
}

http.createServer(async (req, res) => {
  try {
    const u = new URL(req.url, 'http://x');
    let p = decodeURIComponent(u.pathname);
    const c = camada();

    if (p === '/') { res.writeHead(302, { Location: '/en' }); return res.end(); }

    // páginas novas da Road
    if (/^\/en\/cases\/?$/.test(p)) return enviar(res, 200, 'text/html; charset=utf-8', paginaCases(c));
    const m = p.match(/^\/en\/cases\/([a-z0-9-]+)\/?$/);
    if (m) { const caso = c.cases.find((x) => x.slug === m[1]); if (caso) return enviar(res, 200, 'text/html; charset=utf-8', paginaCase(c, caso)); }
    if (/^\/en\/servicos\/?$/.test(p)) return enviar(res, 200, 'text/html; charset=utf-8', paginaServicos(c));
    if (/^\/en\/sobre\/?$/.test(p)) return enviar(res, 200, 'text/html; charset=utf-8', paginaSobre(c));
    if (/^\/en\/blog\/?$/.test(p)) return enviar(res, 200, 'text/html; charset=utf-8', paginaBlog(c));

    // páginas da Delta que não fazem parte do site da Road: abrem a página equivalente
    const REDIRECIONA = { '/en/products': '/en/servicos', '/en/history': '/en/sobre', '/en/about': '/en/sobre#time', '/en/business-solutions': '/en/sobre#segmentos', '/en/sustainability': '/en/sobre', '/en/journal': '/en/blog', '/en/quiz': '/en/sobre#diagnostico', '/en/the-azores-coffee': '/en/cases', '/en/coffee-cycle': '/en/cases', '/en/barista-academy': '/en/cases', '/en/coffee-science-centre': '/en/cases', '/cafe-dos-acores': '/en/cases' };
    const semBarra = p.replace(/\/$/, '');
    const raizPagina = Object.keys(REDIRECIONA).find((r) => semBarra === r || (semBarra.startsWith(r + '/') && !p.endsWith('.json')));
    if (raizPagina && !p.endsWith('.json')) { res.writeHead(302, { Location: REDIRECIONA[raizPagina] }); return res.end(); }

    // imagem da Road recortada no tamanho da original
    const rd = p.match(/^\/road\/r\/(\d+)x(\d+)\/([\w.-]+)$/);
    if (rd) {
      const arq = await redimensionar(+rd[1], +rd[2], rd[3]);
      if (!arq) return enviar(res, 404, 'text/plain', 'não encontrado');
      res.writeHead(200, { 'Content-Type': 'image/jpeg', 'Cache-Control': 'max-age=3600' });
      return fs.createReadStream(arq).pipe(res);
    }

    // arquivos da camada Road
    if (p.startsWith('/road/')) {
      const local = path.join(ROAD, p.slice(6));
      if (!local.startsWith(ROAD) || !fs.existsSync(local)) return enviar(res, 404, 'text/plain', 'não encontrado');
      return enviar(res, 200, TIPOS[path.extname(local)] || 'application/octet-stream', fs.readFileSync(local));
    }

    // otimizador de imagem da Vercel: aponta para a imagem espelhada (ou para a da Road)
    if (p === '/_vercel/image') {
      const alvo = new URL(u.searchParams.get('url') || '', 'https://x');
      for (const [chave, novo] of Object.entries(c.imagens)) if (alvo.pathname.includes(chave)) { res.writeHead(302, { Location: versaoNoTamanho(alvo.pathname, novo) }); return res.end(); }
      if (EXTRAS.includes(alvo.host)) { res.writeHead(302, { Location: '/__ext/' + alvo.host + alvo.pathname }); return res.end(); }
    }
    if (p.startsWith('/__ext/')) {
      for (const [chave, novo] of Object.entries(c.imagens)) if (p.includes(chave)) { res.writeHead(302, { Location: versaoNoTamanho(p, novo) }); return res.end(); }
    }

    // imagens fixas do template (fora da Sanity) que também têm substituta
    if (c.imagens[p]) { res.writeHead(302, { Location: c.imagens[p] }); return res.end(); }

    let local = path.normalize(path.join(RAIZ, p));
    if (!local.startsWith(RAIZ)) return enviar(res, 403, 'text/plain', 'proibido');
    const ultimo = p.split('/').pop();
    if (p.endsWith('/') || !ultimo.includes('.')) local = path.join(local, 'index.html');
    if (!fs.existsSync(local)) {
      const url = p.startsWith('/__ext/') ? 'https://' + p.slice(7) : ORIGEM + req.url;
      if (!(await garantir(local, url))) return enviar(res, 404, 'text/plain', 'não encontrado');
    }
    const ext = path.extname(local);
    const tipo = TIPOS[ext] || 'application/octet-stream';
    if (['.html', '.json', '.js', '.mjs', '.css'].includes(ext)) {
      let t = reescreverHosts(fs.readFileSync(local, 'utf8'));
      if (ext === '.json' && path.basename(local) === '_payload.json') t = trocarPayload(t, c, path.relative(RAIZ, local).split(path.sep).join('/'));
      if (ext === '.json' && local.includes(path.sep + '_i18n' + path.sep)) t = trocarPayload(t, c);
      if (ext === '.html') t = trocarHtml(t, c);
      if (ext === '.html' || ext === '.json') t = trocarImagens(t, c);
      return enviar(res, 200, tipo + '; charset=utf-8', t);
    }
    const st = fs.statSync(local);
    const range = req.headers.range && /bytes=(\d*)-(\d*)/.exec(req.headers.range);
    if (range) {
      const ini = range[1] ? +range[1] : 0, fim = range[2] ? +range[2] : st.size - 1;
      res.writeHead(206, { 'Content-Type': tipo, 'Content-Range': `bytes ${ini}-${fim}/${st.size}`, 'Accept-Ranges': 'bytes', 'Content-Length': fim - ini + 1 });
      return fs.createReadStream(local, { start: ini, end: fim }).pipe(res);
    }
    res.writeHead(200, { 'Content-Type': tipo, 'Content-Length': st.size, 'Accept-Ranges': 'bytes' });
    fs.createReadStream(local).pipe(res);
  } catch (e) {
    console.error(req.url, e);
    enviar(res, 500, 'text/plain', 'erro');
  }
}).listen(PORTA, '127.0.0.1', () => console.log(`Road to Digital em http://localhost:${PORTA}/en`));
