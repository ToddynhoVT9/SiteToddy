# 50 - Modulo Portfolio

## Navegacao
- Hub principal: [`document/README.md`](../README.md)
- Blog: [`document/modules/blog/README.md`](./blog/README.md)

## Rotas do modulo

Definidas em `src/App.jsx:27-30`:
- `/portfolio` -> `Portfolio` (`src/pages/portfolio.jsx`)
- `/portfolio/:categoria` -> `PortfolioCategory` (`src/pages/portfolioCategory.jsx`)

Importacao/uso no roteador:
- `Portfolio` importado em `src/App.jsx:8`; usado em `src/App.jsx:28`.
- `PortfolioCategory` importado em `src/App.jsx:10`; usado em `src/App.jsx:29`.

## Implementado

## 1) Pagina `/portfolio` (`src/pages/portfolio.jsx`)

Comportamento implementado:
- Renderiza categorias com base em `portfolioData` (`src/pages/portfolio.jsx:4`, `src/pages/portfolio.jsx:166`).
- Mostra preview de ate 12 itens por categoria via `slice(0, 12)` (`src/pages/portfolio.jsx:168`).
- Exibe grade 3 colunas no bloco de preview (`src/pages/portfolio.jsx:226`).
- Link para rota de categoria por slug (`src/pages/portfolio.jsx:218-223`).
- Clique em card abre lightbox (`src/pages/portfolio.jsx:231-234`, `src/pages/portfolio.jsx:244-252`).

Funcoes/componentes internos descritos e uso:
- `useEnterAnimation` (`src/pages/portfolio.jsx:6`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolio.jsx:159`.
- `clampIndex` (`src/pages/portfolio.jsx:15`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolio.jsx:183`, `src/pages/portfolio.jsx:188`.
- `Lightbox` (`src/pages/portfolio.jsx:20`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolio.jsx:245`.
- `ImageCard` (`src/pages/portfolio.jsx:131`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolio.jsx:228`.

## 2) Pagina `/portfolio/:categoria` (`src/pages/portfolioCategory.jsx`)

Comportamento implementado:
- Le slug da URL com `useParams` (`src/pages/portfolioCategory.jsx:129`).
- Busca categoria por `slug` em `portfolioData` (`src/pages/portfolioCategory.jsx:131-133`).
- Se categoria nao existe, renderiza fallback e link de volta (`src/pages/portfolioCategory.jsx:138-157`).
- Se existe, renderiza lista vertical de itens (`src/pages/portfolioCategory.jsx:197-232`).
- Clique em imagem abre lightbox da categoria inteira (`src/pages/portfolioCategory.jsx:208-221`, `src/pages/portfolioCategory.jsx:234-242`).

Funcoes/componentes internos descritos e uso:
- `useEnterAnimation` (`src/pages/portfolioCategory.jsx:6`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolioCategory.jsx:128`.
- `clampIndex` (`src/pages/portfolioCategory.jsx:15`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolioCategory.jsx:166`, `src/pages/portfolioCategory.jsx:170`.
- `Lightbox` (`src/pages/portfolioCategory.jsx:20`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/portfolioCategory.jsx:235`.

## 3) Dados do portfolio (`src/data/portfolio.js`)

Estrutura implementada:
- Exporta `portfolioData` (`src/data/portfolio.js:1`).
- Cada categoria contem:
  - `title` (`src/data/portfolio.js:3`, `src/data/portfolio.js:81`)
  - `slug` (`src/data/portfolio.js:4`, `src/data/portfolio.js:82`)
  - `items[]` (`src/data/portfolio.js:5`, `src/data/portfolio.js:83`)
- Cada item contem:
  - `id` (`src/data/portfolio.js:7`)
  - `src` (`src/data/portfolio.js:8`)
  - `alt` (`src/data/portfolio.js:9`)
  - `description` (`src/data/portfolio.js:10`)

Importacao/uso:
- `portfolioData` importado em `src/pages/portfolio.jsx:4`; usado em `src/pages/portfolio.jsx:166`.
- `portfolioData` importado em `src/pages/portfolioCategory.jsx:4`; usado em `src/pages/portfolioCategory.jsx:132`.

## 4) Lightbox/modal (implementacao real)

Presente nas duas paginas do portfolio:
- `src/pages/portfolio.jsx:20-129`
- `src/pages/portfolioCategory.jsx:20-125`

Comportamentos implementados:
- Renderizacao via portal (`createPortal`) em `src/pages/portfolio.jsx:57`, `src/pages/portfolioCategory.jsx:55`.
- Mount em `#modal-root` (`document.getElementById("modal-root")`) em `src/pages/portfolio.jsx:21`, `src/pages/portfolioCategory.jsx:21`.
- `#modal-root` existe em `index.html:13`.
- Fecha com:
  - clique no backdrop (`src/pages/portfolio.jsx:64`, `src/pages/portfolioCategory.jsx:61`)
  - botao "Fechar" (`src/pages/portfolio.jsx:87`, `src/pages/portfolioCategory.jsx:83`)
  - `Escape` no teclado (`src/pages/portfolio.jsx:30`, `src/pages/portfolioCategory.jsx:30`)
- Navegacao com setas do teclado no modal:
  - esquerda (`src/pages/portfolio.jsx:31`, `src/pages/portfolioCategory.jsx:31`)
  - direita (`src/pages/portfolio.jsx:32`, `src/pages/portfolioCategory.jsx:32`)
- Navegacao por botoes anterior/proximo dentro do modal:
  - `src/pages/portfolio.jsx:97-115`
  - `src/pages/portfolioCategory.jsx:93-111`
- Bloqueio de scroll do body enquanto modal aberto:
  - `src/pages/portfolio.jsx:26-27`, restore em `src/pages/portfolio.jsx:40`
  - `src/pages/portfolioCategory.jsx:26-27`, restore em `src/pages/portfolioCategory.jsx:39`

## 5) Relacao com acervo `.docs_project/oters/`

Ideias do acervo que batem com implementacao atual:
- `portfolio_initial_structure.md`:
  - grid de preview na pagina principal com clique para modal
  - pagina de categoria em coluna vertical
- `preparacao_portfolio.md`:
  - modal com ESC e navegacao por setas
  - uso de `createPortal`
  - estrutura por categoria via `portfolioData`

## Planejado

Itens sugeridos (nao implementados no codigo atual):
- Garantir publicacao real das imagens em `public/images/portfolio/...` para evitar 404.
- Evoluir gerenciamento de dados do portfolio para fonte externa/CMS (se necessario).
- Melhorias de UX de carregamento (ex.: placeholders especificos por imagem) sem alterar contrato atual.

## Diagrama de fluxo

```text
/portfolio
  -> Portfolio (src/pages/portfolio.jsx)
     -> usa portfolioData
     -> abre Lightbox via modal-root
     -> link para /portfolio/:categoria

/portfolio/:categoria
  -> PortfolioCategory (src/pages/portfolioCategory.jsx)
     -> resolve categoria por slug em portfolioData
     -> renderiza lista vertical
     -> abre Lightbox com todos os itens da categoria
```
