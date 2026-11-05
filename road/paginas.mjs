// Páginas próprias da Road (cases e serviços), no mesmo visual do template:
// fontes do site (delta-season, trade-gothic), fundo creme/café, botões em pílula.
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const img = (nome) => `/road/cases/${nome}.webp`;

const CATEGORIAS = ['Identidade Visual', 'Websites & Landing pages', 'Desenvolvimento de Produto'];

export const SERVICOS = [
  ['Estratégia de Marca', 'Posicionamento, arquitetura e narrativa decididos antes de qualquer pixel. É o mapa que faz todas as outras decisões ficarem óbvias.'],
  ['Performance e Mídia', 'Aquisição e crescimento com método, funil e métrica do início ao fim. Google, Meta e TikTok com parceria oficial, medidos até a venda.'],
  ['Conteúdo e Social', 'Presença digital consistente, editorial e com identidade própria. Pauta, roteiro e produção com a voz da marca.'],
  ['Web e Produto', 'Sites, plataformas e produtos pensados para converter e durar. Do protótipo navegável ao código em produção.'],
  ['Ilustração e Modelagem 3D', 'Do desenho à peça renderizada: ilustrações autorais e modelos 3D que dão volume e realismo à marca.'],
  ['Filmmaking e Audiovisual', 'Da direção à edição, vídeos e filmes que dão vida à marca e prendem a atenção do primeiro ao último frame.'],
  ['Estruturação Comercial', 'Processo de vendas, treinamento de secretária, precificação e CRM, com consultores que são donos de clínica.'],
];

function casca(titulo, descricao, corpo) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(titulo)}</title><meta name="description" content="${esc(descricao)}"><link rel="icon" href="/road/icon.svg">
<script>document.documentElement.classList.add('road-js');try{if(sessionStorage.getItem('road-trans')==='1')document.documentElement.classList.add('road-chegando')}catch(e){}</script>
<link rel="stylesheet" href="/road/movimento.css">
<style>
@font-face{font-family:Season;src:url(/fonts/delta-season-vf.woff2) format("woff2");font-weight:100 900}
@font-face{font-family:Gothic;src:url(/fonts/trade-gothic-condenced.woff2) format("woff2")}
@font-face{font-family:GothicB;src:url(/fonts/trade-gothic-bold-condenced.woff2) format("woff2")}
:root{--creme:#f6e9dc;--cafe:#2c1a12;--cafe2:#3a241a;--texto:#2c1a12;--suave:#7a6355;--linha:rgba(44,26,18,.15)}
*{box-sizing:border-box;margin:0}
html.road-chegando body{overflow:hidden}
body{font-family:Season,Georgia,serif;background:var(--creme);color:var(--texto);-webkit-font-smoothing:antialiased}
a{color:inherit;text-decoration:none}
.nav{position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:10;display:flex;align-items:center;gap:28px;padding:10px 26px;border-radius:999px;background:rgba(44,26,18,.82);backdrop-filter:blur(12px);color:#f6e9dc;font-family:GothicB,sans-serif;font-size:13px;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
.nav img{height:22px;filter:brightness(0) invert(.93)}
.nav a:hover{opacity:.7}
.wrap{max-width:1320px;margin:0 auto;padding:0 32px}
.topo{padding:150px 0 48px}
.olho{font-family:GothicB,sans-serif;text-transform:uppercase;letter-spacing:.08em;font-size:13px;color:var(--suave)}
h1{font-weight:300;font-size:clamp(44px,7vw,104px);line-height:.98;letter-spacing:-.02em;margin-top:14px}
.grande{font-family:GothicB,sans-serif;text-transform:uppercase;font-size:clamp(56px,9vw,150px);line-height:.9;font-weight:400}
.intro{max-width:620px;font-size:19px;line-height:1.45;margin-top:22px;color:var(--suave)}
.pilula{display:inline-flex;align-items:center;gap:6px;margin-top:28px}
.pilula span{background:var(--creme);border:1px solid var(--linha);padding:12px 22px;border-radius:999px;font-size:15px}
.pilula i{width:44px;height:44px;border-radius:50%;background:var(--cafe);color:var(--creme);display:grid;place-items:center;font-style:normal}
.escuro .pilula span{background:#f6e9dc;color:var(--cafe)}
.escuro .pilula i{background:#5a3a2b}
.filtros{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0 34px}
.filtros button{font:inherit;font-size:15px;border:1px solid var(--linha);background:transparent;padding:10px 18px;border-radius:999px;cursor:pointer;color:inherit}
.filtros button[aria-pressed=true]{background:var(--cafe);color:var(--creme);border-color:var(--cafe)}
.grade{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding-bottom:110px}
.card{position:relative;border-radius:14px;overflow:hidden;aspect-ratio:4/3;background:#ddd}
.card img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.card:hover img{transform:scale(1.04)}
.card .rot{position:absolute;inset:auto 0 0 0;padding:18px 20px;color:#fff;background:linear-gradient(transparent,rgba(0,0,0,.6))}
.card .rot small{font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:11px;opacity:.85}
.card .rot b{display:block;font-weight:400;font-size:24px;margin-top:2px}
.escuro{background:var(--cafe);color:var(--creme)}
.escuro .olho,.escuro .intro{color:#c9ad97}
.capa{width:100%;aspect-ratio:16/8;object-fit:cover;border-radius:16px;display:block}
.ficha{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid var(--linha);border-bottom:1px solid var(--linha);padding:24px 0;margin:40px 0}
.ficha div small{display:block;font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:var(--suave);margin-bottom:6px}
.galeria{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;padding-bottom:100px}
.galeria img{width:100%;border-radius:14px;display:block;aspect-ratio:4/3;object-fit:cover}
.galeria img:first-child{grid-column:1/-1;aspect-ratio:16/8}
.prox{padding:90px 0;text-align:center}
.servicos{border-top:1px solid var(--linha);margin-bottom:110px}
.servico{display:grid;grid-template-columns:80px 1fr 1.2fr;gap:24px;padding:34px 0;border-bottom:1px solid var(--linha);align-items:baseline}
.servico span{font-family:GothicB,sans-serif;color:var(--suave)}
.servico h2{font-weight:300;font-size:clamp(26px,3vw,40px)}
.servico p{font-size:17px;line-height:1.5;color:var(--suave)}
footer{padding:80px 0 40px}
footer .grande{font-size:clamp(40px,6vw,96px)}
footer p{max-width:520px;margin-top:20px;color:#c9ad97;line-height:1.5}
footer .colunas{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:64px}
footer .colunas small{display:block;font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:#c9ad97;margin-bottom:12px}
footer .colunas a{display:block;padding:4px 0;font-size:16px}footer .colunas a:hover{opacity:.7}
@media (max-width:900px){footer .colunas{grid-template-columns:1fr 1fr}}
footer .base{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:70px;padding-top:20px;border-top:1px solid rgba(246,233,220,.2);font-family:GothicB,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#c9ad97}
@media (max-width:900px){.grade{grid-template-columns:1fr 1fr}.servico{grid-template-columns:1fr}.ficha{grid-template-columns:1fr}}
@media (max-width:600px){.wrap{padding:0 16px}.grade,.galeria{grid-template-columns:1fr}.nav{gap:14px;padding:10px 16px;font-size:11px}.nav .esconde{display:none}}
</style></head><body data-road-pagina>
<nav class="nav"><a href="/en" class="esconde">Início</a><a href="/en/servicos">Serviços</a><a href="/en/cases">Cases</a><a href="/en" aria-label="Road to Digital"><img src="/road/logo.svg" alt="Road to Digital"></a><a href="/en/sobre" class="esconde">Sobre</a><a href="/en/blog" class="esconde">Blog</a><a href="/en/contato">Contato</a></nav>
${corpo}
<footer class="escuro"><div class="wrap">
<div class="grande">Vamos construir<br>algo que dura.</div>
<a class="pilula" href="/en/contato"><span>Iniciar um projeto</span><i>→</i></a>
<p>A RD360 é uma assessoria de marketing que une estratégia, design, tecnologia e comercial num sistema só, para marcas feitas para permanecer.</p>
<div class="colunas">
<div><small>O que fazemos</small>${SERVICOS.map(([t]) => `<a href="/en/servicos#${ancora(t)}">${esc(t)}</a>`).join('')}</div>
<div><small>Segmentos</small><a href="/en/sobre#segmentos">Marketing médico</a><a href="/en/sobre#segmentos">Marketing odontológico</a><a href="/en/sobre#segmentos">Marketing industrial</a><a href="/en/sobre#segmentos">Marketing para imobiliária</a></div>
<div><small>A RD360</small><a href="/en/cases">Cases</a><a href="/en/blog">Blog</a><a href="/en/sobre#time">O time</a><a href="/en/contato">Contato</a></div>
<div><small>Atendimento</small><a href="/en/contato">Fale com a gente</a><a href="/en/privacidade">Privacidade</a><a href="/en/termos">Termos de uso</a><a href="https://www.instagram.com/sejaroad/" target="_blank" rel="noopener">Instagram</a><a href="https://www.behance.net/sejaroad" target="_blank" rel="noopener">Behance</a></div>
</div>
<div class="base"><span>© 2026 RD360. Todos os direitos reservados.</span><span>Parceiro oficial Google · Meta · TikTok</span></div>
</div></footer>
<script src="/road/movimento.js"></script></body></html>`;
}

export function paginaCases({ cases }) {
  const cards = cases.map((c) => `<a class="card" href="/en/cases/${c.slug}" data-cat="${esc(c.categoria)}"><img src="${img(c.imagens[0])}" alt="${esc(c.nome)}" loading="lazy"><div class="rot"><small>${esc(c.categoria)} · ${c.ano}</small><b>${esc(c.nome)}</b></div></a>`).join('');
  const filtros = ['Todos', ...CATEGORIAS].map((f, i) => `<button type="button" aria-pressed="${i === 0}" data-f="${esc(f)}">${esc(f)}</button>`).join('');
  return casca('Cases | Road to Digital', 'Cases de identidade visual, sites e produto da Road to Digital.', `
<main class="wrap"><section class="topo"><div class="olho">R de Road · ${cases.length} projetos</div>
<h1>Trabalho no ar.</h1>
<p class="intro">Projetos que você pode abrir agora e navegar. Marcas, sites e produtos feitos pela mesma equipe, do primeiro rascunho ao relatório de resultado.</p></section>
<div class="filtros" role="group" aria-label="Filtrar por categoria">${filtros}</div>
<div class="grade">${cards}</div></main>
<script>
const botoes=document.querySelectorAll('.filtros button');
const filtrar=f=>{botoes.forEach(x=>x.setAttribute('aria-pressed',x.dataset.f===f));
  const vis=[];document.querySelectorAll('.card').forEach(c=>{const v=f==='Todos'||c.dataset.cat===f;c.style.display=v?'':'none';if(v)vis.push(c);});
  if(window.roadRefiltrar&&f!==atual)window.roadRefiltrar(vis);atual=f;};
let atual='Todos';
botoes.forEach(b=>b.onclick=()=>filtrar(b.dataset.f));
const atalho={identidade:'Identidade Visual',web:'Websites & Landing pages',produto:'Desenvolvimento de Produto'}[new URLSearchParams(location.search).get('c')];
if(atalho)filtrar(atalho);
</script>`);
}

const CAT_SLUG = { 'Identidade Visual': 'identidade', 'Websites & Landing pages': 'web', 'Desenvolvimento de Produto': 'produto' };
const SERVICO_LINK = { 'Identidade visual': 'estrategia-de-marca', 'Criação de site': 'web-e-produto', 'Software sob medida': 'web-e-produto' };

export function paginaCase({ cases }, c) {
  const i = cases.indexOf(c);
  const prox = cases[(i + 1) % cases.length];
  const fotos = c.imagens.slice(1);
  const galeria = fotos.map((n, k) => {
    const larga = k === 0 || (fotos.length % 2 === 0 && k === fotos.length - 1);
    return `<img class="${larga ? 'larga' : ''}" src="${img(n)}" alt="${esc(c.nome)}: ${esc(n.replace(c.slug + '-', '').replace(/-/g, ' '))}" loading="lazy">`;
  }).join('');
  const numeros = (c.numeros || [[c.ano, 'Ano'], ['RD360', 'Estúdio'], ['360°', 'Entrega']])
    .map(([n, t]) => `<div><b>${esc(n)}</b><small>${esc(t)}</small></div>`).join('');
  const entregas = (c.entregas || []).map((e, k) => `<li><span>${String(k + 1).padStart(2, '0')}</span>${esc(e)}</li>`).join('');
  const site = c.site ? `<a class="no-ar" href="${esc(c.site)}" target="_blank" rel="noopener"><img src="${img(c.imagens[0])}" alt=""><span><small>Projeto no ar</small><b>${esc(c.site.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</b><em>Clique para visualizar ↗</em></span></a>` : '';
  const redes = c.redes ? `<section class="redes"><div class="olho">Redes sociais</div><h2 class="t">A mesma identidade,<br>do site ao feed.</h2>
<p class="intro">O projeto não parou no site: desenhamos também o design system das redes sociais, com templates de posts que carregam a mesma tipografia, paleta e tom do restante da marca.</p>
<div class="feed">${c.redes.map((n) => `<img src="${img(n)}" alt="${esc(c.nome)}: post para redes sociais" loading="lazy">`).join('')}</div></section>` : '';
  const blog = c.blog ? `<a class="pilula" href="/en/blog/${c.blog}"><span>Leia o case completo no blog</span><i>→</i></a>` : '';
  const servico = SERVICO_LINK[c.servico] ? `<a href="/en/servicos#${SERVICO_LINK[c.servico]}">${esc(c.servico)}</a>` : esc(c.servico || '');
  return casca(`${c.nome} | Cases Road to Digital`, c.descricao, `
<style>
.nums-case{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--linha);border-bottom:1px solid var(--linha);margin:40px 0 0}
.nums-case div{padding:26px 0}.nums-case div+div{border-left:1px solid var(--linha);padding-left:28px}
.nums-case b{display:block;font-family:GothicB,sans-serif;font-weight:400;font-size:clamp(40px,4.5vw,64px);line-height:1}
.nums-case small{font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:var(--suave)}
.tags{display:flex;gap:8px;flex-wrap:wrap;margin-top:26px}.tags span{border:1px solid var(--linha);border-radius:999px;padding:7px 14px;font-family:GothicB,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase}
.universo{padding:110px 0 70px;text-align:center}.universo .grande{max-width:15ch;margin:16px auto 0;font-size:clamp(44px,7vw,112px)}
.projeto{display:grid;grid-template-columns:1fr 1.3fr;gap:60px;padding:0 0 90px}
.projeto p{font-size:clamp(19px,1.7vw,24px);line-height:1.45}
.projeto ol{list-style:none;padding:0;margin-top:30px;border-top:1px solid var(--linha)}
.projeto li{display:flex;gap:18px;padding:14px 0;border-bottom:1px solid var(--linha);font-size:18px}.projeto li span{font-family:GothicB,sans-serif;color:var(--suave)}
.servico-link{margin-top:26px;color:var(--suave)}.servico-link a{color:var(--texto);border-bottom:1px solid currentColor}
.galeria img.larga{grid-column:1/-1;aspect-ratio:16/8}.galeria img:first-child{grid-column:auto;aspect-ratio:4/3}.galeria img.larga:first-child{grid-column:1/-1;aspect-ratio:16/8}
.no-ar{display:grid;grid-template-columns:1.2fr 1fr;align-items:center;gap:40px;background:var(--cafe);color:var(--creme);border-radius:18px;overflow:hidden;margin-bottom:100px}
.no-ar img{width:100%;height:100%;aspect-ratio:16/10;object-fit:cover;display:block;transition:transform .6s cubic-bezier(.2,.7,.2,1)}.no-ar:hover img{transform:scale(1.03)}
.no-ar span{padding:36px}.no-ar small{display:block;font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:#c9ad97}
.no-ar b{display:block;font-weight:300;font-size:clamp(26px,3vw,44px);margin:10px 0 18px;word-break:break-word}.no-ar em{font-style:normal;font-family:GothicB,sans-serif;letter-spacing:.06em;text-transform:uppercase;font-size:13px}
.redes{padding:0 0 100px}.redes h2.t{font-weight:300;font-size:clamp(36px,4.5vw,64px);margin:12px 0 0}
.feed{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}.feed img{width:100%;aspect-ratio:4/5;object-fit:cover;border-radius:14px;display:block}
.prox{text-align:left}.prox-grade{display:grid;grid-template-columns:1fr 1.15fr;gap:60px;align-items:center}
.prox .grande{font-size:clamp(56px,8vw,128px)}.prox .intro{margin-top:14px}
.prox-preview{position:relative;display:block;border-radius:18px;overflow:hidden;aspect-ratio:16/10;background:#3a241a}
.prox-preview img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .9s var(--entra,ease-out)}
.prox-preview:hover img{transform:scale(1.04)}
.prox-tags{position:absolute;left:18px;bottom:18px;display:flex;gap:6px;flex-wrap:wrap}
.prox-tags span{background:rgba(246,233,220,.92);color:var(--cafe);border-radius:999px;padding:6px 12px;font-family:GothicB,sans-serif;font-size:11px;letter-spacing:.08em;text-transform:uppercase}
@media (max-width:900px){.projeto,.no-ar,.prox-grade{grid-template-columns:1fr;gap:28px}.feed{grid-template-columns:1fr 1fr}}
@media (max-width:600px){.nums-case{grid-template-columns:1fr}.nums-case div+div{border-left:0;border-top:1px solid var(--linha);padding-left:0}.feed{grid-template-columns:1fr}}
</style>
<main class="wrap"><section class="topo"><a class="olho" href="/en/cases">← Todos os cases</a>
<div class="olho" style="margin-top:22px"><a href="/en/cases?c=${CAT_SLUG[c.categoria] || ''}">${esc(c.categoria)}</a> · ${c.ano}</div>
<h1>${esc(c.nome)}</h1>
<p class="intro">${esc(c.descricao)}</p>
<div class="tags">${c.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div></section>
<img class="capa" src="${img(c.imagens[0])}" alt="${esc(c.nome)}">
<div class="nums-case">${numeros}</div>
<section class="universo"><div class="olho">O universo visual</div><div class="grande">${esc(c.chamada)}</div></section>
<section class="projeto"><div><div class="olho">O projeto</div>${entregas ? `<ol>${entregas}</ol>` : ''}</div>
<div><p>${esc(c.projeto || c.descricao)}</p><p class="servico-link" style="font-size:16px">Serviço deste projeto: ${servico}</p>${blog}</div></section>
${galeria ? `<div class="galeria">${galeria}</div>` : ''}
${site}
${redes}
</main>
<section class="escuro prox"><div class="wrap prox-grade">
<div class="prox-texto"><div class="olho">Próximo case · ${esc(prox.categoria)} · ${prox.ano}</div>
<a href="/en/cases/${prox.slug}"><div class="grande" style="margin-top:12px">${esc(prox.nome)}</div></a>
<p class="intro">${esc(prox.chamada)}</p>
<a class="pilula" href="/en/cases/${prox.slug}"><span>Ver case</span><i>→</i></a></div>
<a class="prox-preview" href="/en/cases/${prox.slug}" aria-label="Ver o case ${esc(prox.nome)}">
<img src="${img(prox.imagens[0])}" alt="${esc(prox.nome)}" loading="lazy">
<span class="prox-tags">${prox.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</span></a>
</div></section>`);
}

const ancora = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const FAQ = [
  ['O que a Road to Digital faz?', 'A Road to Digital é uma assessoria de marketing que constrói a infraestrutura digital de empresas: estratégia de marca, identidade visual, sites, conteúdo, 3D, filmmaking e tráfego pago, além de softwares sob medida com inteligência artificial, implementação de CRM e estruturação comercial. Tudo pensado e executado pela mesma equipe, como um sistema só.'],
  ['A Road to Digital é uma agência de marketing digital?', 'A Road trabalha como assessoria de marketing: um time sênior que cuida de marca, site, tráfego pago, software e comercial junto com a sua empresa, medindo cada ação até a receita.'],
  ['Road to Digital e RD360 são a mesma empresa?', 'Sim. RD360 é a empresa e Road to Digital é a marca com que ela se apresenta. É o mesmo time, desde 2019, com mais de 480 projetos entregues.'],
  ['Vocês atendem que tipo de empresa?', 'A gente cresceu na saúde, atendendo clínicas médicas e odontológicas, franquias e hospitais. Hoje também temos um foco forte na indústria, além de tecnologia, varejo e serviços. O ponto em comum são empresas que querem decidir com dado na mão.'],
  ['Vocês atendem empresas de qualquer cidade?', 'Sim. Trabalhamos com empresas de todo o Brasil, com o mesmo padrão de entrega e acompanhamento em qualquer lugar.'],
  ['Vocês fazem gestão de tráfego pago?', 'Fazemos. Somos parceiros oficiais do Google, da Meta e do TikTok, e as estratégias de tráfego e mídia que operamos já geraram mais de R$200 milhões em receita para clientes.'],
  ['Qual a vantagem de contratar marca, site e tráfego com a mesma equipe?', 'A mensagem do anúncio é a mesma da página e da marca, e ninguém culpa o fornecedor do lado. Quando quem cria a marca também constrói o site e opera a mídia, cada ajuste é feito com o sistema inteiro em vista.'],
  ['Vocês escrevem o conteúdo ou eu envio?', 'A gente cuida da estratégia e da escrita. Você participa da validação em cada etapa, sem precisar produzir nada do zero.'],
  ['Consigo ver o design antes de ir pro ar?', 'Sempre. Nada é publicado sem a sua aprovação. Cada entrega passa por rodadas de revisão claras.'],
  ['O que acontece depois do lançamento?', 'A gente acompanha os números, ajusta o que for preciso e reporta na frequência combinada no início.'],
  ['E se eu não gostar do resultado?', 'Ajustamos dentro das rodadas combinadas antes de começar, até a entrega ficar aprovada.'],
];

export function paginaSobre() {
  const numeros = [['R$200M+', 'gerados em receita para clientes'], ['480+', 'projetos entregues desde 2019'], ['92%', 'de retenção de clientes'], ['87%', 'dos projetos chegam por indicação'], ['4,9/5', 'nota média dos clientes'], ['250+', 'marcas atendidas']]
    .map(([n, t]) => `<div class="num"><b>${esc(n)}</b><span>${esc(t)}</span></div>`).join('');
  const segmentos = [['Marketing médico', 'Clínicas, hospitais e franquias de saúde, com comunicação dentro das regras do CFM.'], ['Marketing odontológico', 'Consultórios e redes odontológicas, da landing page por procedimento ao agendamento.'], ['Marketing industrial', 'Indústrias que vendem para quem compra por especificação técnica.'], ['Marketing para imobiliária', 'Lançamentos e imobiliárias que precisam de lead qualificado, não só de clique.']]
    .map(([t, d], i) => `<div class="servico"><span>0${i + 1}</span><h2>${esc(t)}</h2><p>${esc(d)}</p></div>`).join('');
  const faq = FAQ.map(([p, r]) => `<details><summary>${esc(p)}</summary><p>${esc(r)}</p></details>`).join('');
  return casca('Sobre | Road to Digital', 'Duas cabeças, uma equipe só. Conheça o time, os segmentos e as respostas antes de começar.', `
<style>
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--linha);border:1px solid var(--linha);border-radius:16px;overflow:hidden;margin:10px 0 100px}
.num{background:var(--creme);padding:34px 28px}.num b{display:block;font-family:GothicB,sans-serif;font-weight:400;font-size:clamp(44px,5vw,72px);line-height:1}.num span{color:var(--suave);font-size:16px}
.citas{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:90px 0}
.citas blockquote{font-size:clamp(24px,2.6vw,36px);font-weight:300;line-height:1.2}.citas cite{display:block;margin-top:18px;font-style:normal;font-family:GothicB,sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#c9ad97}
details{border-bottom:1px solid var(--linha);padding:24px 0}details:first-child{border-top:1px solid var(--linha)}
summary{cursor:pointer;font-size:clamp(20px,2vw,26px);list-style:none;display:flex;justify-content:space-between;gap:20px}summary::after{content:"+";font-family:GothicB,sans-serif}details[open] summary::after{content:"–"}
details p{margin-top:14px;max-width:760px;font-size:17px;line-height:1.55;color:var(--suave)}
.bloco{padding:100px 0 0}.bloco h2.t{font-weight:300;font-size:clamp(36px,4.5vw,64px);margin:12px 0 36px}
@media (max-width:900px){.nums{grid-template-columns:1fr 1fr}.citas{grid-template-columns:1fr}}
</style>
<main><div class="wrap"><section class="topo" id="time"><div class="olho">O time</div>
<h1>Duas cabeças,<br>uma equipe só.</h1>
<p class="intro">Um time sênior que desenha a marca, constrói o site, opera a mídia e organiza o comercial. As mesmas pessoas do primeiro rascunho ao relatório de resultado, desde 2019.</p></section>
<div class="nums">${numeros}</div></div>
<section class="escuro"><div class="wrap citas">
<blockquote>“Estratégia é garantir que cada decisão de marca apareça no resultado do cliente.”<cite>Daniel Ridieri · Sócio-fundador</cite></blockquote>
<blockquote>“A gente trata cada projeto como se fosse o nosso.”<cite>João Pedro Carvalho · Diretor criativo</cite></blockquote>
</div></section>
<div class="wrap">
<section class="bloco" id="segmentos"><div class="olho">Segmentos</div><h2 class="t">Crescemos na saúde.<br>Hoje vamos além.</h2><div class="servicos">${segmentos}</div></section>
<section class="bloco" id="faq" style="padding-bottom:40px"><div class="olho">FAQ</div><h2 class="t">Antes de começar.</h2>${faq}</section>
<section class="bloco" id="diagnostico" style="padding-bottom:110px"><div class="olho">Diagnóstico</div><h2 class="t">Não sabe por onde começar?</h2>
<p class="intro">O primeiro passo é um diagnóstico do que você já tem: marca, site, mídia e comercial. A gente olha o sistema inteiro e diz por onde crescer.</p>
<a class="pilula" href="/en/contato"><span>Falar com a gente</span><i>→</i></a></section>
</div></main>`);
}

const catSlug = (t) => ancora(t || '');

const cardPost = (p) => `<a class="post-card" href="/en/blog/${p.slug}" data-cat="${catSlug(p.categoria)}"><img src="${esc(p.capa)}" alt="" loading="lazy"><small>${esc(p.categoria)} · ${esc(p.data)}</small><b>${esc(p.titulo)}</b><span>${esc(p.descricao)}</span></a>`;
const CSS_POSTS = `.posts{display:grid;grid-template-columns:repeat(3,1fr);gap:40px 24px;padding-bottom:110px}
.post-card img{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:14px;display:block;margin-bottom:16px;transition:opacity .3s}.post-card:hover img{opacity:.85}
.post-card small{font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:var(--suave)}
.post-card b{display:block;font-weight:400;font-size:23px;line-height:1.2;margin:8px 0 10px}.post-card span{display:block;color:var(--suave);font-size:16px;line-height:1.45}
@media (max-width:900px){.posts{grid-template-columns:1fr 1fr}}@media (max-width:600px){.posts{grid-template-columns:1fr}}`;

export function paginaBlog(_c, posts, filtro) {
  const cats = [...new Set(posts.map((p) => p.categoria))];
  const filtros = [['Todos', ''], ...cats.map((t) => [t, catSlug(t)])].map(([t, s]) => `<button type="button" aria-pressed="${(filtro || '') === s}" data-f="${s}">${esc(t)}</button>`).join('');
  return casca('Blog | Road to Digital', 'Guias práticos sobre marketing para saúde e indústria, e o que aprendemos construindo marcas.', `
<style>${CSS_POSTS}</style>
<main class="wrap"><section class="topo"><div class="olho">Blog · ${posts.length} artigos</div><h1>Conteúdo e<br>atualizações.</h1>
<p class="intro">Guias práticos sobre marketing para saúde e indústria, e o que aprendemos construindo marcas.</p></section>
<div class="filtros" role="group" aria-label="Filtrar por categoria">${filtros}</div>
<div class="posts">${posts.map(cardPost).join('')}</div></main>
<script>
const bs=document.querySelectorAll('.filtros button');
let atual=null;
const f=s=>{bs.forEach(b=>b.setAttribute('aria-pressed',b.dataset.f===s));const vis=[];document.querySelectorAll('.post-card').forEach(c=>{const v=!s||c.dataset.cat===s;c.style.display=v?'':'none';if(v)vis.push(c);});history.replaceState(null,'',s?'?c='+s:location.pathname);
  if(atual!==null&&atual!==s&&window.roadRefiltrar)window.roadRefiltrar(vis);atual=s;};
bs.forEach(b=>b.onclick=()=>f(b.dataset.f));f(${JSON.stringify(filtro || '')});
</script>`);
}

export function paginaPost(_c, p, posts) {
  const outros = posts.filter((x) => x.slug !== p.slug).sort((a, b) => (b.categoria === p.categoria) - (a.categoria === p.categoria)).slice(0, 3);
  return casca(`${p.titulo} | Blog Road to Digital`, p.descricao, `
<style>${CSS_POSTS}
.artigo{max-width:760px;margin:0 auto;padding-bottom:90px;font-size:18px;line-height:1.75}
.artigo h2{font-weight:300;font-size:clamp(28px,3vw,40px);line-height:1.15;margin:56px 0 18px}
.artigo h3{font-weight:400;font-size:22px;margin:30px 0 10px}
.artigo p{margin:0 0 18px}.artigo ul,.artigo ol{padding-left:22px;margin:0 0 22px}.artigo li{margin:6px 0}
.artigo a{border-bottom:1px solid currentColor}.artigo img{width:100%;border-radius:14px;display:block;margin:30px 0 10px}
.artigo figure{margin:30px 0}.artigo figure a{border:0;display:block}.artigo figcaption{font-size:15px;color:var(--suave)}
.artigo blockquote{border-left:3px solid var(--cafe);padding:4px 0 4px 22px;margin:26px 0;font-size:22px;line-height:1.45}
.artigo table{width:100%;border-collapse:collapse;margin:24px 0;font-size:16px}.artigo th,.artigo td{border-bottom:1px solid var(--linha);padding:10px 8px;text-align:left;vertical-align:top}
.artigo details{border-bottom:1px solid var(--linha);padding:18px 0}.artigo summary{cursor:pointer}.artigo summary h3{display:inline;margin:0;font-size:20px}
.artigo #resumo+p{font-size:21px;line-height:1.55}
.meta{display:flex;gap:18px;flex-wrap:wrap;margin-top:24px;color:var(--suave);font-size:15px}
.capa-post{width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:16px;display:block;margin-bottom:60px}
</style>
<main class="wrap"><section class="topo" style="max-width:1000px"><a class="olho" href="/en/blog">← Blog</a>
<div class="olho" style="margin-top:22px"><a href="/en/blog?c=${catSlug(p.categoria)}">${esc(p.categoria)}</a></div>
<h1 style="font-size:clamp(36px,5vw,68px);line-height:1.04">${esc(p.titulo)}</h1>
<div class="meta"><span>${esc(p.autor)}</span><span>${esc(p.data)}</span><span>${esc(p.leitura)}</span></div></section>
${p.capa ? `<img class="capa-post" src="${esc(p.capa)}" alt="">` : ''}
<article class="artigo">${p.html}</article>
<section style="border-top:1px solid var(--linha);padding-top:50px"><div class="olho">Continue lendo</div><div class="posts" style="margin-top:26px">${outros.map(cardPost).join('')}</div></section></main>`);
}

const SERVICOS_CONTATO = ['Site', 'Software e IA', 'Identidade Visual', 'Modelagem 3D', 'Ilustração', 'Edição de Vídeo', 'Tráfego Pago', 'Social Media'];

export function paginaContato() {
  return casca('Contato | Road to Digital', 'Conta pra gente o que você precisa. Marca, produto, conteúdo ou tudo junto.', `
<style>
.contato{display:grid;grid-template-columns:1fr 1.1fr;gap:70px;padding-bottom:110px}
form label{display:block;font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:var(--suave);margin:0 0 8px}
form input,form textarea{width:100%;font:inherit;font-size:17px;padding:14px 16px;border:1px solid var(--linha);border-radius:12px;background:#fbf4ec;color:var(--texto);margin-bottom:22px}
form input:focus,form textarea:focus{outline:2px solid var(--cafe);outline-offset:1px}
form textarea{min-height:140px;resize:vertical}
.chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:24px}
.chips input{position:absolute;opacity:0;width:1px;height:1px}
.chips span{display:inline-block;border:1px solid var(--linha);border-radius:999px;padding:9px 16px;font-size:15px;cursor:pointer;transition:background .2s,color .2s}
.chips input:checked+span{background:var(--cafe);color:var(--creme);border-color:var(--cafe)}.chips input:focus-visible+span{outline:2px solid var(--cafe)}
form button{font:inherit;border:0;background:none;padding:0;cursor:pointer;color:inherit}
.aviso{font-size:14px;color:var(--suave);margin-top:14px}.aviso a{border-bottom:1px solid currentColor}
.canais div{border-top:1px solid var(--linha);padding:22px 0}.canais small{display:block;font-family:GothicB,sans-serif;letter-spacing:.08em;text-transform:uppercase;font-size:12px;color:var(--suave);margin-bottom:6px}
.canais a{font-size:22px}
@media (max-width:900px){.contato{grid-template-columns:1fr;gap:30px}}
</style>
<main class="wrap"><section class="topo"><div class="olho">Contato</div><h1>Vamos construir<br>algo que permanece.</h1>
<p class="intro">Conta pra gente o que você precisa. Marca, produto, conteúdo ou tudo junto: a mesma equipe cuida do começo ao fim. Respondemos rápido.</p></section>
<div class="contato">
<div class="canais">
<div><small>E-mail</small><a href="mailto:contato@rd360.co">contato@rd360.co</a></div>
<div><small>Instagram</small><a href="https://www.instagram.com/sejaroad/" target="_blank" rel="noopener">@sejaroad</a></div>
<div><small>Portfólio</small><a href="https://www.behance.net/sejaroad" target="_blank" rel="noopener">behance.net/sejaroad</a></div>
<div><small>Antes de escrever</small><a href="/en/sobre#faq">Veja as perguntas frequentes →</a></div>
</div>
<form id="form-contato">
<label for="nome">Nome completo</label><input id="nome" name="nome" required autocomplete="name">
<label for="email">E-mail (opcional)</label><input id="email" name="email" type="email" autocomplete="email">
<label for="whats">WhatsApp</label><input id="whats" name="whats" type="tel" required autocomplete="tel" placeholder="(00) 00000-0000">
<label>Quais serviços te interessam? (opcional)</label>
<div class="chips">${SERVICOS_CONTATO.map((s) => `<label style="margin:0;font:inherit;text-transform:none;letter-spacing:0;color:inherit"><input type="checkbox" name="servicos" value="${esc(s)}"><span>${esc(s)}</span></label>`).join('')}</div>
<label for="msg">Mensagem</label><textarea id="msg" name="msg" required></textarea>
<button type="submit" class="pilula" style="margin-top:0"><span>Enviar mensagem</span><i>→</i></button>
<p class="aviso">Ao enviar, você concorda com a nossa <a href="/en/privacidade">política de privacidade</a>. O envio abre o seu e-mail com a mensagem pronta.</p>
</form></div></main>
<script>
document.getElementById('form-contato').onsubmit=(e)=>{e.preventDefault();const f=new FormData(e.target);
const corpo='Nome: '+f.get('nome')+'\\nE-mail: '+(f.get('email')||'-')+'\\nWhatsApp: '+f.get('whats')+'\\nServiços: '+(f.getAll('servicos').join(', ')||'-')+'\\n\\n'+f.get('msg');
location.href='mailto:contato@rd360.co?subject='+encodeURIComponent('Novo projeto: '+f.get('nome'))+'&body='+encodeURIComponent(corpo);};
</script>`);
}

const LEGAL = {
  privacidade: ['Política de Privacidade', [
    ['1. Quem somos', 'A RD360 (Road to Digital) é um estúdio de marca, produto e tecnologia. Esta Política explica como tratamos os dados pessoais coletados pelo nosso site e nos nossos serviços, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).'],
    ['2. Dados que coletamos', 'Coletamos apenas os dados que você nos fornece de forma voluntária, principalmente pelo formulário de contato: nome, e-mail, telefone, os serviços de interesse e a mensagem enviada.', 'Também podemos coletar dados de navegação de forma agregada e anônima (páginas visitadas, tempo de sessão) para melhorar o site.'],
    ['3. Como usamos os seus dados', 'Usamos os seus dados para responder ao seu contato, elaborar propostas, prestar os serviços contratados e manter você informado sobre o andamento de projetos. Não vendemos nem alugamos os seus dados a terceiros.'],
    ['4. Base legal', 'O tratamento se dá com base no seu consentimento ao enviar o formulário, na execução de contrato ou de procedimentos preliminares e no legítimo interesse da RD360 em atender e dar continuidade ao relacionamento comercial.'],
    ['5. Compartilhamento', 'Podemos compartilhar dados com prestadores que nos apoiam na operação (por exemplo, ferramentas de CRM, e-mail e hospedagem), sempre no mínimo necessário e sob obrigações de confidencialidade e segurança.'],
    ['6. Armazenamento e segurança', 'Adotamos medidas técnicas e organizacionais razoáveis para proteger os seus dados contra acesso não autorizado, perda ou uso indevido. Mantemos os dados apenas pelo tempo necessário às finalidades acima ou conforme exigido por lei.'],
    ['7. Os seus direitos', 'Você pode, a qualquer momento, solicitar a confirmação, o acesso, a correção, a portabilidade, a anonimização ou a exclusão dos seus dados, além de revogar o consentimento. Para isso, basta escrever para contato@rd360.co.'],
    ['8. Cookies', 'O site pode utilizar cookies essenciais ao funcionamento e, eventualmente, de análise. Você pode gerenciar os cookies nas configurações do seu navegador.'],
    ['9. Alterações', 'Esta Política pode ser atualizada. A versão vigente estará sempre disponível nesta página, com a data da última atualização.'],
    ['10. Contato', 'Dúvidas sobre privacidade e dados pessoais: contato@rd360.co.'],
  ]],
  termos: ['Termos de Uso', [
    ['1. Aceitação', 'Ao acessar e utilizar o site da RD360 (Road to Digital), você concorda com estes Termos de Uso. Caso não concorde, pedimos que não utilize o site.'],
    ['2. Uso do site', 'O site é destinado à apresentação do estúdio, dos nossos serviços e cases, e ao contato comercial. Você se compromete a usá-lo de forma lícita, sem prejudicar o funcionamento do site ou os direitos de terceiros.'],
    ['3. Propriedade intelectual', 'Todo o conteúdo do site (textos, marcas, logotipos, imagens, layout, códigos e projetos apresentados) pertence à RD360 ou aos seus respectivos titulares e é protegido por lei. É proibida a reprodução, distribuição ou uso sem autorização prévia por escrito.', 'Os cases exibidos são de propriedade dos respectivos clientes e apresentados a título de portfólio.'],
    ['4. Contato e propostas', 'As informações enviadas pelo formulário de contato são usadas para retorno comercial. O envio não gera qualquer obrigação de contratação por nenhuma das partes; eventuais serviços serão regidos por proposta e contrato específicos.'],
    ['5. Links externos', 'O site pode conter links para sites de terceiros. A RD360 não se responsabiliza pelo conteúdo, políticas ou práticas desses sites.'],
    ['6. Limitação de responsabilidade', 'O site é fornecido "no estado em que se encontra". A RD360 empenha-se em manter as informações corretas e o site disponível, mas não garante ausência de erros ou interrupções, não respondendo por danos decorrentes do uso ou da indisponibilidade do site.'],
    ['7. Privacidade', 'O tratamento de dados pessoais segue a nossa Política de Privacidade, disponível no site.'],
    ['8. Alterações', 'Estes Termos podem ser atualizados a qualquer momento. A versão vigente estará sempre disponível nesta página.'],
    ['9. Foro e contato', 'Estes Termos são regidos pelas leis brasileiras. Dúvidas podem ser encaminhadas para contato@rd360.co.'],
  ]],
};

export function paginaLegal(_c, qual) {
  const [titulo, secoes] = LEGAL[qual];
  const corpo = secoes.map(([h, ...ps]) => `<h2>${esc(h)}</h2>${ps.map((t) => `<p>${esc(t).replace('contato@rd360.co', '<a href="mailto:contato@rd360.co">contato@rd360.co</a>').replace('Política de Privacidade, disponível', '<a href="/en/privacidade">Política de Privacidade</a>, disponível')}</p>`).join('')}`).join('');
  return casca(`${titulo} | Road to Digital`, titulo + ' da RD360 (Road to Digital).', `
<style>.legal{max-width:760px;padding-bottom:110px;font-size:18px;line-height:1.7}.legal h2{font-weight:400;font-size:26px;margin:40px 0 10px}.legal p{color:var(--suave);margin-bottom:12px}.legal a{border-bottom:1px solid currentColor;color:var(--texto)}</style>
<main class="wrap"><section class="topo"><div class="olho">Última atualização: julho de 2026</div><h1>${esc(titulo)}</h1></section>
<div class="legal">${corpo}</div></main>`);
}

export function paginaServicos() {
  const lista = SERVICOS.map(([t, d], i) => `<div class="servico" id="${ancora(t)}"><span>0${i + 1}</span><h2>${esc(t)}</h2><p>${esc(d)}</p></div>`).join('');
  return casca('Serviços | Road to Digital', 'Da estratégia à venda, sem trocar de time.', `
<main class="wrap"><section class="topo"><div class="olho">Serviços</div>
<h1>Da estratégia à venda,<br>sem trocar de time.</h1>
<p class="intro">Um time sênior que desenha a marca, constrói o site, opera a mídia e organiza o comercial. As mesmas pessoas do primeiro rascunho ao relatório de resultado.</p>
<a class="pilula" href="/en/cases"><span>Ver cases</span><i>→</i></a></section>
<div class="servicos">${lista}</div></main>`);
}
