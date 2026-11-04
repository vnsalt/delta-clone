# delta-clone (estudo)

Espelho local de https://deltacafes.com/en, só para estudo. Marca, textos, fotos, vídeos e áudios são da Delta Cafés.

## Rodar

```bash
python -I servidor-espelho.py site 4179 https://deltacafes.com/ burospaces1.fra1.cdn.digitaloceanspaces.com cdn.sanity.io
```

Abra http://localhost:4179/en

- `site/`: tudo o que já foi salvo (HTML, `_payload.json`, JS, CSS, fontes, Rive; imagens do Sanity e vídeos em `site/__ext/`).
- Se faltar algum arquivo, o servidor busca no site original uma única vez e salva em `site/`.

## Site novo da Road to Digital (branch `road/site-novo`)

Usa o espelho como template e aplica, na hora de servir, o conteúdo da Road. Nada em `site/` é alterado.
Precisa só de Node e ffmpeg (sem Python).

```bash
node servidor-road.mjs 4180
```

Abra http://localhost:4180/en

- `road/textos.json`: textos trocados (por texto exato ou pela posição no `_payload.json`).
- `road/imagens.json`: imagem/vídeo da Delta → arquivo da Road. O servidor recorta cada imagem no tamanho da original (cache em `road/.cache/`).
- `road/cases.json` + `road/cases/`: os 12 cases de roadtodigital.com.br.
- `road/paginas.mjs`: páginas próprias: `/en/cases`, `/en/cases/<slug>`, `/en/servicos`, `/en/sobre`, `/en/blog`.
- `road/injetar.html`: logo da Road, links do menu para as páginas novas, rótulos fixos do template.
- `road/gerar-videos.ps1`: gera os vídeos de fundo a partir das imagens dos cases.
- As páginas internas da Delta (products, history, about...) redirecionam para as equivalentes da Road.

## Correções feitas no servidor (Windows)
- Páginas sem extensão (`/en`, `/en/history`) são salvas como `pasta/index.html` e servidas como HTML, em vez de baixar como arquivo.
- `/_vercel/image?url=...` redireciona para a imagem original espelhada em `/__ext/cdn.sanity.io/...`.
- Caminhos com `\` no Windows quebravam imagens, fontes e vídeos; agora usam `/`.
