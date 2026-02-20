# 40.01 - Visao Geral e Fluxo

## O que existe hoje no Blog

O modulo de blog em producao no app possui 3 telas roteadas:

- Dashboard: `src/pages/blog/BlogDashboard.jsx`
- Categoria: `src/pages/blog/BlogCategory.jsx`
- Artigo: `src/pages/blog/BlogArticle.jsx`

Uso/importacao das paginas no roteador:

- `BlogDashboard` importado em `src/App.jsx:4`; usado em `src/App.jsx:19`.
- `BlogCategory` importado em `src/App.jsx:5`; usado em `src/App.jsx:20`.
- `BlogArticle` importado em `src/App.jsx:6`; usado em `src/App.jsx:21`.

Existe tambem uma pagina auxiliar:

- `src/pages/Blog.jsx` (sanity check)
  - Nao encontrado uso direto nas rotas atuais de `src/App.jsx`.

## Fluxo de dados do Blog

Fluxo atual, do conteudo ate a renderizacao:

```text
src/content/blog/*.md
        |
        v
src/lib/blog/loadPosts.js + src/lib/blog/categoryUtils.js
        |
        v
src/pages/blog/*
        |
        v
src/components/blog/*
```

### Passo a passo

1. Arquivos markdown sao lidos com `import.meta.glob` em `src/lib/blog/loadPosts.js:7-10`.
2. Cada markdown e parseado por `gray-matter` em `src/lib/blog/loadPosts.js:76`.
3. O loader normaliza e valida os posts (`src/lib/blog/loadPosts.js:71-92`, `src/lib/blog/loadPosts.js:94-118`).
4. As paginas consomem funcoes exportadas do loader:
   - Dashboard usa `getLatestPosts`, `getAllCategories`, `getPostsByCategory`, `getPinnedPostsByCategory` (import em `src/pages/blog/BlogDashboard.jsx:8-13`, uso em `src/pages/blog/BlogDashboard.jsx:38-39`, `src/pages/blog/BlogDashboard.jsx:85-86`).
   - Categoria usa `getPostsByCategory` (import em `src/pages/blog/BlogCategory.jsx:5`, uso em `src/pages/blog/BlogCategory.jsx:16`).
   - Artigo usa `getAllPosts` (import em `src/pages/blog/BlogArticle.jsx:5`, uso em `src/pages/blog/BlogArticle.jsx:27`).
5. As paginas renderizam componentes do modulo:
   - Dashboard: `PostCard`, `PinnedGrid`, `CategoryRail`, `RailSkeleton` (imports em `src/pages/blog/BlogDashboard.jsx:4-7`; uso em `src/pages/blog/BlogDashboard.jsx:77`, `src/pages/blog/BlogDashboard.jsx:117`, `src/pages/blog/BlogDashboard.jsx:121-122`).
   - Categoria: `PostCard` (import em `src/pages/blog/BlogCategory.jsx:3`; uso em `src/pages/blog/BlogCategory.jsx:64`).
   - Artigo: `MarkdownContent` (import em `src/pages/blog/BlogArticle.jsx:3`; uso em `src/pages/blog/BlogArticle.jsx:99`).

## Funcao de utilidade de categoria no fluxo

- `categorySlugToTitle` (alias) e exportado em `src/lib/blog/categoryUtils.js:30`.
  - Importado em `src/pages/blog/BlogArticle.jsx:4`; usado em `src/pages/blog/BlogArticle.jsx:52`.
  - Importado em `src/pages/blog/BlogCategory.jsx:4`; usado em `src/pages/blog/BlogCategory.jsx:20`.
  - Importado em `src/components/blog/PostCard.jsx:2`; usado em `src/components/blog/PostCard.jsx:61`.

## Diagrama de relacionamento (pagina -> componentes)

```text
BlogDashboard
├─ PostCard
├─ PinnedGrid
│  └─ PostCard
├─ CategoryRail
│  ├─ PostCard
│  └─ DotIndicator
└─ RailSkeleton

BlogCategory
└─ PostCard

BlogArticle
└─ MarkdownContent
```
