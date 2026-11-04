# Gera vídeos curtos (zoom lento) a partir das imagens dos cases, para os fundos em vídeo do template.
# Uso: powershell -File road/gerar-videos.ps1   (precisa do ffmpeg no PATH)
$ErrorActionPreference = 'Stop'
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
New-Item -ItemType Directory -Force "$base\videos" | Out-Null
$lista = @{
  'hero-1'  = 'luminosa-identidade-visual-wide'
  'hero-2'  = 'polyblu-site-institucional-capa'
  'hero-3'  = 'bela-tintas-identidade-visual-capa'
  'caminho' = 'h-link-plataforma-web-abertura'
  'colagem' = 'weflock-identidade-visual-mockup-4'
  'rodape'  = 'luminosa-identidade-visual-lago'
  'menu-1'  = 'luminosa-identidade-visual-capa'
  'menu-2'  = 'miofit-identidade-visual-capa'
  'menu-3'  = 'clilink-produto-saas-capa'
  'menu-4'  = 'overone-plataforma-fitness-capa'
  'menu-5'  = 'fc-dermatologia-site-institucional-capa'
  'menu-6'  = 'rafael-pamplona-landing-page-capa'
}
foreach ($k in $lista.Keys) {
  $saida = "$base\videos\$k.mp4"
  if ((Test-Path $saida) -and (Get-Item $saida).Length -gt 0) { continue }
  $img = "$base\cases\$($lista[$k]).webp"
  # 8 s a 25 fps; recorta para 16:9 e aproxima de 1.00 a 1.08
  ffmpeg -v error -y -loop 1 -i $img -t 8 -vf "scale=2400:1350:force_original_aspect_ratio=increase,crop=2400:1350,zoompan=z='1+0.08*on/200':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=200:s=1920x1080:fps=25,format=yuv420p" -c:v libx264 -preset veryfast -crf 26 -movflags +faststart -an $saida
  Write-Output "ok $k"
}
