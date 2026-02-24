# 03 - Rotas e Navegacao

## Fonte

- `document/docs/architecture/rotas-e-navegacao.md`

## Diagrama (Mermaid)

```mermaid
flowchart TB
  FILE_AppRouter["App Router (src/App.jsx)"]

  ROUTE_Home["/"]
  ROUTE_Profile["/profile"]
  ROUTE_Signup["/signup"]

  PAGE_Home["Home -> src/pages/home.jsx"]
  PAGE_Profile["Profile -> src/pages/profile.jsx"]
  PAGE_Signup["Signup -> src/pages/signup.jsx"]

  subgraph Blog
    ROUTE_Blog["/blog"]
    ROUTE_BlogCategoria["/blog/:categoria"]
    ROUTE_BlogSlug["/blog/:categoria/:slug"]

    PAGE_BlogDashboard["BlogDashboard -> src/pages/blog/BlogDashboard.jsx"]
    PAGE_BlogCategory["BlogCategory -> src/pages/blog/BlogCategory.jsx"]
    PAGE_BlogArticle["BlogArticle -> src/pages/blog/BlogArticle.jsx"]
  end

  subgraph Portfolio
    ROUTE_Portfolio["/portfolio"]
    ROUTE_PortfolioCategoria["/portfolio/:categoria"]

    PAGE_Portfolio["Portfolio -> src/pages/portfolio.jsx"]
    PAGE_PortfolioCategory["PortfolioCategory -> src/pages/portfolioCategory.jsx"]
  end

  FILE_AppRouter --> ROUTE_Home
  FILE_AppRouter --> ROUTE_Blog
  FILE_AppRouter --> ROUTE_BlogCategoria
  FILE_AppRouter --> ROUTE_BlogSlug
  FILE_AppRouter --> ROUTE_Profile
  FILE_AppRouter --> ROUTE_Signup
  FILE_AppRouter --> ROUTE_Portfolio
  FILE_AppRouter --> ROUTE_PortfolioCategoria

  ROUTE_Home --> PAGE_Home
  ROUTE_Profile --> PAGE_Profile
  ROUTE_Signup --> PAGE_Signup

  ROUTE_Blog --> PAGE_BlogDashboard
  ROUTE_BlogCategoria --> PAGE_BlogCategory
  ROUTE_BlogSlug --> PAGE_BlogArticle

  ROUTE_Portfolio --> PAGE_Portfolio
  ROUTE_PortfolioCategoria --> PAGE_PortfolioCategory

  ROUTE_Blog -. progressao natural .-> ROUTE_BlogCategoria
  ROUTE_BlogCategoria -. progressao natural .-> ROUTE_BlogSlug
```

## Notas

- O foco e o mapeamento de rotas definido em `src/App.jsx` conforme a fonte.
- As setas pontilhadas no bloco Blog indicam uma progressao comum de navegacao (dashboard -> categoria -> artigo).
