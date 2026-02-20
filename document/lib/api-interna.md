# API Interna (src/lib e src/data)

## Objetivo

Documentar as APIs internas atualmente expostas em `src/lib/**` e `src/data/**`, com contrato (entrada/saida), regras observadas no codigo e rastreio de uso real no projeto.

## Mapa rapido

- [src/lib/blog/loadPosts.js](#1-srclibblogloadpostsjs)
- [src/lib/blog/categoryUtils.js](#2-srclibblogcategoryutilsjs)
- [src/data/portfolio.js](#3-srcdataportfoliojs)
- [Dependencias de parsing/render](#4-dependencias-de-parsingrender)
- [Pontos de atencao](#5-pontos-de-atencao)

## 1) src/lib/blog/loadPosts.js

### Resumo do papel do arquivo

`src/lib/blog/loadPosts.js` centraliza a leitura dos markdowns do blog (`src/content/blog/*.md`), normalizacao de frontmatter, validacoes, cache em memoria e funcoes de consulta para as paginas do blog.

### Exportacao: `getAllPosts()`

- Assinatura: `getAllPosts()`
- Entrada:
  - Nao recebe parametros.
- Saida:
  - Retorna um array (copia rasa) de posts.
  - Cada post e um objeto com campos observados em `src/lib/blog/loadPosts.js:80-90`:
    - `title` (string)
    - `slug` (string)
    - `category` (string)
    - `updatedAt` (objeto `Date`)
    - `summary` (string)
    - `cover` (string, pode ser `""`)
    - `tags` (array de strings)
    - `pinned` (boolean)
    - `content` (string)
    - `file` (string com caminho do modulo markdown)
- Regras/validacoes relevantes:
  - No primeiro acesso, o cache e montado via `buildCache()` (`src/lib/blog/loadPosts.js:171-174`).
  - Campos obrigatorios de frontmatter sao validados antes do retorno (`src/lib/blog/loadPosts.js:4`, `:46-57`).
  - `updatedAt` invalido gera erro (`src/lib/blog/loadPosts.js:59-69`).
  - Slug duplicado gera erro (`src/lib/blog/loadPosts.js:94-118`).
- Efeitos colaterais:
  - Pode disparar `console.warn` indiretamente na montagem do cache quando ha excesso de `pinned` por categoria (`src/lib/blog/loadPosts.js:120-157`).
  - Pode lancar `Error` na montagem do cache (campos obrigatorios, data invalida, slug duplicado).
- Onde e usado:
  - `src/pages/blog/BlogArticle.jsx:5` (import) e `src/pages/blog/BlogArticle.jsx:27` (busca por slug para montar artigo).
  - `src/pages/Blog.jsx:2` (import) e `src/pages/Blog.jsx:5` (sanity check local da pagina).
- Notas:
  - O array retornado e novo (`[...]`), mas os objetos internos sao as mesmas referencias do cache.

### Exportacao: `getAllCategories()`

- Assinatura: `getAllCategories()`
- Entrada:
  - Nao recebe parametros.
- Saida:
  - Retorna array de objetos no formato:
    - `slug` (string)
    - `name` (string; resultado de `humanizeCategorySlug(slug)`)
    - `count` (numero de posts da categoria)
- Regras/validacoes relevantes:
  - Usa os posts do cache (`src/lib/blog/loadPosts.js:186-189`).
  - Ordena por `slug` com `localeCompare` (`src/lib/blog/loadPosts.js:197`).
- Efeitos colaterais:
  - Mesmo comportamento de primeira montagem do cache (pode warn/erro na primeira chamada).
- Onde e usado:
  - `src/pages/blog/BlogDashboard.jsx:9` (import) e `src/pages/blog/BlogDashboard.jsx:39` (lista categorias no dashboard).
  - `src/pages/Blog.jsx:2` (import) e `src/pages/Blog.jsx:6` (sanity check local da pagina).
- Notas:
  - Depende de `humanizeCategorySlug` de `src/lib/blog/categoryUtils.js` (`src/lib/blog/loadPosts.js:2`, `:194`).

### Exportacao: `getPostsByCategory(categorySlug)`

- Assinatura: `getPostsByCategory(categorySlug)`
- Entrada:
  - `categorySlug`: valor convertido para string e comparado em lowercase/trim via `normalizeCategorySlug` (`src/lib/blog/loadPosts.js:15-19`, `:201`).
- Saida:
  - Retorna array de posts filtrado pela categoria (mesmo shape de `getAllPosts()`).
- Regras/validacoes relevantes:
  - Filtro case-insensitive por categoria (`src/lib/blog/loadPosts.js:203-205`).
- Efeitos colaterais:
  - Sem efeitos diretos alem da possivel primeira montagem do cache.
- Onde e usado:
  - `src/pages/blog/BlogDashboard.jsx:12` (import) e `src/pages/blog/BlogDashboard.jsx:85` (trilho por categoria).
  - `src/pages/blog/BlogCategory.jsx:5` (import) e `src/pages/blog/BlogCategory.jsx:16` (lista da rota `/blog/:categoria`).
- Notas:
  - A ordenacao adicional da tela de categoria ocorre na pagina (`src/pages/blog/BlogCategory.jsx:17-18`).

### Exportacao: `getPinnedPostsByCategory(categorySlug, limit = 3)`

- Assinatura: `getPinnedPostsByCategory(categorySlug, limit = 3)`
- Entrada:
  - `categorySlug`: mesma normalizacao de categoria (trim/lowercase).
  - `limit`: numero opcional; passa por `normalizeLimit` (`src/lib/blog/loadPosts.js:21-33`) e depois e limitado por `MAX_PINNED_PER_CATEGORY` (`src/lib/blog/loadPosts.js:5`, `:211`).
- Saida:
  - Retorna array de posts com `pinned === true` naquela categoria, limitado ao maximo de 3 itens.
- Regras/validacoes relevantes:
  - Se `limit` for invalido/<=0, retorna array vazio por causa de `slice(0, 0)`.
  - Mesmo com limite maior, o teto atual e 3 (`MAX_PINNED_PER_CATEGORY`).
- Efeitos colaterais:
  - Sem efeitos diretos alem da possivel primeira montagem do cache.
- Onde e usado:
  - `src/pages/blog/BlogDashboard.jsx:11` (import) e `src/pages/blog/BlogDashboard.jsx:86` (grid de destaque por categoria).
- Notas:
  - O warning de overflow de pinned por categoria e emitido na montagem do cache (`src/lib/blog/loadPosts.js:151-154`).

### Exportacao: `getLatestPosts(limit)`

- Assinatura: `getLatestPosts(limit)`
- Entrada:
  - `limit`: opcional; normalizado por `normalizeLimit` com fallback para total de posts (`src/lib/blog/loadPosts.js:220`).
- Saida:
  - Retorna os primeiros N posts do cache ordenado por `updatedAt` desc (ordenacao feita em `buildCache`, `src/lib/blog/loadPosts.js:163`).
- Regras/validacoes relevantes:
  - Se `limit` indefinido, retorna todos.
  - Se `limit` invalido/<=0, retorna array vazio.
- Efeitos colaterais:
  - Sem efeitos diretos alem da possivel primeira montagem do cache.
- Onde e usado:
  - `src/pages/blog/BlogDashboard.jsx:10` (import) e `src/pages/blog/BlogDashboard.jsx:38` (carrega os 15 mais recentes).
- Notas:
  - A pagina usa `getLatestPosts(15)` explicitamente (`src/pages/blog/BlogDashboard.jsx:38`).

## 2) src/lib/blog/categoryUtils.js

### Resumo do papel do arquivo

`src/lib/blog/categoryUtils.js` concentra utilitarios de slug/categoria para exibicao humana e normalizacao de texto.

### Exportacao: `humanizeCategorySlug(slug)`

- Assinatura: `humanizeCategorySlug(slug)`
- Entrada:
  - `slug`: esperado como string; valores nao string retornam `""`.
- Saida:
  - String com palavras separadas por espaco e inicial maiuscula.
  - Exemplo de contrato: `"engenharia-de-software"` -> `"Engenharia De Software"`.
- Regras/validacoes relevantes:
  - `trim`, `split("-")`, remove vazios, capitaliza primeira letra de cada palavra (`src/lib/blog/categoryUtils.js:6-11`).
- Efeitos colaterais:
  - Nenhum observado.
- Onde e usado:
  - `src/lib/blog/loadPosts.js:2` (import) e `src/lib/blog/loadPosts.js:194` (nome amigavel em `getAllCategories`).
- Notas:
  - Tambem e base do alias exportado como `categorySlugToTitle` (`src/lib/blog/categoryUtils.js:30`).

### Exportacao: `slugify(text)`

- Assinatura: `slugify(text)`
- Entrada:
  - `text`: esperado como string; valores nao string retornam `""`.
- Saida:
  - String normalizada para slug ASCII (minusculo, sem acento, sem simbolos fora de `[a-z0-9 -]`, com hifen entre palavras).
- Regras/validacoes relevantes:
  - Remove diacriticos com `normalize("NFD")` + regex (`src/lib/blog/categoryUtils.js:20-21`).
  - Colapsa espacos/hifens repetidos (`src/lib/blog/categoryUtils.js:25-26`).
- Efeitos colaterais:
  - Nenhum observado.
- Onde e usado:
  - Nao encontrado uso direto no `src/`.
- Notas:
  - Export disponivel para uso futuro, mas sem consumidor atual.

### Exportacao: `categorySlugToTitle` (alias)

- Assinatura: `categorySlugToTitle(slug)` (alias de `humanizeCategorySlug` em `src/lib/blog/categoryUtils.js:30`).
- Entrada:
  - Mesmo contrato de `humanizeCategorySlug(slug)`.
- Saida:
  - Mesmo contrato de `humanizeCategorySlug(slug)`.
- Regras/validacoes relevantes:
  - Alias de compatibilidade indicado no proprio arquivo (`src/lib/blog/categoryUtils.js:29-30`).
- Efeitos colaterais:
  - Nenhum observado.
- Onde e usado:
  - `src/pages/blog/BlogCategory.jsx:4` (import) e `src/pages/blog/BlogCategory.jsx:20` (titulo da categoria).
  - `src/pages/blog/BlogArticle.jsx:4` (import) e `src/pages/blog/BlogArticle.jsx:52` (titulo da categoria do artigo).
  - `src/components/blog/PostCard.jsx:2` (import) e `src/components/blog/PostCard.jsx:61` (label de categoria no card).
- Notas:
  - O projeto usa o alias em paginas/componentes, enquanto `loadPosts` usa `humanizeCategorySlug` diretamente.

## 3) src/data/portfolio.js

### Resumo do papel do arquivo

`src/data/portfolio.js` expoe o dataset estatico do portfolio, consumido pelas paginas de listagem e categoria.

### Exportacao: `portfolioData`

- Assinatura (export): `export const portfolioData = [...]`
- Entrada:
  - Nao recebe parametros (constante estatica).
- Saida/contrato:
  - Array de categorias.
  - Cada categoria observada tem:
    - `title` (string)
    - `slug` (string)
    - `items` (array)
  - Cada item de `items` observado tem:
    - `id` (string)
    - `src` (string; caminho absoluto em `/images/portfolio/...`)
    - `alt` (string)
    - `description` (string)
- Regras/validacoes relevantes:
  - Nao ha validacao no arquivo de dados.
  - O contrato e assumido pelos consumidores (`src/pages/portfolio.jsx` e `src/pages/portfolioCategory.jsx`).
- Efeitos colaterais:
  - Nenhum observado.
- Onde e usado:
  - `src/pages/portfolio.jsx:4` (import) e `src/pages/portfolio.jsx:166-169` (mapeia categorias e cria `previewItems`).
  - `src/pages/portfolioCategory.jsx:4` (import) e `src/pages/portfolioCategory.jsx:132` (resolve categoria por slug).
- Notas:
  - As paginas dependem de `category.items.length`, `item.id`, `item.src`, `item.alt`, `item.description` (ex.: `src/pages/portfolio.jsx:214`, `:229-233`; `src/pages/portfolioCategory.jsx:199-226`).

## 4) Dependencias de parsing/render

Dependencias observadas nos arquivos de dominio documentados:

- `gray-matter` em `src/lib/blog/loadPosts.js:1`
  - Uso: parse de frontmatter e conteudo markdown (`src/lib/blog/loadPosts.js:76`).
- `import.meta.glob` em `src/lib/blog/loadPosts.js:7-10`
  - Uso: carregar `src/content/blog/*.md` de forma eager e como texto bruto (`as: "raw"`).

Observacao:
- Nao ha dependencia de renderizacao (como `react-markdown`) dentro de `src/lib/**` e `src/data/**`; isso ocorre em componentes/paginas (ex.: `src/components/blog/MarkdownContent.jsx`).

## 5) Pontos de atencao

1. `slugify(text)` (`src/lib/blog/categoryUtils.js:14`) esta exportada, mas sem uso direto encontrado no `src/`.
2. `getAllPosts()` e `getAllCategories()` tambem sao usados em `src/pages/Blog.jsx:2`, mas essa pagina nao esta nas rotas declaradas em `src/App.jsx:14-31`.
3. O contrato de post retorna `updatedAt` como `Date` (nao string), o que e relevante para consumidores que chamam `getTime()`/`toISOString()` (ex.: `src/components/blog/PostCard.jsx:63`, `src/pages/blog/BlogCategory.jsx:18`).
4. `portfolioData` referencia caminhos `/images/portfolio/...` (`src/data/portfolio.js`), e esses arquivos precisam existir em `public/images/portfolio/...` para evitar imagem quebrada em runtime.
