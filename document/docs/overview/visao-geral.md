# 00 - Visao Geral

## Projeto
O SiteToddy e um site pessoal em React com foco em:
- pagina inicial
- blog tecnico com conteudo em markdown
- portfolio visual por categoria
- paginas basicas de conta (profile/signup)

Referencia: `README.md`.

## Stack
Dependencias observadas em `package.json`:
- Runtime UI: `react`, `react-dom`
- Roteamento: `react-router-dom`
- SEO em SPA: `react-helmet-async`
- Conteudo markdown: `gray-matter`, `react-markdown`, `remark-gfm`
- Build/dev: `vite`, `@vitejs/plugin-react`
- Estilo: `tailwindcss`, `@tailwindcss/vite`

Configuracao de build: `vite.config.js`.

## Bootstrap da aplicacao
Fluxo de inicializacao:
1. `src/main.jsx` injeta `Buffer` no `window` (`src/main.jsx:1-5`).
2. `src/main.jsx` monta providers (`HelmetProvider`, `BrowserRouter`) e renderiza `App` (`src/main.jsx:9-21`).
3. `App` define as rotas (`src/App.jsx:12-33`).

### Componentes/funcoes descritos e uso
- `App` (`src/App.jsx:12`)
  - Importado e usado em `src/main.jsx:12` e `src/main.jsx:18`.
- `AppLayout` (`src/layouts/AppLayout.jsx:5`)
  - Importado em `src/App.jsx:2`; usado em `src/App.jsx:15` como layout comum das rotas.

## Modulos existentes

### 1) Home
- Pagina: `src/pages/home.jsx`
- Componentes usados:
  - `Hero` importado em `src/pages/home.jsx:1`; usado em `src/pages/home.jsx:18`.
  - `LinkTree` importado em `src/pages/home.jsx:2`; usado em `src/pages/home.jsx:21`.
  - `Form` importado em `src/pages/home.jsx:3`; usado em `src/pages/home.jsx:33` e `src/pages/home.jsx:40`.
  - `ButtonLinkCreateAccount` importado em `src/pages/home.jsx:4`; usado em `src/pages/home.jsx:57`.

### 2) Blog
- Paginas roteadas:
  - Dashboard: `src/pages/blog/BlogDashboard.jsx`
  - Categoria: `src/pages/blog/BlogCategory.jsx`
  - Artigo: `src/pages/blog/BlogArticle.jsx`
- Dominio:
  - Loader: `src/lib/blog/loadPosts.js`
  - Utils de categoria: `src/lib/blog/categoryUtils.js`
- Conteudo: `src/content/blog/*.md`

Funcoes/componentes descritos e uso:
- `getLatestPosts`, `getAllCategories`, `getPostsByCategory`, `getPinnedPostsByCategory` (exportados em `src/lib/blog/loadPosts.js:183-218`)
  - Importados em `src/pages/blog/BlogDashboard.jsx:9-12`.
- `getPostsByCategory` (`src/lib/blog/loadPosts.js:200`)
  - Importado em `src/pages/blog/BlogCategory.jsx:5`; usado em `src/pages/blog/BlogCategory.jsx:16`.
- `getAllPosts` (`src/lib/blog/loadPosts.js:179`)
  - Importado em `src/pages/blog/BlogArticle.jsx:5`; usado em `src/pages/blog/BlogArticle.jsx:27`.
- `categorySlugToTitle` (alias em `src/lib/blog/categoryUtils.js:30`)
  - Importado em `src/pages/blog/BlogCategory.jsx:4`, `src/pages/blog/BlogArticle.jsx:4`, `src/components/blog/PostCard.jsx:2`.
- `MarkdownContent` (`src/components/blog/MarkdownContent.jsx:4`)
  - Importado em `src/pages/blog/BlogArticle.jsx:3`; usado em `src/pages/blog/BlogArticle.jsx:99`.

### 3) Portfolio
- Paginas roteadas:
  - Listagem por categoria: `src/pages/portfolio.jsx`
  - Detalhe por categoria: `src/pages/portfolioCategory.jsx`
- Fonte de dados: `src/data/portfolio.js`

Funcoes/componentes descritos e uso:
- `portfolioData` (`src/data/portfolio.js:1`)
  - Importado em `src/pages/portfolio.jsx:4` e `src/pages/portfolioCategory.jsx:4`.
- `Lightbox` (funcao interna em `src/pages/portfolio.jsx:20`)
  - Uso direto no mesmo arquivo em `src/pages/portfolio.jsx:244`.
- `Lightbox` (funcao interna em `src/pages/portfolioCategory.jsx:20`)
  - Uso direto no mesmo arquivo em `src/pages/portfolioCategory.jsx:216`.

### 4) Conta (estado atual)
- `src/pages/profile.jsx`: placeholder sem integracao de backend.
- `src/pages/signup.jsx`: formulario com validacao basica local de senha.

Funcoes/componentes descritos e uso:
- `handleSignup` (funcao interna em `src/pages/signup.jsx:6`)
  - Uso direto no mesmo arquivo em `src/pages/signup.jsx:33`.
- `Form` (`src/components/form.jsx:1`)
  - Importado em `src/pages/signup.jsx:2`; usado em `src/pages/signup.jsx:34`, `src/pages/signup.jsx:36`, `src/pages/signup.jsx:43`, `src/pages/signup.jsx:50`.

## Observacoes de estado atual
- Existe `src/pages/Blog.jsx` (sanity check), mas nao esta ligado nas rotas de `src/App.jsx`.
  - Nao encontrado uso direto nas rotas atuais.
- `index.html` contem `#modal-root`, usado pelos modais de portfolio via `createPortal`.
  - Uso em `src/pages/portfolio.jsx:20` e `src/pages/portfolioCategory.jsx:20`.
