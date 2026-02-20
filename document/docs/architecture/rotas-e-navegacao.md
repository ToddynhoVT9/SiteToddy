# 20 - Rotas e Navegacao

## Fonte de verdade das rotas
- Arquivo: `src/App.jsx`
- Definicao das rotas em `src/App.jsx:14-31`.

## Tabela de rotas

| Rota | Proposito | Componente da rota | Arquivo do componente | Onde definida |
|---|---|---|---|---|
| `/` | Home com apresentacao, links e login local | `Home` | `src/pages/home.jsx` | `src/App.jsx:16` |
| `/blog` | Dashboard do blog (ultimos + categorias) | `BlogDashboard` | `src/pages/blog/BlogDashboard.jsx` | `src/App.jsx:18-19` |
| `/blog/:categoria` | Lista completa por categoria | `BlogCategory` | `src/pages/blog/BlogCategory.jsx` | `src/App.jsx:20` |
| `/blog/:categoria/:slug` | Artigo individual | `BlogArticle` | `src/pages/blog/BlogArticle.jsx` | `src/App.jsx:21` |
| `/profile` | Pagina de perfil (placeholder) | `Profile` | `src/pages/profile.jsx` | `src/App.jsx:24` |
| `/signup` | Cadastro com validacao local | `Signup` | `src/pages/signup.jsx` | `src/App.jsx:25` |
| `/portfolio` | Listagem de categorias de portfolio | `Portfolio` | `src/pages/portfolio.jsx` | `src/App.jsx:27-28` |
| `/portfolio/:categoria` | Detalhe da categoria de portfolio | `PortfolioCategory` | `src/pages/portfolioCategory.jsx` | `src/App.jsx:29` |

## Navegacao principal na interface

### NavBar
- Componente: `Navbar` em `src/components/NavBar.jsx:21`.
- Uso/importacao:
  - Importado em `src/layouts/AppLayout.jsx:2`.
  - Usado em `src/layouts/AppLayout.jsx:8`.
- Links renderizados:
  - `/` (`src/components/NavBar.jsx:24`)
  - `/blog` (`src/components/NavBar.jsx:28`)
  - `/portfolio` (`src/components/NavBar.jsx:29`)
  - `/profile` (`src/components/NavBar.jsx:30`)

### Sidebar
- Componente: `Sidebar` em `src/components/Sidebar.jsx:46`.
- Uso/importacao:
  - Importado em `src/layouts/AppLayout.jsx:3`.
  - Usado em `src/layouts/AppLayout.jsx:13`.
- Links renderizados:
  - `/` (`src/components/Sidebar.jsx:58`)
  - `/blog` (`src/components/Sidebar.jsx:59`)
  - `/portfolio` (`src/components/Sidebar.jsx:60`)
  - `/profile` (`src/components/Sidebar.jsx:61`)
  - `/signup` (`src/components/Sidebar.jsx:82`)

## Diagrama ASCII de roteamento

```text
App (src/App.jsx)
└─ AppLayout
   ├─ /
   │  └─ Home
   ├─ /blog
   │  ├─ index -> BlogDashboard
   │  ├─ :categoria -> BlogCategory
   │  └─ :categoria/:slug -> BlogArticle
   ├─ /profile -> Profile
   ├─ /signup -> Signup
   └─ /portfolio
      ├─ index -> Portfolio
      └─ :categoria -> PortfolioCategory
```

## Observacoes
- `src/pages/Blog.jsx` existe, mas nao esta mapeada em `src/App.jsx`.
  - Nao encontrado uso direto na navegacao atual.
