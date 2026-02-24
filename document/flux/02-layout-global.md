# 02 - Layout Global

## Fonte

- `document/docs/architecture/layout-global.md`
- `document/docs/architecture/diagrama-arquitetura.md`

## Diagrama 1 (flowchart)

```mermaid
flowchart LR
  FILE_App[FILE_src/App.jsx\nrotas]
  FILE_AppLayout[FILE_src/layouts/AppLayout.jsx]

  CMP_NavBar[CMP_src/components/NavBar.jsx]
  CMP_Sidebar[CMP_src/components/Sidebar.jsx]
  UI_Outlet[UI_Outlet]

  subgraph FILE_src_pages[FILE_src/pages/**]
    PAGE_Atual[PAGE_rota_ativa]
  end

  subgraph FILE_src_components[FILE_src/components/**]
    CMP_PageComponents[CMP_componentes_da_page]
  end

  FILE_App --> FILE_AppLayout
  FILE_AppLayout --> CMP_NavBar
  FILE_AppLayout --> CMP_Sidebar
  FILE_AppLayout --> UI_Outlet
  UI_Outlet --> PAGE_Atual
  PAGE_Atual --> CMP_PageComponents
```

## Diagrama 2 (sequenceDiagram)

```mermaid
sequenceDiagram
  participant UI_User as UI_User
  participant LIB_Router as LIB_ReactRouter
  participant UI_Outlet as UI_Outlet
  participant PAGE_Atual as PAGE_Atual
  participant LIB_Dominio as LIB_src/lib/**
  participant DATA_Dados as DATA_src/data/**
  participant FILE_Content as FILE_src/content/**

  UI_User->>LIB_Router: navega para uma URL
  LIB_Router->>UI_Outlet: resolve rota filha de AppLayout
  UI_Outlet->>PAGE_Atual: renderiza pagina ativa
  PAGE_Atual->>LIB_Dominio: consulta regras/funcoes
  PAGE_Atual->>DATA_Dados: consulta dataset
  PAGE_Atual->>FILE_Content: consome conteudo editorial
```

## Notas

- O fluxo foca no comportamento documentado: `AppLayout` como wrapper com `NavBar`, `Sidebar` e `Outlet`.
- `Sidebar` pode ficar oculta em telas menores (`hidden lg:block`), mas continua parte da composicao global.
- O sequence resume o caminho de navegacao e consumo de dependencias da page sem detalhar implementacoes internas.
