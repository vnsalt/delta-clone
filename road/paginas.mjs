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
<style>
@font-face{font-family:Season;src:url(/fonts/delta-season-vf.woff2) format("woff2");font-weight:100 900}
@font-face{font-family:Gothic;src:url(/fonts/trade-gothic-condenced.woff2) format("woff2")}
@font-face{font-family:GothicB;src:url(/fonts/trade-gothic-bold-condenced.woff2) format("woff2")}
:root{--creme:#f6e9dc;--cafe:#2c1a12;--cafe2:#3a241a;--texto:#2c1a12;--suave:#7a6355;--linha:rgba(44,26,18,.15)}
*{box-sizing:border-box;margin:0}
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
footer .base{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:70px;padding-top:20px;border-top:1px solid rgba(246,233,220,.2);font-family:GothicB,sans-serif;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#c9ad97}
@media (max-width:900px){.grade{grid-template-columns:1fr 1fr}.servico{grid-template-columns:1fr}.ficha{grid-template-columns:1fr}}
@media (max-width:600px){.wrap{padding:0 16px}.grade,.galeria{grid-template-columns:1fr}.nav{gap:14px;padding:10px 16px;font-size:11px}.nav .esconde{display:none}}
</style></head><body>
<nav class="nav"><a href="/en" class="esconde">Início</a><a href="/en/servicos">Serviços</a><a href="/en" aria-label="Road to Digital"><img src="/road/logo.svg" alt="Road to Digital"></a><a href="/en/cases">Cases</a><a href="/en/sobre" class="esconde">Sobre</a><a href="/en/blog" class="esconde">Blog</a></nav>
${corpo}
<footer class="escuro"><div class="wrap">
<div class="grande">Vamos construir<br>algo que dura.</div>
<a class="pilula" href="https://www.roadtodigital.com.br/" target="_blank" rel="noopener"><span>Iniciar um projeto</span><i>→</i></a>
<p>A RD360 é uma assessoria de marketing que une estratégia, design, tecnologia e comercial num sistema só, para marcas feitas para permanecer.</p>
<div class="base"><span>© 2026 RD360. Todos os direitos reservados.</span><span>Parceiro oficial Google · Meta · TikTok</span></div>
</div></footer></body></html>`;
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
  document.querySelectorAll('.card').forEach(c=>c.style.display=(f==='Todos'||c.dataset.cat===f)?'':'none');};
botoes.forEach(b=>b.onclick=()=>filtrar(b.dataset.f));
const atalho={identidade:'Identidade Visual',web:'Websites & Landing pages',produto:'Desenvolvimento de Produto'}[new URLSearchParams(location.search).get('c')];
if(atalho)filtrar(atalho);
</script>`);
}

export function paginaCase({ cases }, c) {
  const i = cases.indexOf(c);
  const prox = cases[(i + 1) % cases.length];
  const galeria = c.imagens.slice(1).map((n) => `<img src="${img(n)}" alt="${esc(c.nome)}: ${esc(n.replace(/-/g, ' '))}" loading="lazy">`).join('');
  return casca(`${c.nome} | Cases Road to Digital`, c.descricao, `
<main class="wrap"><section class="topo"><a class="olho" href="/en/cases">← Todos os cases</a>
<div class="olho" style="margin-top:22px">${esc(c.categoria)} · ${c.ano}</div>
<h1>${esc(c.chamada)}</h1>
<p class="intro">${esc(c.descricao)}</p></section>
<img class="capa" src="${img(c.imagens[0])}" alt="${esc(c.nome)}">
<div class="ficha"><div><small>Cliente</small>${esc(c.nome)}</div><div><small>Categoria</small>${esc(c.categoria)}</div><div><small>Entregas</small>${c.tags.map(esc).join(' · ')}</div></div>
<div class="galeria">${galeria}</div></main>
<section class="escuro prox"><div class="wrap"><div class="olho">Próximo case</div>
<a href="/en/cases/${prox.slug}"><div class="grande" style="margin-top:12px">${esc(prox.nome)}</div></a>
<a class="pilula" href="/en/cases/${prox.slug}"><span>Ver case</span><i>→</i></a></div></section>`);
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

const POSTS = [
  ['Odontologia', '15 out 2026', 'Landing page para clínica odontológica: o que a página precisa ter em cada procedimento', 'fc-dermatologia-site-institucional-abertura'],
  ['Indústria', '1 out 2026', 'Marketing digital para indústrias: o guia prático para vender para quem compra por especificação', 'polyblu-site-institucional-abertura'],
  ['Medicina', '1 out 2026', 'Publicidade médica: o que pode e o que não pode pela Resolução CFM 2.336/2023', 'h-link-plataforma-web-abertura'],
  ['Odontologia', '1 out 2026', 'O que o dentista pode postar: as regras do CFO para publicidade odontológica', 'rafael-pamplona-landing-page-capa'],
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
<a class="pilula" href="https://www.roadtodigital.com.br/" target="_blank" rel="noopener"><span>Falar com a gente</span><i>→</i></a></section>
</div></main>`);
}

export function paginaBlog() {
  const cards = POSTS.map(([cat, data, t, im]) => `<a class="card post" href="https://www.roadtodigital.com.br/" target="_blank" rel="noopener"><img src="${img(im)}" alt="" loading="lazy"><div class="rot"><small>${esc(cat)} · ${esc(data)}</small><b>${esc(t)}</b></div></a>`).join('');
  return casca('Blog | Road to Digital', 'Conteúdo e atualizações da Road to Digital.', `
<style>.grade.blog{grid-template-columns:1fr 1fr}.post .rot b{font-size:22px;line-height:1.2}</style>
<main class="wrap"><section class="topo"><div class="olho">Blog</div><h1>Conteúdo e<br>atualizações.</h1>
<p class="intro">Guias práticos sobre marketing para saúde e indústria, e o que aprendemos construindo marcas.</p></section>
<div class="grade blog">${cards}</div></main>`);
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
