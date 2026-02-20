# 40.03 - Contratos de Conteudo Markdown

## Fonte e carregamento de conteudo

O loader do blog usa:
- `import.meta.glob("../../content/blog/*.md", { eager: true, as: "raw" })` em `src/lib/blog/loadPosts.js:7-10`.

Isso define que a fonte do conteudo e:
- `src/content/blog/*.md`

Nao ha outra fonte de conteudo no modulo.

## Frontmatter lido pelo codigo

Campos obrigatorios (validados por `REQUIRED_FIELDS`):
- `title`
- `slug`
- `category`
- `updatedAt`
- `summary`

Referencias:
- `REQUIRED_FIELDS` em `src/lib/blog/loadPosts.js:4`
- validacao em `src/lib/blog/loadPosts.js:46-57`

Campos opcionais (lidos com fallback):
- `cover` -> string, fallback `""` (`src/lib/blog/loadPosts.js:86`)
- `tags` -> array de string normalizada; fallback `[]` (`src/lib/blog/loadPosts.js:35-44`, `src/lib/blog/loadPosts.js:87`)
- `pinned` -> boolean via `Boolean(data.pinned)`; fallback `false` (`src/lib/blog/loadPosts.js:88`)

Corpo markdown:
- lido de `content` e normalizado com `trim()` (`src/lib/blog/loadPosts.js:76`, `src/lib/blog/loadPosts.js:89`)

## Contrato do post normalizado (saida do loader)

O objeto criado em `normalizePost` tem shape:

```ts
type BlogPost = {
  title: string;
  slug: string;
  category: string;
  updatedAt: Date;
  summary: string;
  cover: string;      // opcional no frontmatter, sempre string na saida
  tags: string[];     // opcional no frontmatter, sempre array na saida
  pinned: boolean;    // opcional no frontmatter, sempre boolean na saida
  content: string;    // corpo markdown sem frontmatter
  file: string;       // caminho do arquivo origem
}
```

Referencia de criacao:
- `src/lib/blog/loadPosts.js:80-91`.

## Regras e validacoes aplicadas

## 1) Campos obrigatorios
- Falta de campo obrigatorio gera erro:
  - `Blog loader: missing required fields ...`
  - `src/lib/blog/loadPosts.js:56`.

## 2) Data (`updatedAt`)
- Parse em `new Date(value)` (`src/lib/blog/loadPosts.js:60`).
- Data invalida gera erro (`src/lib/blog/loadPosts.js:62-65`).

## 3) Unicidade de slug
- Checagem global (nao por categoria) com normalizacao lowercase/trim:
  - normalizacao em `normalizeCategorySlug` (`src/lib/blog/loadPosts.js:15-19`)
  - checagem em `assertUniqueSlugs` (`src/lib/blog/loadPosts.js:94-118`)
- Em duplicidade, gera erro com lista de arquivos.

## 4) Pinned overflow por categoria
- Limite maximo por categoria: `MAX_PINNED_PER_CATEGORY = 3` (`src/lib/blog/loadPosts.js:5`).
- Se houver mais de 3 pinned na categoria:
  - emite `console.warn` uma vez (`src/lib/blog/loadPosts.js:120-158`).
  - `getPinnedPostsByCategory` limita o retorno a 3 (`src/lib/blog/loadPosts.js:208-216`).

## 5) Ordenacao base
- Cache principal e ordenado por `updatedAt` desc em `buildCache` (`src/lib/blog/loadPosts.js:160-164`).

## Contratos das funcoes exportadas (`loadPosts.js`)

## `getAllPosts()`
- Definicao: `src/lib/blog/loadPosts.js:179-181`
- Entrada: nenhuma
- Saida: `BlogPost[]` (copia superficial do cache)
- Uso/importacao:
  - Importada em `src/pages/blog/BlogArticle.jsx:5`; usada em `src/pages/blog/BlogArticle.jsx:27`.
  - Importada em `src/pages/Blog.jsx:2`; usada em `src/pages/Blog.jsx:5`.

## `getAllCategories()`
- Definicao: `src/lib/blog/loadPosts.js:183-198`
- Entrada: nenhuma
- Saida: `Array<{ slug: string; name: string; count: number }>`
- Regra: `name` vem de `humanizeCategorySlug`.
- Uso/importacao:
  - Importada em `src/pages/blog/BlogDashboard.jsx:9`; usada em `src/pages/blog/BlogDashboard.jsx:39`.
  - Importada em `src/pages/Blog.jsx:2`; usada em `src/pages/Blog.jsx:6`.

## `getPostsByCategory(categorySlug)`
- Definicao: `src/lib/blog/loadPosts.js:200-206`
- Entrada: `categorySlug` (string)
- Saida: `BlogPost[]` filtrado por categoria normalizada (trim + lowercase)
- Uso/importacao:
  - Importada em `src/pages/blog/BlogCategory.jsx:5`; usada em `src/pages/blog/BlogCategory.jsx:16`.
  - Importada em `src/pages/blog/BlogDashboard.jsx:12`; usada em `src/pages/blog/BlogDashboard.jsx:85`.

## `getPinnedPostsByCategory(categorySlug, limit = 3)`
- Definicao: `src/lib/blog/loadPosts.js:208-216`
- Entrada:
  - `categorySlug` (string)
  - `limit` (number opcional)
- Saida: `BlogPost[]` filtrado por pinned e categoria, limitado ao teto `MAX_PINNED_PER_CATEGORY`
- Uso/importacao:
  - Importada em `src/pages/blog/BlogDashboard.jsx:11`; usada em `src/pages/blog/BlogDashboard.jsx:86`.

## `getLatestPosts(limit)`
- Definicao: `src/lib/blog/loadPosts.js:218-223`
- Entrada: `limit` (number opcional)
- Saida: primeiros N do cache (ja ordenado por `updatedAt` desc)
- Uso/importacao:
  - Importada em `src/pages/blog/BlogDashboard.jsx:10`; usada em `src/pages/blog/BlogDashboard.jsx:38`.

## Regras de slug/categoria (`categoryUtils.js`)

## `humanizeCategorySlug(slug)`
- Definicao: `src/lib/blog/categoryUtils.js:1-12`
- Comportamento:
  - `trim`
  - `split("-")`
  - capitaliza cada palavra
  - une por espaco
- Uso/importacao:
  - Importada em `src/lib/blog/loadPosts.js:2`; usada em `src/lib/blog/loadPosts.js:194`.

## `slugify(text)`
- Definicao: `src/lib/blog/categoryUtils.js:14-27`
- Comportamento:
  - remove acentos (`normalize("NFD")` + regex)
  - lowercase
  - remove caracteres invalidos
  - transforma espacos em `-`
- Uso/importacao:
  - Nao encontrado uso direto.

## `categorySlugToTitle` (alias)
- Definicao: `src/lib/blog/categoryUtils.js:30`
- Alias direto de `humanizeCategorySlug`
- Uso/importacao:
  - Importada em `src/pages/blog/BlogCategory.jsx:4`; usada em `src/pages/blog/BlogCategory.jsx:20`.
  - Importada em `src/pages/blog/BlogArticle.jsx:4`; usada em `src/pages/blog/BlogArticle.jsx:52`.
  - Importada em `src/components/blog/PostCard.jsx:2`; usada em `src/components/blog/PostCard.jsx:61`.

## Exemplo minimo de frontmatter valido

Exemplo alinhado ao contrato real do loader:

```yaml
---
title: "Titulo do artigo"
slug: "titulo-do-artigo"
category: "engenharia"
updatedAt: "2026-02-18"
summary: "Resumo curto."
cover: "/images/blog/covers/placeholder-1.svg"
tags: ["tag-1", "tag-2"]
pinned: false
---
```
