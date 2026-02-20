# 40.04 - Componentes do Modulo Blog

## Escopo
Este documento cobre todos os arquivos em `src/components/blog/`:
- `CategoryRail.jsx`
- `DotIndicator.jsx`
- `MarkdownContent.jsx`
- `PinnedGrid.jsx`
- `PostCard.jsx`
- `RailSkeleton.jsx`

Para cada componente:
- responsabilidade
- props/inputs inferidos do uso real
- dependencias
- onde e importado/usado
- exemplo de uso

## `CategoryRail` - `src/components/blog/CategoryRail.jsx`

## Responsabilidade
Renderizar um trilho horizontal de posts da categoria com:
- botoes anterior/proximo
- suporte de teclado (setas)
- suporte de wheel com `Shift`
- pagina atual por bolinhas (`DotIndicator`)

## Props/inputs
- `posts` (array, default `[]`) - `src/components/blog/CategoryRail.jsx:11`
- `categorySlug` (string) - `src/components/blog/CategoryRail.jsx:11`

## Dependencias
- React hooks: `useEffect`, `useRef`, `useState` (`src/components/blog/CategoryRail.jsx:1`)
- `PostCard` (`src/components/blog/CategoryRail.jsx:2`)
- `DotIndicator` (`src/components/blog/CategoryRail.jsx:3`)

## Importacao/uso
- Importado em `src/pages/blog/BlogDashboard.jsx:4`
- Usado em `src/pages/blog/BlogDashboard.jsx:122`

## Exemplo de uso
```jsx
<CategoryRail posts={categoryPosts} categorySlug={category.slug} />
```

## `DotIndicator` - `src/components/blog/DotIndicator.jsx`

## Responsabilidade
Mostrar bolinhas de paginacao e permitir selecao de pagina no trilho.

## Props/inputs
- `total` (number, default `0`) - `src/components/blog/DotIndicator.jsx:1`
- `active` (number, default `0`) - `src/components/blog/DotIndicator.jsx:1`
- `onSelect` (funcao) - `src/components/blog/DotIndicator.jsx:1`

## Dependencias
- Sem imports externos.

## Importacao/uso
- Importado em `src/components/blog/CategoryRail.jsx:3`
- Usado em `src/components/blog/CategoryRail.jsx:196`

## Exemplo de uso
```jsx
<DotIndicator total={totalPages} active={activePage} onSelect={handleSelectPage} />
```

## `MarkdownContent` - `src/components/blog/MarkdownContent.jsx`

## Responsabilidade
Renderizar conteudo markdown de artigo com suporte GFM.

## Props/inputs
- `content` (string, default `""`) - `src/components/blog/MarkdownContent.jsx:4`

## Dependencias
- `react-markdown` (`src/components/blog/MarkdownContent.jsx:1`)
- `remark-gfm` (`src/components/blog/MarkdownContent.jsx:2`)

## Importacao/uso
- Importado em `src/pages/blog/BlogArticle.jsx:3`
- Usado em `src/pages/blog/BlogArticle.jsx:99`

## Exemplo de uso
```jsx
<MarkdownContent content={post.content} />
```

## `PinnedGrid` - `src/components/blog/PinnedGrid.jsx`

## Responsabilidade
Renderizar bloco de destaques da categoria com ate 3 posts pinned:
- 1 principal (grande)
- 2 secundarios (pilha lateral)

Quando vazio, renderiza estado sem destaque.

## Props/inputs
- `posts` (array, default `[]`) - `src/components/blog/PinnedGrid.jsx:3`

## Dependencias
- `PostCard` (`src/components/blog/PinnedGrid.jsx:1`)

## Importacao/uso
- Importado em `src/pages/blog/BlogDashboard.jsx:5`
- Usado em `src/pages/blog/BlogDashboard.jsx:121`

## Exemplo de uso
```jsx
<PinnedGrid posts={pinnedPosts} />
```

## `PostCard` - `src/components/blog/PostCard.jsx`

## Responsabilidade
Card clicavel para navegar ao artigo e exibir:
- capa
- categoria e/ou data
- titulo
- resumo (opcional)

## Props/inputs
- `post` (objeto do loader)
- `variant` (`"default" | "featured" | "stacked" | "rail"`, default `"default"`) - `src/components/blog/PostCard.jsx:26`
- `className` (string, default `""`) - `src/components/blog/PostCard.jsx:26`
- `showCategory` (boolean, default `false`) - `src/components/blog/PostCard.jsx:26`

## Dependencias
- `Link` de `react-router-dom` (`src/components/blog/PostCard.jsx:1`)
- `categorySlugToTitle` (`src/components/blog/PostCard.jsx:2`)

## Importacao/uso
- Importado em `src/pages/blog/BlogDashboard.jsx:6`; usado em `src/pages/blog/BlogDashboard.jsx:77`
- Importado em `src/pages/blog/BlogCategory.jsx:3`; usado em `src/pages/blog/BlogCategory.jsx:64`
- Importado em `src/components/blog/PinnedGrid.jsx:1`; usado em `src/components/blog/PinnedGrid.jsx:19`, `src/components/blog/PinnedGrid.jsx:23-24`
- Importado em `src/components/blog/CategoryRail.jsx:2`; usado em `src/components/blog/CategoryRail.jsx:190`

## Exemplo de uso
```jsx
<PostCard key={post.slug} post={post} variant="default" showCategory />
```

## `RailSkeleton` - `src/components/blog/RailSkeleton.jsx`

## Responsabilidade
Renderizar skeleton visual do trilho de cards durante carregamento.

## Props/inputs
- `cards` (number, default `3`) - `src/components/blog/RailSkeleton.jsx:10`

## Dependencias
- Sem imports externos.

## Importacao/uso
- Importado em `src/pages/blog/BlogDashboard.jsx:7`
- Usado em `src/pages/blog/BlogDashboard.jsx:117`

## Exemplo de uso
```jsx
<RailSkeleton cards={3} />
```

## Componentes/funcoes internas sem uso por importacao externa

- `formatDate` em `src/components/blog/PostCard.jsx:4`
  - nao e importado externamente
  - uso interno em `src/components/blog/PostCard.jsx:63`
- `SkeletonBlock` em `src/components/blog/RailSkeleton.jsx:1`
  - nao e importado externamente
  - uso interno em `src/components/blog/RailSkeleton.jsx:13`, `src/components/blog/RailSkeleton.jsx:22-26`, `src/components/blog/RailSkeleton.jsx:33-35`
- `clamp` em `src/components/blog/CategoryRail.jsx:7`
  - nao e importado externamente
  - uso interno em `src/components/blog/CategoryRail.jsx:39`
