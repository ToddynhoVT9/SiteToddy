# 10 - Estrutura do Projeto

## Fonte
Este documento consolida o acervo anterior:
- `.docs_project/project_structure/src_structure.txt`
- `.docs_project/project_structure/public_structure.txt`

E atualiza os pontos com base no codigo atual do repositorio.

## Arvore relevante

```text
.
├─ package.json
├─ vite.config.js
├─ index.html
├─ public/
│  ├─ .htaccess
│  ├─ favicon.svg
│  └─ images/blog/covers/placeholder-1.svg
└─ src/
   ├─ App.jsx
   ├─ main.jsx
   ├─ index.css
   ├─ assets/
   ├─ components/
   ├─ content/blog/
   ├─ data/
   ├─ layouts/
   ├─ lib/blog/
   └─ pages/
```

## Estrutura de `public/`

```text
public
├─ .htaccess
├─ favicon.svg
└─ images
   └─ blog
      └─ covers
         └─ placeholder-1.svg
```

Descricao:
- `public/.htaccess`: fallback SPA no Apache para `index.html` quando rota fisica nao existe.
- `public/favicon.svg`: icone da aba do navegador referenciado por `index.html:6`.
- `public/images/blog/covers/placeholder-1.svg`: capa padrao usada no frontmatter dos posts (`src/content/blog/*.md`).

## Estrutura de `src/` com responsabilidades

### Arquivos de entrada
- `src/main.jsx`: bootstrap da aplicacao e providers.
- `src/App.jsx`: declaracao das rotas.
- `src/index.css`: import do Tailwind (`@import "tailwindcss"`).

### Layout
- `src/layouts/AppLayout.jsx`: layout global (Navbar + Sidebar + Outlet).
  - Importado em `src/App.jsx:2`; usado em `src/App.jsx:15`.

### Pages (roteaveis)
- `src/pages/home.jsx`: home/login local.
  - Componente `Home` importado em `src/App.jsx:3`; usado em `src/App.jsx:16`.
- `src/pages/profile.jsx`: profile placeholder.
  - Componente `Profile` importado em `src/App.jsx:7`; usado em `src/App.jsx:24`.
- `src/pages/signup.jsx`: cadastro com validacao local.
  - Componente `Signup` importado em `src/App.jsx:9`; usado em `src/App.jsx:25`.
- `src/pages/portfolio.jsx`: listagem de categorias do portfolio com lightbox.
  - Componente `Portfolio` importado em `src/App.jsx:8`; usado em `src/App.jsx:28`.
- `src/pages/portfolioCategory.jsx`: detalhe da categoria com lightbox.
  - Componente `PortfolioCategory` importado em `src/App.jsx:10`; usado em `src/App.jsx:29`.
- `src/pages/blog/BlogDashboard.jsx`: dashboard do blog.
  - Componente `BlogDashboard` importado em `src/App.jsx:4`; usado em `src/App.jsx:19`.
- `src/pages/blog/BlogCategory.jsx`: lista por categoria.
  - Componente `BlogCategory` importado em `src/App.jsx:5`; usado em `src/App.jsx:20`.
- `src/pages/blog/BlogArticle.jsx`: artigo individual.
  - Componente `BlogArticle` importado em `src/App.jsx:6`; usado em `src/App.jsx:21`.
- `src/pages/Blog.jsx`: pagina de sanity check de blog.
  - Nao encontrado uso direto nas rotas atuais.

### Components (reutilizaveis)
Tabela de componentes e uso/importacao principal:

| Arquivo | Componente/Funcoes | Uso/importacao principal |
|---|---|---|
| `src/components/NavBar.jsx` | `Navbar`, `LinkItemNav` | `Navbar` importado em `src/layouts/AppLayout.jsx:2`; usado em `src/layouts/AppLayout.jsx:8`. `LinkItemNav` e uso interno (`src/components/NavBar.jsx:28-30`). |
| `src/components/Sidebar.jsx` | `Sidebar`, `Section`, `SideNavItem`, `ExternalItem` | `Sidebar` importado em `src/layouts/AppLayout.jsx:3`; usado em `src/layouts/AppLayout.jsx:13`. `Section`, `SideNavItem`, `ExternalItem` com uso interno no proprio arquivo (`src/components/Sidebar.jsx:57-83`). |
| `src/components/Hero.jsx` | `Hero` | Importado em `src/pages/home.jsx:1`; usado em `src/pages/home.jsx:18`. |
| `src/components/LinkTree.jsx` | `LinkTree`, `LinkItem` | `LinkTree` importado em `src/pages/home.jsx:2`; usado em `src/pages/home.jsx:21`. `LinkItem` com uso interno (`src/components/LinkTree.jsx:25-41`). |
| `src/components/form.jsx` | `Form` | Importado em `src/pages/home.jsx:3` e `src/pages/signup.jsx:2`; usado em `src/pages/home.jsx:33,40` e `src/pages/signup.jsx:34,36,43,50`. |
| `src/components/ButtonLinkCreateAccount.jsx` | `ButtonLinkCreateAccount` | Importado em `src/pages/home.jsx:4` e `src/pages/signup.jsx:3`; usado em `src/pages/home.jsx:57` e `src/pages/signup.jsx:57`. |
| `src/components/Text.jsx` | `Text` | Importado em `src/components/LinkTree.jsx:1`; usado em `src/components/LinkTree.jsx:24,31,37,40`. |
| `src/components/Card.jsx` | `Card` | Nao encontrado uso direto. |
| `src/components/CreateAccountCTA.jsx` | `CreateAccountCTA` | Nao encontrado uso direto. |
| `src/components/blog/PostCard.jsx` | `PostCard` | Importado em `src/pages/blog/BlogDashboard.jsx:6`, `src/pages/blog/BlogCategory.jsx:3`, `src/components/blog/PinnedGrid.jsx:1`, `src/components/blog/CategoryRail.jsx:2`. |
| `src/components/blog/PinnedGrid.jsx` | `PinnedGrid` | Importado em `src/pages/blog/BlogDashboard.jsx:5`; usado em `src/pages/blog/BlogDashboard.jsx:121`. |
| `src/components/blog/CategoryRail.jsx` | `CategoryRail` | Importado em `src/pages/blog/BlogDashboard.jsx:4`; usado em `src/pages/blog/BlogDashboard.jsx:122`. |
| `src/components/blog/DotIndicator.jsx` | `DotIndicator` | Importado em `src/components/blog/CategoryRail.jsx:3`; usado em `src/components/blog/CategoryRail.jsx:196`. |
| `src/components/blog/MarkdownContent.jsx` | `MarkdownContent` | Importado em `src/pages/blog/BlogArticle.jsx:3`; usado em `src/pages/blog/BlogArticle.jsx:99`. |
| `src/components/blog/RailSkeleton.jsx` | `RailSkeleton` | Importado em `src/pages/blog/BlogDashboard.jsx:7`; usado em `src/pages/blog/BlogDashboard.jsx:117`. |

### Dominio e dados
- `src/lib/blog/loadPosts.js`
  - Funcoes exportadas:
    - `getAllPosts` usado em `src/pages/blog/BlogArticle.jsx:5,27` e `src/pages/Blog.jsx:2,5`.
    - `getAllCategories` usado em `src/pages/blog/BlogDashboard.jsx:9,39` e `src/pages/Blog.jsx:2,6`.
    - `getPostsByCategory` usado em `src/pages/blog/BlogDashboard.jsx:12,85` e `src/pages/blog/BlogCategory.jsx:5,16`.
    - `getPinnedPostsByCategory` usado em `src/pages/blog/BlogDashboard.jsx:11,86`.
    - `getLatestPosts` usado em `src/pages/blog/BlogDashboard.jsx:10,38`.
- `src/lib/blog/categoryUtils.js`
  - `categorySlugToTitle` usado em `src/pages/blog/BlogArticle.jsx:4,52`, `src/pages/blog/BlogCategory.jsx:4,20`, `src/components/blog/PostCard.jsx:2,61`.
  - `humanizeCategorySlug` usado em `src/lib/blog/loadPosts.js:2,194`.
  - `slugify`: nao encontrado uso direto.
- `src/data/portfolio.js`
  - `portfolioData` usado em `src/pages/portfolio.jsx:4,166` e `src/pages/portfolioCategory.jsx:4,132`.

### Conteudo
- `src/content/blog/*.md`: fonte de artigos do blog com frontmatter.
  - Consumido por `import.meta.glob` em `src/lib/blog/loadPosts.js:6-9`.

## Diagrama de alto nivel (arquitetura de pasta)

```text
src
├─ pages           -> telas roteadas
├─ components      -> blocos reutilizaveis de UI
├─ layouts         -> moldura comum de pagina
├─ lib             -> regras/funcoes de dominio
├─ data            -> dados estaticos
├─ content         -> conteudo markdown
└─ assets          -> imagens importadas pelo bundle
```
