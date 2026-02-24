# 04 - Blog: Fluxo de Dados

## Fonte

- `document/modules/blog/01-visao-geral-e-fluxo.md`
- `document/lib/api-interna.md`

## Diagrama 1 (flowchart)

```mermaid
flowchart TB
  FILE_md["FILE_md\nsrc/content/blog/*.md"]
  LIB_loadPosts["LIB_loadPosts\nload + parse (gray-matter) + normalizacao/validacao + cache"]
  LIB_categoryUtils["LIB_categoryUtils\ncategorySlugToTitle/humanizeCategorySlug"]

  PAGE_BlogDashboard["PAGE_BlogDashboard\nsrc/pages/blog/BlogDashboard.jsx"]
  PAGE_BlogCategory["PAGE_BlogCategory\nsrc/pages/blog/BlogCategory.jsx"]
  PAGE_BlogArticle["PAGE_BlogArticle\nsrc/pages/blog/BlogArticle.jsx"]

  CMP_CategoryRail["CMP_CategoryRail"]
  CMP_PostCard["CMP_PostCard"]
  CMP_PinnedGrid["CMP_PinnedGrid"]
  CMP_MarkdownContent["CMP_MarkdownContent"]
  CMP_RailSkeleton["CMP_RailSkeleton"]

  FILE_md --> LIB_loadPosts
  LIB_loadPosts --> PAGE_BlogDashboard
  LIB_loadPosts --> PAGE_BlogCategory
  LIB_loadPosts --> PAGE_BlogArticle

  LIB_categoryUtils --> PAGE_BlogCategory
  LIB_categoryUtils --> PAGE_BlogArticle
  LIB_categoryUtils --> CMP_PostCard

  PAGE_BlogDashboard --> CMP_CategoryRail
  PAGE_BlogDashboard --> CMP_PostCard
  PAGE_BlogDashboard --> CMP_PinnedGrid
  PAGE_BlogDashboard --> CMP_RailSkeleton

  PAGE_BlogCategory --> CMP_PostCard
  PAGE_BlogArticle --> CMP_MarkdownContent
```

## Diagrama 2 (sequenceDiagram)

```mermaid
sequenceDiagram
  participant UI_User as UI_User
  participant PAGE_BlogArticle as PAGE_BlogArticle
  participant LIB_loadPosts as LIB_loadPosts
  participant DATA_Post as DATA_Post
  participant CMP_MarkdownContent as CMP_MarkdownContent

  UI_User->>PAGE_BlogArticle: abre /blog/:categoria/:slug
  PAGE_BlogArticle->>LIB_loadPosts: getAllPosts()
  LIB_loadPosts-->>DATA_Post: retorna colecao de posts
  PAGE_BlogArticle->>DATA_Post: encontra post pelo slug da rota
  PAGE_BlogArticle->>CMP_MarkdownContent: passa content como props
  CMP_MarkdownContent-->>UI_User: renderiza artigo
```

## Contratos

- `getAllPosts()`:
  - Retorna array de posts (copia rasa), com campos de frontmatter/conteudo normalizados (ex.: `title`, `slug`, `category`, `updatedAt`, `summary`, `cover`, `tags`, `pinned`, `content`, `file`).
- `getAllCategories()`:
  - Retorna array de categorias no formato alto nivel `{ slug, name, count }`.
- `getPostsByCategory(categorySlug)`:
  - Retorna array de posts filtrado pela categoria normalizada.
- `getPinnedPostsByCategory(categorySlug, limit = 3)`:
  - Retorna array de posts `pinned` da categoria, respeitando limite efetivo maximo de 3.
- `getLatestPosts(limit)`:
  - Retorna os N posts mais recentes do cache (ordenados por `updatedAt` desc).
- `categorySlugToTitle` (alias de `humanizeCategorySlug`):
  - Recebe slug e retorna titulo amigavel para exibicao.

## Notas

- No fluxo atual da pagina de artigo, a busca por slug e feita sobre `getAllPosts()`; nao ha export documentado como `getPostBySlug()`.
- `LIB_categoryUtils` aparece como etapa complementar porque e consumida por paginas/componentes no fluxo de exibicao.
