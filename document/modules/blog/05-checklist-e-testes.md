# 40.05 - Checklist e Testes do Blog

## Origem
Checklist consolidado e adaptado de:
- `.docs_project/docs/BLOG_TESTS.md`

## Escopo
Validar rotas, renderizacao, ordenacao, carregamento de conteudo e comportamento do modulo blog.

Arquivos foco:
- `src/pages/blog/`
- `src/components/blog/`
- `src/lib/blog/`
- `src/content/blog/`

## Pre-requisito
- Rodar ambiente local com `npm run dev`.

## 1) Testes de rotas (manual)
- [ ] Abrir `/blog` e validar que a dashboard renderiza sem erro.
- [ ] Confirmar secao "Ultimos artigos" no dashboard.
- [ ] Abrir `/blog/engenharia` e validar listagem por categoria.
- [ ] Abrir `/blog/engenharia/refatoracao-segura-ciclos-curtos` (ou slug existente) e validar pagina de artigo.
- [ ] Abrir categoria inexistente (`/blog/categoria-inexistente`) e validar fallback "Categoria nao encontrada".
- [ ] Abrir artigo inexistente (`/blog/engenharia/slug-inexistente`) e validar fallback "Artigo nao encontrado".

Funcoes/componentes relacionados e uso/importacao:
- `BlogDashboard` importado em `src/App.jsx:4`; usado em `src/App.jsx:19`.
- `BlogCategory` importado em `src/App.jsx:5`; usado em `src/App.jsx:20`.
- `BlogArticle` importado em `src/App.jsx:6`; usado em `src/App.jsx:21`.

## 2) Validacao de ordenacao por `updatedAt`
- [ ] Garantir datas distintas em `src/content/blog/*.md` no campo `updatedAt`.
- [ ] Em `/blog`, validar que os 15 ultimos seguem ordem desc por data.
- [ ] Em `/blog/:categoria`, validar ordem desc por data.
- [ ] Validar que pinned da categoria respeitam ordem de recencia quando retornados.

Funcoes relacionadas e uso/importacao:
- Ordenacao base no cache: `src/lib/blog/loadPosts.js:160-164`.
- `getLatestPosts` importado em `src/pages/blog/BlogDashboard.jsx:10`; usado em `src/pages/blog/BlogDashboard.jsx:38`.
- `getPostsByCategory` importado em `src/pages/blog/BlogCategory.jsx:5`; usado em `src/pages/blog/BlogCategory.jsx:16`.

## 3) Validacao de pinned overflow (>3)
- [ ] Em uma categoria, marcar mais de 3 posts com `pinned: true`.
- [ ] Recarregar `/blog`.
- [ ] Confirmar `console.warn` de overflow de pinned.
- [ ] Confirmar que UI mostra no maximo 3 destaques na categoria.
- [ ] Reverter alteracoes de teste no frontmatter.

Funcoes/componentes relacionados e uso/importacao:
- `warnPinnedOverflow` em `src/lib/blog/loadPosts.js:120-158` (uso interno em `src/lib/blog/loadPosts.js:166`).
- `getPinnedPostsByCategory` importado em `src/pages/blog/BlogDashboard.jsx:11`; usado em `src/pages/blog/BlogDashboard.jsx:86`.
- `PinnedGrid` importado em `src/pages/blog/BlogDashboard.jsx:5`; usado em `src/pages/blog/BlogDashboard.jsx:121`.

## 4) Slider/trilho (CategoryRail)
- [ ] Em `/blog`, localizar uma categoria com cards suficientes no trilho.
- [ ] Clicar em "Proximo" e "Anterior" e validar scroll horizontal.
- [ ] Usar `Shift + wheel` no trilho e validar scroll.
- [ ] Com foco no trilho, usar teclado `ArrowLeft` e `ArrowRight`.
- [ ] Validar atualizacao das bolinhas de pagina.
- [ ] Validar foco visivel em botoes e dots.

Funcoes/componentes relacionados e uso/importacao:
- `CategoryRail` importado em `src/pages/blog/BlogDashboard.jsx:4`; usado em `src/pages/blog/BlogDashboard.jsx:122`.
- `DotIndicator` importado em `src/components/blog/CategoryRail.jsx:3`; usado em `src/components/blog/CategoryRail.jsx:196`.

## 5) Build e smoke de producao
- [ ] Executar `npm run build`.
- [ ] Confirmar exit code 0.
- [ ] Opcional: `npm run preview` e validar novamente `/blog`, uma categoria e um artigo.

Arquivos de configuracao relacionados:
- scripts em `package.json`
- build config em `vite.config.js`

## 6) Validacao de capa (404)
- [ ] Abrir DevTools -> Network -> filtrar por imagens.
- [ ] Navegar em `/blog` e em um artigo.
- [ ] Confirmar HTTP 200 para capas (ex.: `/images/blog/covers/placeholder-1.svg`).
- [ ] Se 404, corrigir caminho `cover` nos markdowns ou adicionar arquivo em `public/images/blog/covers/`.

Funcoes/componentes relacionados e uso/importacao:
- `cover` e lido em `src/lib/blog/loadPosts.js:86`.
- Capa e exibida em `src/components/blog/PostCard.jsx:47-53` e `src/pages/blog/BlogArticle.jsx:88-96`.

## 7) Validacao de slug duplicado
- [ ] Duplicar temporariamente `slug` em dois arquivos `src/content/blog/*.md`.
- [ ] Recarregar `/blog`.
- [ ] Confirmar erro do loader com detalhe de slug/arquivos.
- [ ] Reverter alteracao de teste.

Funcoes relacionadas e uso/importacao:
- `assertUniqueSlugs` em `src/lib/blog/loadPosts.js:94-118` (uso interno em `src/lib/blog/loadPosts.js:165`).

## 8) Case sensitivity para deploy Linux
- [ ] Validar casing de:
  - `cover` no frontmatter
  - nomes de arquivo em `public/images/blog/covers/`
  - imports em arquivos React
- [ ] Garantir que caminhos batem exatamente com o filesystem.

Arquivo relacionado:
- exemplo de cover atual: `public/images/blog/covers/placeholder-1.svg`

## 9) Checklist rapido (resumo)
- [ ] Rotas ok (`/blog`, `/blog/:categoria`, `/blog/:categoria/:slug`)
- [ ] Fallback de categoria/artigo inexistente ok
- [ ] Ordenacao por `updatedAt` ok
- [ ] Pinned overflow warning + limite 3 ok
- [ ] Trilho (mouse/teclado/dots) ok
- [ ] Capas sem 404
- [ ] Build ok
