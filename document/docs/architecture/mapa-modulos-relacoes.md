# Mapa de Modulos e Relacoes

## Escopo e fontes

Este mapa foi montado somente a partir do codigo atual do repositorio.

Arquivos-base usados nesta analise:

- `index.html:12-14`
- `src/main.jsx:14-20`
- `src/App.jsx:15-31`
- `src/layouts/AppLayout.jsx:1-25`
- `src/pages/blog/BlogDashboard.jsx:35-130`
- `src/pages/blog/BlogCategory.jsx:12-69`
- `src/pages/blog/BlogArticle.jsx:21-111`
- `src/lib/blog/loadPosts.js:7-223`
- `src/data/portfolio.js:1-158`
- `src/pages/portfolio.jsx:20-129`
- `src/pages/portfolio.jsx:158-255`
- `src/pages/portfolioCategory.jsx:20-125`
- `src/pages/portfolioCategory.jsx:127-245`
- `public/.htaccess`

## 1 Diagrama macro da arquitetura

```txt
index.html
├─ #root -------------------------------> src/main.jsx
│                                          ├─ BrowserRouter (react-router-dom)
│                                          ├─ HelmetProvider (react-helmet-async)
│                                          └─ <App /> -> src/App.jsx
└─ #modal-root <----------------------- createPortal(...) nas paginas de portfolio

src/
├─ pages/
│  ├─ home.jsx
│  ├─ profile.jsx
│  ├─ signup.jsx
│  ├─ portfolio.jsx
│  ├─ portfolioCategory.jsx
│  ├─ Blog.jsx (arquivo existente, sem rota ativa)
│  └─ blog/
│     ├─ BlogDashboard.jsx
│     ├─ BlogCategory.jsx
│     └─ BlogArticle.jsx
├─ layouts/
│  └─ AppLayout.jsx
├─ components/
│  ├─ NavBar.jsx
│  ├─ Sidebar.jsx
│  └─ blog/*
├─ lib/
│  └─ blog/
│     ├─ loadPosts.js
│     └─ categoryUtils.js
├─ data/
│  └─ portfolio.js
└─ content/
   └─ blog/*.md

public/
├─ .htaccess
├─ favicon.svg
└─ images/blog/covers/placeholder-1.svg
```

Relacoes de alto nivel:

```txt
src/App.jsx (rotas)
   -> src/layouts/AppLayout.jsx (estrutura global: Navbar + Sidebar + Outlet)
      -> src/pages/* (conteudo por rota)
         -> src/components/* (composicao de UI)
         -> src/lib/* e src/data/* (dados e funcoes de dominio)
         -> src/content/blog/*.md (fonte de conteudo do blog)

index.html
   -> #root para app React
   -> #modal-root para portal do lightbox do portfolio
```

## 2 Fluxos principais

### 2.1 Rotas -> Layout -> Page -> Components

Fontes:

- Rotas em `src/App.jsx:15-31`
- Layout em `src/layouts/AppLayout.jsx:8-20`

```txt
URL
 -> BrowserRouter (src/main.jsx:17)
 -> <Routes> (src/App.jsx:14)
 -> <Route element={<AppLayout />}> (src/App.jsx:15)
 -> AppLayout renderiza:
    - <Navbar /> (src/layouts/AppLayout.jsx:8, import em :2)
    - <Sidebar /> (src/layouts/AppLayout.jsx:13, import em :3)
    - <Outlet /> (src/layouts/AppLayout.jsx:19)
 -> Pagina da rota atual (src/pages/*)
 -> Componentes da pagina (src/components/*)
```

Mapa rapido das rotas implementadas:

- `/` -> `src/pages/home.jsx` (config em `src/App.jsx:16`)
- `/blog` -> `src/pages/blog/BlogDashboard.jsx` (`src/App.jsx:18-19`)
- `/blog/:categoria` -> `src/pages/blog/BlogCategory.jsx` (`src/App.jsx:20`)
- `/blog/:categoria/:slug` -> `src/pages/blog/BlogArticle.jsx` (`src/App.jsx:21`)
- `/profile` -> `src/pages/profile.jsx` (`src/App.jsx:24`)
- `/signup` -> `src/pages/signup.jsx` (`src/App.jsx:25`)
- `/portfolio` -> `src/pages/portfolio.jsx` (`src/App.jsx:27-28`)
- `/portfolio/:categoria` -> `src/pages/portfolioCategory.jsx` (`src/App.jsx:29`)

### 2.2 Blog: markdown -> loadPosts -> pages -> components

Fontes:

- Markdown em `src/content/blog/*.md`
- Loader em `src/lib/blog/loadPosts.js:7-223`
- Paginas em `src/pages/blog/*`
- Componentes em `src/components/blog/*`

```txt
src/content/blog/*.md
 -> import.meta.glob(..., { eager: true, as: "raw" })
    (src/lib/blog/loadPosts.js:7-10)
 -> matter(rawMarkdown) + normalizacao + validacoes
    (src/lib/blog/loadPosts.js:76-91)
 -> funcoes exportadas:
    - getAllPosts (linha 179)
    - getAllCategories (linha 183)
    - getPostsByCategory (linha 200)
    - getPinnedPostsByCategory (linha 208)
    - getLatestPosts (linha 218)
 -> paginas:
    - BlogDashboard usa getLatestPosts/getAllCategories/getPostsByCategory/getPinnedPostsByCategory
      (src/pages/blog/BlogDashboard.jsx:8-13, 38-39, 85-86)
    - BlogCategory usa getPostsByCategory
      (src/pages/blog/BlogCategory.jsx:5, 16)
    - BlogArticle usa getAllPosts
      (src/pages/blog/BlogArticle.jsx:5, 27)
 -> componentes de blog:
    - PostCard (src/pages/blog/BlogDashboard.jsx:6,77; BlogCategory.jsx:3,64)
    - PinnedGrid + CategoryRail (src/pages/blog/BlogDashboard.jsx:4-5,121-122)
    - MarkdownContent (src/pages/blog/BlogArticle.jsx:3,99)
```

### 2.3 Portfolio: portfolioData -> pages -> lightbox via portal -> modal-root

Fontes:

- Dados em `src/data/portfolio.js:1-158`
- Paginas em `src/pages/portfolio.jsx` e `src/pages/portfolioCategory.jsx`
- Portal em `index.html:13`

```txt
src/data/portfolio.js (export const portfolioData)
 -> consumido por:
    - src/pages/portfolio.jsx (import em :4; uso em :166)
    - src/pages/portfolioCategory.jsx (import em :4; uso em :132)

portfolio.jsx
 -> abre lightbox por categoria/index (src/pages/portfolio.jsx:162-163, 232-233)
 -> renderiza <Lightbox .../> (src/pages/portfolio.jsx:244-251)

portfolioCategory.jsx
 -> abre lightbox por index (src/pages/portfolioCategory.jsx:136, 210)
 -> renderiza <Lightbox .../> (src/pages/portfolioCategory.jsx:234-241)

Lightbox
 -> createPortal(..., modalRoot)
    - src/pages/portfolio.jsx:57,127
    - src/pages/portfolioCategory.jsx:55,123
 -> modalRoot = document.getElementById("modal-root")
    - src/pages/portfolio.jsx:21
    - src/pages/portfolioCategory.jsx:21
 -> destino em index.html: <div id="modal-root"></div> (index.html:13)
```

## 3 Pontos de atencao atuais

1. `src/pages/Blog.jsx` existe mas nao esta roteado no app.

- Evidencia: arquivo presente em `src/pages/Blog.jsx:1-31`.
- Evidencia: `src/App.jsx:1-10` importa apenas `BlogDashboard`, `BlogCategory` e `BlogArticle`.
- Evidencia: rotas do blog em `src/App.jsx:18-21` nao usam `Blog.jsx`.

2. Referencias de imagens do portfolio nao batem com arquivos atuais em `public/`.

- `src/data/portfolio.js:8` e varios itens apontam para `/images/portfolio/...`.
- Em `public/`, hoje ha apenas `public/.htaccess`, `public/favicon.svg` e `public/images/blog/covers/placeholder-1.svg`.
- Impacto esperado: imagens do portfolio podem quebrar em runtime (404) se os assets nao forem adicionados.

3. Duplicacao de implementacao de `Lightbox` nas duas paginas de portfolio.

- `Lightbox` foi implementado separadamente em `src/pages/portfolio.jsx:20-129` e `src/pages/portfolioCategory.jsx:20-125`.
- A estrutura e regras sao muito parecidas (portal, ESC, setas, lock de scroll).
- Risco: divergencia de comportamento ao manter duas copias.

4. Componentes globais sem uso direto encontrado.

- `src/components/CreateAccountCTA.jsx` -> nao encontrado uso direto no `src/`.
- `src/components/Card.jsx` -> nao encontrado uso direto no `src/`.

---

Ultima revisao deste documento: baseada no estado atual do repositorio nesta sessao.
