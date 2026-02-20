# Convencoes e Padroes

## Objetivo

Este documento consolida padroes que **ja existem no repositorio** (sem propor arquitetura nova).

Referencias principais:
- `src/App.jsx`
- `src/layouts/AppLayout.jsx`
- `src/pages/**`
- `src/components/**`
- `src/components/blog/**`
- `src/lib/blog/loadPosts.js`
- `src/lib/blog/categoryUtils.js`
- `src/data/portfolio.js`
- `src/content/blog/*.md`
- `public/`
- `package.json`

## 1) Organizacao de pastas e responsabilidade

### `src/pages/`
Responsavel por paginas roteadas (camada de tela).

Exemplos reais:
- `src/pages/home.jsx`
- `src/pages/blog/BlogDashboard.jsx`
- `src/pages/portfolio.jsx`

### `src/components/`
Responsavel por componentes reutilizaveis de interface.

Exemplos reais:
- `src/components/NavBar.jsx`
- `src/components/Sidebar.jsx`
- `src/components/form.jsx`

### `src/components/blog/`
Subconjunto de componentes do dominio Blog.

Exemplos reais:
- `src/components/blog/PostCard.jsx`
- `src/components/blog/MarkdownContent.jsx`
- `src/components/blog/CategoryRail.jsx`

### `src/layouts/`
Estruturas de layout compartilhadas entre rotas.

Exemplo real:
- `src/layouts/AppLayout.jsx`

### `src/lib/`
Funcoes de dominio/utilitarios com regra de negocio.

Exemplos reais:
- `src/lib/blog/loadPosts.js`
- `src/lib/blog/categoryUtils.js`

### `src/data/`
Dados estaticos usados por modulos.

Exemplo real:
- `src/data/portfolio.js`

### `src/content/`
Conteudo em Markdown (fonte de dados de blog).

Exemplo real:
- `src/content/blog/*.md`

## 2) Padrao de rotas (React Router + AppLayout + Outlet)

A aplicacao usa `BrowserRouter` em `src/main.jsx:17-19`, e as rotas sao declaradas em `src/App.jsx:14-31`.

Trecho real (`src/App.jsx:15-21`):

```jsx
<Route element={<AppLayout />}>
  <Route index element={<Home />} />
  <Route path="blog">
    <Route index element={<BlogDashboard />} />
    <Route path=":categoria" element={<BlogCategory />} />
  </Route>
</Route>
```

`AppLayout` injeta `Navbar`, `Sidebar` e `Outlet` (`src/layouts/AppLayout.jsx:8-20`), definindo o shell global.

Trecho real (`src/layouts/AppLayout.jsx:8-19`):

```jsx
<Navbar />
...
<Sidebar />
...
<Outlet />
```

## 3) Padrao de componentes

## Forma geral observada

- Predominio de `export default function ...`.
- Props simples e explicitas.
- Estilizacao com classes Tailwind inline.

Exemplo real de props (`src/components/form.jsx:1`):

```jsx
export default function Form({ placeholder, id, name, type = "text" }) {
```

## Variants por objeto de estilo

No blog, `PostCard` usa `variant` para trocar classe sem duplicar componente (`src/components/blog/PostCard.jsx:12-24`, `:26-33`).

Trecho real:

```jsx
const variantStyles = {
  default: "min-h-[360px] p-4",
  featured: "h-full min-h-[460px] p-6",
  stacked: "min-h-[260px] p-4",
  rail: "min-h-[300px] p-4",
};
```

Uso real de variantes:
- `variant="default"` em `src/pages/blog/BlogDashboard.jsx:77`
- `variant="featured"` e `variant="stacked"` em `src/components/blog/PinnedGrid.jsx:19` e `:23-24`
- `variant="rail"` em `src/components/blog/CategoryRail.jsx:190`

## Dependencias de componente por dominio

`MarkdownContent` encapsula markdown renderer (`react-markdown` + `remark-gfm`) em `src/components/blog/MarkdownContent.jsx:1-8`.
Uso direto encontrado em `src/pages/blog/BlogArticle.jsx:3` e `:99`.

## 4) Padrao de conteudo do blog (frontmatter)

O loader do blog le markdown de `src/content/blog/*.md` com `import.meta.glob(..., { eager: true, as: "raw" })` em `src/lib/blog/loadPosts.js:7-10`.

Campos obrigatorios lidos/validados (`src/lib/blog/loadPosts.js:4`):
- `title`
- `slug`
- `category`
- `updatedAt`
- `summary`

Campos opcionais lidos (`src/lib/blog/loadPosts.js:86-88`):
- `cover`
- `tags`
- `pinned`

Trecho real de frontmatter (`src/content/blog/engenharia-ci-deterministico.md:1-10`):

```md
---
title: "CI deterministico para times pequenos"
slug: "ci-deterministico-times-pequenos"
category: "engenharia"
updatedAt: "2026-02-18"
summary: "Como reduzir variacao entre ambientes..."
cover: "/images/blog/covers/placeholder-1.svg"
tags: ["ci", "qualidade"]
pinned: true
---
```

Regras aplicadas no loader:
- `updatedAt` precisa ser data valida (`src/lib/blog/loadPosts.js:59-69`).
- `slug` duplicado gera erro (`src/lib/blog/loadPosts.js:94-118`).
- `pinned` por categoria e limitado a 3 no consumo (`src/lib/blog/loadPosts.js:5`, `:208-216`).

## 5) Padrao de assets (`public/` vs `src/assets`)

## Assets em `src/assets`
Usados via import no bundle Vite.

Exemplo real (`src/components/NavBar.jsx:2`):

```jsx
import logo from "../assets/logo.png";
```

## Assets em `public/`
Referenciados por caminho absoluto (prefixo `/`).

Exemplos reais:
- Favicon em `index.html:6` -> `href="/favicon.svg"`
- Covers/posts em markdown -> `/images/blog/covers/...`
- Portfolio data usa `/images/portfolio/...` em `src/data/portfolio.js:8` etc.

Estado atual observavel em `public/`:
- `public/favicon.svg`
- `public/images/blog/covers/placeholder-1.svg`

## 6) Como adicionar um novo post

1. Criar arquivo markdown em `src/content/blog/`.
2. Preencher frontmatter com os campos obrigatorios (`title`, `slug`, `category`, `updatedAt`, `summary`).
3. Opcionalmente preencher `cover`, `tags`, `pinned`.
4. Garantir `slug` unico entre todos os posts (regra do loader em `src/lib/blog/loadPosts.js:94-118`).
5. Abrir `/blog` e validar se o post aparece no dashboard/categoria/artigo.

Exemplo minimo:

```md
---
title: "Titulo do post"
slug: "titulo-do-post"
category: "engenharia"
updatedAt: "2026-02-19"
summary: "Resumo curto."
---

Conteudo do artigo...
```

## 7) Como adicionar uma nova categoria do portfolio

1. Adicionar novo objeto em `portfolioData` (`src/data/portfolio.js`) com `title`, `slug` e `items`.
2. Em cada item, manter `id`, `src`, `alt`, `description` (shape atual observado em `src/data/portfolio.js:6-11`).
3. Garantir que os arquivos de imagem existam em `public/images/portfolio/<slug>/...` para bater com `src`.
4. Validar:
- lista de categorias em `/portfolio` (render em `src/pages/portfolio.jsx:206-241`)
- rota dinamica `/portfolio/:categoria` (resolucao em `src/pages/portfolioCategory.jsx:131-134`)

Observacao: a rota da categoria ja existe (`src/App.jsx:29`), entao adicionar categoria no dado ja habilita navegacao para o novo slug.

## 8) Checklist rapido antes de commitar

1. Rodar build: `npm run build` (script em `package.json:8`).
2. (Opcional, mas recomendado) rodar lint: `npm run lint` (`package.json:9`).
3. Validar rotas principais no navegador: `/`, `/blog`, `/blog/<categoria>`, `/portfolio`, `/portfolio/<categoria>`.
4. Para post novo:
- frontmatter completo (campos obrigatorios)
- `slug` unico
- `updatedAt` valido (`YYYY-MM-DD`)
- `cover` existente em `public/` quando definido.
5. Para portfolio:
- cada `src` aponta para arquivo realmente presente em `public/images/portfolio/...`.
6. Revisar links internos (`Link`/`NavLink`) para evitar caminho quebrado.
