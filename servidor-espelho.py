"""Servidor local que espelha um site: serve o que já existe na pasta e, se faltar,
busca uma vez no site original e salva.
Uso: python3 -I servidor-espelho.py <pasta> <porta> <origem> [host-extra ...]
Hosts extras (ex.: CDN de vídeos) são reescritos para /__ext/<host>/... e também ficam salvos."""
import sys, os, urllib.request, urllib.parse, mimetypes, threading
TRAVAS = {}; TRAVA_GERAL = threading.Lock()
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
pasta, porta, origem = os.path.abspath(sys.argv[1]), int(sys.argv[2]), sys.argv[3].rstrip('/')
EXTRAS = sys.argv[4:]
TEXTO = ('.html', '.json', '.js', '.css', '.mjs')
class H(SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a, directory=pasta, **k)
    def log_message(s,*a): pass
    def do_GET(s):
        partes = urllib.parse.urlparse(s.path); caminho = partes.path
        if caminho == '/_vercel/image':  # otimizador da Vercel: aponta para a imagem original espelhada
            alvo = urllib.parse.urlparse(urllib.parse.parse_qs(partes.query).get('url', [''])[0])
            if alvo.netloc in EXTRAS:
                s.send_response(302); s.send_header('Location', '/__ext/' + alvo.netloc + alvo.path); s.end_headers(); return
        local = os.path.normpath(os.path.join(pasta, urllib.parse.unquote(caminho).lstrip('/')))
        if not local.startswith(pasta): return s.send_error(403)
        pagina = caminho.endswith('/') or '.' not in caminho.rsplit('/', 1)[-1]
        if pagina: local = os.path.join(local, 'index.html')  # páginas sem extensão viram pasta/index.html
        if not os.path.exists(local):
            with TRAVA_GERAL: trava = TRAVAS.setdefault(local, threading.Lock())
            with trava:  # um download por arquivo, mesmo com vários pedidos ao mesmo tempo
                if not os.path.exists(local):
                    try:
                        url = origem + s.path
                        if caminho.startswith('/__ext/'):
                            url = 'https://' + s.path[len('/__ext/'):]
                        d = urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'Mozilla/5.0'}), timeout=300).read()
                        os.makedirs(os.path.dirname(local), exist_ok=True)
                        tmp = local + '.baixando'; open(tmp,'wb').write(d); os.replace(tmp, local)  # salva inteiro de uma vez
                    except Exception as e: return s.send_error(404)
        if local.endswith(TEXTO):
            # reescreve links para os hosts extras, para que o navegador peça a este servidor
            t = open(local, 'rb').read().decode('utf-8', 'replace')
            for h in EXTRAS:
                t = t.replace('https://' + h, '/__ext/' + h).replace('https:\\/\\/' + h, '\\/__ext\\/' + h)
                t = t.replace('https:\\u002F\\u002F' + h, '\\u002F__ext\\u002F' + h)  # barras escritas como \u002F (Nuxt)
            b = t.encode('utf-8'); tipo = mimetypes.guess_type(local)[0] or 'text/html'
            s.send_response(200); s.send_header('Content-Type', tipo + '; charset=utf-8'); s.send_header('Content-Length', str(len(b))); s.end_headers()
            return s.wfile.write(b)
        s.path = '/' + urllib.parse.quote(os.path.relpath(local, pasta).replace(os.sep, '/'))  # barras normais no Windows
        return super().do_GET()
mimetypes.add_type('application/wasm','.wasm'); mimetypes.add_type('application/javascript','.js')
ThreadingHTTPServer(('127.0.0.1', porta), H).serve_forever()
