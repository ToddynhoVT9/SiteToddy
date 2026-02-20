# Diagrama de Arquitetura

## Objetivo

Concentrar, em uma única página, o mapa macro da arquitetura e os fluxos principais do projeto com base no código atual.

## 1 Diagrama macro (alto nível)

```txt
Browser
  -> index.html (#root + #modal-root)
     -> src/main.jsx (BrowserRouter)
        -> src/App.jsx (React Router / mapa de rotas)
           -> src/layouts/AppLayout.jsx
              -> NavBar (src/components/NavBar.jsx)
              -> Sidebar (src/components/Sidebar.jsx)
              -> Outlet (renderiza páginas ativas)
                 -> src/pages/**
                    -> src/components/**
                    -> src/lib/**
                    -> src/data/**
                    -> src/content/**

Dados e conteúdo:
- Blog: src/content/blog/*.md -> src/lib/blog/loadPosts.js
- Portfólio: src/data/portfolio.js -> src/pages/portfolio*.jsx

Assets:
- public/** (ex.: /favicon.svg, /images/...)
- src/assets/** (import direto em componentes)
```

- Entrada HTML e roots: `index.html` (`#root` e `#modal-root`).
- Roteamento: `src/App.jsx`.
- Layout global: `src/layouts/AppLayout.jsx` com `NavBar`, `Sidebar` e `Outlet`.
- Pages em `src/pages/**`; composição visual em `src/components/**`.
- Regras de domínio em `src/lib/**`; dataset em `src/data/**`; conteúdo editorial em `src/content/**`.
- Assets públicos em `public/**` e assets importados em `src/assets/**`.

## 2 Fluxos principais

### A Fluxo de rotas

```txt
URL -> src/App.jsx (Route)
    -> src/layouts/AppLayout.jsx (NavBar + Sidebar + Outlet)
    -> src/pages/** (página ativa)
    -> src/components/** (blocos de UI)
```

- As rotas ficam em `src/App.jsx`.
- A rota raiz usa `<Route element={<AppLayout />}>` em `src/App.jsx`.
- O `Outlet` em `src/layouts/AppLayout.jsx` decide qual página renderizar.
- Exemplos de páginas roteadas: `src/pages/home.jsx`, `src/pages/blog/BlogDashboard.jsx`, `src/pages/portfolio.jsx`.
- Componentes globais usados no layout: `src/components/NavBar.jsx` e `src/components/Sidebar.jsx`.

### B Fluxo do Blog

```txt
src/content/blog/*.md
  -> src/lib/blog/loadPosts.js (glob + parse + validação)
  -> src/pages/blog/*.jsx
  -> src/components/blog/*.jsx
```

- O loader lê markdown via `import.meta.glob` em `src/lib/blog/loadPosts.js`.
- Frontmatter e conteúdo são parseados no próprio loader (`src/lib/blog/loadPosts.js`).
- As páginas do blog consomem loader em `src/pages/blog/BlogDashboard.jsx`, `src/pages/blog/BlogCategory.jsx`, `src/pages/blog/BlogArticle.jsx`.
- Componentes de render do domínio blog ficam em `src/components/blog/*` (ex.: `PostCard.jsx`, `MarkdownContent.jsx`, `CategoryRail.jsx`).
- O fluxo evita parsing na page; a regra central fica em `src/lib/blog/loadPosts.js`.

### C Fluxo do Portfólio

```txt
src/data/portfolio.js
  -> src/pages/portfolio.jsx e src/pages/portfolioCategory.jsx
  -> Lightbox com createPortal(...)
  -> #modal-root (index.html)
```

- O dataset vem de `src/data/portfolio.js` (`portfolioData`).
- A listagem por categoria usa `src/pages/portfolio.jsx`.
- A página de categoria usa `src/pages/portfolioCategory.jsx`.
- O modal/lightbox usa `createPortal` em `src/pages/portfolio.jsx` e `src/pages/portfolioCategory.jsx`.
- O destino do portal é `#modal-root` em `index.html`.

## 3 Pontos de atenção

- `src/pages/Blog.jsx` existe, mas não está no mapa de rotas de `src/App.jsx`.
- `src/data/portfolio.js` referencia `/images/portfolio/...`, mas hoje não há esses arquivos em `public/images/portfolio/...` (em `public/` existe `public/images/blog/covers/placeholder-1.svg`).
