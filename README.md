# kskluc4.github.io

Página inicial do portfólio de Lucas Marques. O visitante escolhe como quer ver os projetos:

- **Fliperama**: https://kskluc4.github.io/portfolio-arcade/
- **Metrô**: https://kskluc4.github.io/portfolio-metro/

HTML, CSS e JavaScript puro, sem build. As prévias são feitas em CSS e SVG.

## Editar

- Textos e LinkedIn: `config.js`.
- Visual: `css/style.css`.
- Imagem de compartilhamento (Open Graph): `assets/og.png`, 1200×630.

## Rodar localmente

```sh
python3 -m http.server 8000
```

Depois abra http://localhost:8000. Abrir o `index.html` direto do disco não funciona, porque o JavaScript é carregado como módulo.

## Teclado

- `←` / `↑`: fliperama
- `→` / `↓`: metrô
- `Enter`: entra no modo escolhido
