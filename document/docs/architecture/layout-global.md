# 30 - Layout Global

## Composicao base
Fonte: `src/layouts/AppLayout.jsx`.

```text
+---------------------------------------------------+
| NavBar                                            |
+----------------------+----------------------------+
| Sidebar              | Conteudo da rota atual     |
| (visivel em lg+)     | (Outlet)                   |
+----------------------+----------------------------+
```

## Estrutura no codigo
- `AppLayout` (`src/layouts/AppLayout.jsx:5`) e o layout comum das rotas.
  - Importado em `src/App.jsx:2`; usado em `src/App.jsx:15`.
- `Navbar` (`src/components/NavBar.jsx:21`)
  - Importado em `src/layouts/AppLayout.jsx:2`; renderizado em `src/layouts/AppLayout.jsx:8`.
- `Sidebar` (`src/components/Sidebar.jsx:46`)
  - Importado em `src/layouts/AppLayout.jsx:3`; renderizado em `src/layouts/AppLayout.jsx:13`.
- `Outlet` (`react-router-dom`)
  - Importado em `src/layouts/AppLayout.jsx:1`; renderizado em `src/layouts/AppLayout.jsx:19`.

## Como o `Outlet` funciona neste projeto
- O `AppLayout` e declarado como wrapper em `src/App.jsx:15`.
- Cada rota filha de `AppLayout` injeta seu componente dentro de `Outlet`.
- Exemplo:
  - Em `/blog`, quem entra no `Outlet` e `BlogDashboard` (`src/App.jsx:19`).
  - Em `/portfolio/retratos`, quem entra no `Outlet` e `PortfolioCategory` (`src/App.jsx:29`).

## Responsabilidades dos componentes de layout

### `AppLayout`
- Responsabilidade:
  - garantir estrutura visual global
  - reservar area para conteudo roteado
- Uso/importacao:
  - Importado em `src/App.jsx:2`
  - Usado em `src/App.jsx:15`

### `Navbar`
- Responsabilidade:
  - navegacao superior principal
  - exibir logo (`src/assets/logo.png`)
- Uso/importacao:
  - Importado em `src/layouts/AppLayout.jsx:2`
  - Usado em `src/layouts/AppLayout.jsx:8`

### `Sidebar`
- Responsabilidade:
  - navegacao lateral complementar
  - incluir acesso rapido a `/signup`
- Uso/importacao:
  - Importado em `src/layouts/AppLayout.jsx:3`
  - Usado em `src/layouts/AppLayout.jsx:13`

### Funcoes auxiliares internas dos componentes
- `LinkItemNav` em `src/components/NavBar.jsx:4`
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/components/NavBar.jsx:28-30`.
- `Section`, `SideNavItem`, `ExternalItem` em `src/components/Sidebar.jsx:4,15,33`
  - Nao encontrado uso direto por importacao externa.
  - Uso interno no proprio `Sidebar` em `src/components/Sidebar.jsx:57-83`.

## Comportamento responsivo
- Sidebar fica oculta em telas menores por `hidden lg:block` (`src/layouts/AppLayout.jsx:11`).
- Em telas menores, a navegacao visivel principal fica pela `NavBar`.

## Relacao com modais
- O layout nao define modal diretamente.
- O projeto usa `#modal-root` em `index.html:11` para portais de lightbox.
  - Uso em `src/pages/portfolio.jsx:20`.
  - Uso em `src/pages/portfolioCategory.jsx:20`.
