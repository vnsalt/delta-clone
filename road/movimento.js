// Movimento do site da Road: cortina entre páginas, rolagem suave, blocos que entram ao rolar.
// Usado nas páginas próprias (casca em paginas.mjs) e, só a cortina, no template da Delta (injetar.html).
(() => {
  if (window.__roadMovimento) return;
  window.__roadMovimento = true;
  const html = document.documentElement;
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const propria = !!document.querySelector('[data-road-pagina]');
  const guardar = (v) => { try { v ? sessionStorage.setItem('road-trans', '1') : sessionStorage.removeItem('road-trans'); } catch {} };

  // ---- cortina ----
  const cortina = document.createElement('div');
  cortina.className = 'road-cortina';
  cortina.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cortina);

  let veio = html.classList.contains('road-chegando');
  if (!veio) { try { veio = sessionStorage.getItem('road-trans') === '1'; } catch {} if (veio) html.classList.add('road-chegando'); }
  guardar(false);

  function abrir() {
    if (!html.classList.contains('road-chegando')) return;
    requestAnimationFrame(() => {
      cortina.classList.add('saindo');
      html.classList.remove('road-chegando');
      setTimeout(() => cortina.classList.remove('saindo'), 800);
      revelarInicio();
    });
  }
  if (veio) {
    // espera a página ter o que mostrar, mas nunca mais que 700ms
    const pronto = () => { clearTimeout(t); abrir(); };
    const t = setTimeout(pronto, 700);
    if (document.readyState === 'complete') pronto(); else addEventListener('load', pronto, { once: true });
  }

  let indo = false;
  window.roadIr = (url) => {
    if (indo) return;
    indo = true;
    guardar(true);
    if (window.__roadLenis) window.__roadLenis.stop();
    cortina.classList.remove('saindo');
    cortina.classList.add('cobrindo');
    setTimeout(() => { location.href = url; }, reduzido ? 200 : 560);
  };
  // voltar/avançar pelo histórico (bfcache): a página volta descoberta
  addEventListener('pageshow', (e) => {
    if (!e.persisted) return;
    indo = false;
    cortina.classList.remove('cobrindo', 'saindo');
    html.classList.remove('road-chegando');
    if (window.__roadLenis) window.__roadLenis.start();
  });

  function interno(a, e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
    if (a.target && a.target !== '_self') return null;
    if (a.hasAttribute('download')) return null;
    const href = a.getAttribute('href') || '';
    if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) return null;
    const u = new URL(a.href, location.href);
    if (u.origin !== location.origin) return null;
    if (u.pathname === location.pathname && u.search === location.search) return { hash: u.hash };
    return { url: u.href };
  }

  // nas páginas próprias a navegação é nossa; no template, o injetar.html chama roadIr
  if (propria) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      const r = interno(a, e);
      if (!r) return;
      e.preventDefault();
      if (r.url) return window.roadIr(r.url);
      if (r.hash) irPara(r.hash);
    });
  }

  // ---- rolagem suave ----
  function irPara(hash) {
    const alvo = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!alvo) return;
    history.replaceState(null, '', hash);
    if (window.__roadLenis) window.__roadLenis.scrollTo(alvo, { offset: -90, duration: 1.2 });
    else alvo.scrollIntoView({ behavior: reduzido ? 'auto' : 'smooth' });
  }
  if (propria && !reduzido) {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js';
    s.onload = () => {
      const lenis = new window.Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      window.__roadLenis = lenis;
      const quadro = (t) => { lenis.raf(t); requestAnimationFrame(quadro); };
      requestAnimationFrame(quadro);
      if (location.hash) setTimeout(() => irPara(location.hash), 300);
    };
    document.head.appendChild(s);
  } else if (propria && location.hash) {
    setTimeout(() => irPara(location.hash), 100);
  }

  // ---- blocos que entram ao rolar (só nas páginas próprias) ----
  if (!propria) return;
  const SEL = ['.topo > *:not(h1)', '.capa', '.capa-post', '.nums-case > div', '.universo .olho', '.projeto > div', '.galeria img', '.no-ar', '.redes > *:not(.feed)', '.feed img',
    '.filtros', '.card', '.post-card', '.servico', '.num', '.citas blockquote', '.bloco > .olho', 'details', '.contato > *', '.legal > *', '.artigo > *', 'footer .pilula', 'footer p', 'footer .colunas > div', '.prox .olho', '.prox .intro', '.prox .pilula', '.prox-preview'].join(',');
  const titulos = document.querySelectorAll('h1, .grande, h2.t');
  titulos.forEach((el) => {
    const partes = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = partes.map((p, i) => `<span class="road-linha" style="--i:${i}"><span>${p}</span></span>`).join('');
    el.classList.add('road-titulo');
  });
  const itens = [...document.querySelectorAll(SEL)].filter((el) => !el.closest('.road-titulo'));
  itens.forEach((el) => { el.classList.add('rv'); if (el.tagName === 'IMG' || el.classList.contains('card') || el.classList.contains('no-ar') || el.classList.contains('prox-preview')) el.classList.add('rv-img'); });

  const io = new IntersectionObserver((entradas) => {
    // escalona só o que entra junto, no máximo 240ms
    const novos = entradas.filter((e) => e.isIntersecting).map((e) => e.target);
    novos.forEach((el, i) => {
      el.style.setProperty('--atraso', Math.min(i * 60, 240) + 'ms');
      el.classList.add('visto');
      io.unobserve(el);
      setTimeout(() => el.style.removeProperty('--atraso'), 1400);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  let comecou = false;
  function revelarInicio() {
    if (comecou) return;
    comecou = true;
    [...titulos, ...itens].forEach((el) => io.observe(el));
  }
  if (!html.classList.contains('road-chegando')) revelarInicio();

  // filtros (cases e blog): os cards que reaparecem entram de novo
  window.roadRefiltrar = (els) => els.forEach((el, i) => {
    el.classList.add('visto');
    el.classList.remove('road-filtrado');
    void el.offsetWidth;
    el.style.animationDelay = Math.min(i * 40, 200) + 'ms';
    el.classList.add('road-filtrado');
  });
})();
