# delta-clone (estudo)

Espelho local de https://deltacafes.com/en, só para estudo. Marca, textos, fotos, vídeos e áudios são da Delta Cafés.

## Rodar

```bash
python -I servidor-espelho.py site 4179 https://deltacafes.com/ burospaces1.fra1.cdn.digitaloceanspaces.com cdn.sanity.io
```

Abra http://localhost:4179/en

- `site/`: tudo o que já foi salvo (HTML, `_payload.json`, JS, CSS, fontes, Rive; imagens do Sanity e vídeos em `site/__ext/`).
- Se faltar algum arquivo, o servidor busca no site original uma única vez e salva em `site/`.
- `MAPA.md`: análise da tecnologia, do design e dos componentes.

## Correções feitas no servidor (Windows)
- Páginas sem extensão (`/en`, `/en/history`) são salvas como `pasta/index.html` e servidas como HTML, em vez de baixar como arquivo.
- `/_vercel/image?url=...` redireciona para a imagem original espelhada em `/__ext/cdn.sanity.io/...`.
- Caminhos com `\` no Windows quebravam imagens, fontes e vídeos; agora usam `/`.
