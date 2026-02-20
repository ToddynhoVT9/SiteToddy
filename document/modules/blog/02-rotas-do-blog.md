# 40.02 - Rotas do Blog

## Rotas declaradas

Fonte de verdade: `src/App.jsx:18-22`.

| Rota | Pagina | Importacao/uso no roteador | Regra de renderizacao |
|---|---|---|---|
| `/blog` | `BlogDashboard` (`src/pages/blog/BlogDashboard.jsx`) | import em `src/App.jsx:4`, uso em `src/App.jsx:19` | Renderiza dashboard com lista dos 15 ultimos e secoes por categoria. |
| `/blog/:categoria` | `BlogCategory` (`src/pages/blog/BlogCategory.jsx`) | import em `src/App.jsx:5`, uso em `src/App.jsx:20` | Busca posts da categoria; se lista vazia, renderiza estado "Categoria nao encontrada". |
| `/blog/:categoria/:slug` | `BlogArticle` (`src/pages/blog/BlogArticle.jsx`) | import em `src/App.jsx:6`, uso em `src/App.jsx:21` | Busca post por slug e valida categoria; se nao bater, renderiza "Artigo nao encontrado". |

## Como cada pagina decide o que renderizar

## `/blog` -> `BlogDashboard`
- Componente: `BlogDashboard` em `src/pages/blog/BlogDashboard.jsx:35`.
- Fontes de dados:
  - `latestPosts = getLatestPosts(15)` (`src/pages/blog/BlogDashboard.jsx:38`)
  - `categories = getAllCategories()` (`src/pages/blog/BlogDashboard.jsx:39`)
- Estados:
  - `isLoading` inicial `true` (`src/pages/blog/BlogDashboard.jsx:36`)
  - delay de 200ms para transicao de skeleton (`src/pages/blog/BlogDashboard.jsx:41-49`)
- Renderizacao:
  - enquanto carrega: `LatestGridSkeleton` e `RailSkeleton` (`src/pages/blog/BlogDashboard.jsx:72-74`, `src/pages/blog/BlogDashboard.jsx:117`)
  - apos carga: `PostCard`, `PinnedGrid`, `CategoryRail` (`src/pages/blog/BlogDashboard.jsx:77`, `src/pages/blog/BlogDashboard.jsx:121-122`)

Componentes/funcoes citados e uso/importacao:
- `getLatestPosts`, `getAllCategories`, `getPostsByCategory`, `getPinnedPostsByCategory` importados em `src/pages/blog/BlogDashboard.jsx:8-13`; usados em `src/pages/blog/BlogDashboard.jsx:38-39`, `src/pages/blog/BlogDashboard.jsx:85-86`.
- `PostCard` importado em `src/pages/blog/BlogDashboard.jsx:6`; usado em `src/pages/blog/BlogDashboard.jsx:77`.
- `PinnedGrid` importado em `src/pages/blog/BlogDashboard.jsx:5`; usado em `src/pages/blog/BlogDashboard.jsx:121`.
- `CategoryRail` importado em `src/pages/blog/BlogDashboard.jsx:4`; usado em `src/pages/blog/BlogDashboard.jsx:122`.
- `RailSkeleton` importado em `src/pages/blog/BlogDashboard.jsx:7`; usado em `src/pages/blog/BlogDashboard.jsx:117`.

## `/blog/:categoria` -> `BlogCategory`
- Componente: `BlogCategory` em `src/pages/blog/BlogCategory.jsx:12`.
- Parametro de rota:
  - `categoria` via `useParams` (`src/pages/blog/BlogCategory.jsx:13`)
- Regra principal:
  - busca posts por categoria e ordena por `updatedAt` desc (`src/pages/blog/BlogCategory.jsx:16-18`)
  - se `posts.length === 0`, renderiza fallback (`src/pages/blog/BlogCategory.jsx:23-42`)
  - senao renderiza grade de `PostCard` (`src/pages/blog/BlogCategory.jsx:61-66`)

Componentes/funcoes citados e uso/importacao:
- `getPostsByCategory` importado em `src/pages/blog/BlogCategory.jsx:5`; usado em `src/pages/blog/BlogCategory.jsx:16`.
- `categorySlugToTitle` importado em `src/pages/blog/BlogCategory.jsx:4`; usado em `src/pages/blog/BlogCategory.jsx:20`.
- `PostCard` importado em `src/pages/blog/BlogCategory.jsx:3`; usado em `src/pages/blog/BlogCategory.jsx:64`.

## `/blog/:categoria/:slug` -> `BlogArticle`
- Componente: `BlogArticle` em `src/pages/blog/BlogArticle.jsx:21`.
- Parametros de rota:
  - `categoria` e `slug` via `useParams` (`src/pages/blog/BlogArticle.jsx:22`)
- Regra principal:
  - normaliza parametros e dados para lowercase/trim (`src/pages/blog/BlogArticle.jsx:7-11`, `src/pages/blog/BlogArticle.jsx:23-24`)
  - busca por slug em todos os posts (`src/pages/blog/BlogArticle.jsx:27`)
  - valida se a categoria do post encontrado bate com `:categoria` (`src/pages/blog/BlogArticle.jsx:28-29`)
  - se falhar, fallback de artigo nao encontrado (`src/pages/blog/BlogArticle.jsx:31-50`)
  - se sucesso, renderiza metadata + markdown (`src/pages/blog/BlogArticle.jsx:54-110`)

Componentes/funcoes citados e uso/importacao:
- `getAllPosts` importado em `src/pages/blog/BlogArticle.jsx:5`; usado em `src/pages/blog/BlogArticle.jsx:27`.
- `categorySlugToTitle` importado em `src/pages/blog/BlogArticle.jsx:4`; usado em `src/pages/blog/BlogArticle.jsx:52`.
- `MarkdownContent` importado em `src/pages/blog/BlogArticle.jsx:3`; usado em `src/pages/blog/BlogArticle.jsx:99`.

## Arvore de decisao simplificada

```text
rota /blog?
  -> BlogDashboard

rota /blog/:categoria?
  -> posts = getPostsByCategory(categoria)
     posts vazio? sim -> fallback categoria nao encontrada
     posts vazio? nao -> grade de posts

rota /blog/:categoria/:slug?
  -> postBySlug = getAllPosts().find(slug)
  -> categoria bate? nao -> fallback artigo nao encontrado
  -> categoria bate? sim -> artigo completo
```
