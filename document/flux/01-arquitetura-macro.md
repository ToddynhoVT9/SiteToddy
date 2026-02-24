# 01 - Arquitetura Macro

## Fonte

- `document/docs/architecture/diagrama-arquitetura.md`
- `document/docs/architecture/mapa-modulos-relacoes.md`

## Diagrama (Mermaid)

```mermaid
flowchart TB
  UI_Browser[UI_Browser]
  FILE_Index[FILE_index.html\n#root + #modal-root]
  FILE_Main[FILE_src/main.jsx\nBrowserRouter + HelmetProvider]
  FILE_App[FILE_src/App.jsx\nmapa de rotas]
  FILE_AppLayout[FILE_src/layouts/AppLayout.jsx]

  CMP_NavBar[CMP_NavBar\nsrc/components/NavBar.jsx]
  CMP_Sidebar[CMP_Sidebar\nsrc/components/Sidebar.jsx]
  UI_Outlet[UI_Outlet]
  UI_ModalRoot[UI_#modal-root]

  subgraph FILE_src_pages[FILE_src/pages/**]
    PAGE_PagesAtivas[PAGE_paginas_ativas]
    PAGE_BlogPages[PAGE_src/pages/blog/*]
    PAGE_PortfolioPages[PAGE_src/pages/portfolio*.jsx]
  end

  subgraph FILE_src_components[FILE_src/components/**]
    CMP_PageBlocks[CMP_blocos_de_UI]
    CMP_Blog[CMP_src/components/blog/*]
  end

  subgraph FILE_src_lib[FILE_src/lib/**]
    LIB_BlogLoader[LIB_src/lib/blog/loadPosts.js]
    LIB_BlogUtils[LIB_src/lib/blog/categoryUtils.js]
  end

  subgraph FILE_src_data[FILE_src/data/**]
    DATA_Portfolio[DATA_src/data/portfolio.js]
  end

  subgraph FILE_src_content[FILE_src/content/**]
    FILE_BlogMarkdown[FILE_src/content/blog/*.md]
  end

  UI_Browser --> FILE_Index
  FILE_Index --> FILE_Main
  FILE_Index --> UI_ModalRoot

  FILE_Main --> FILE_App
  FILE_App --> FILE_AppLayout

  FILE_AppLayout --> CMP_NavBar
  FILE_AppLayout --> CMP_Sidebar
  FILE_AppLayout --> UI_Outlet
  UI_Outlet --> PAGE_PagesAtivas

  PAGE_PagesAtivas --> CMP_PageBlocks
  PAGE_PagesAtivas --> LIB_BlogUtils

  FILE_BlogMarkdown --> LIB_BlogLoader
  LIB_BlogLoader --> PAGE_BlogPages
  PAGE_BlogPages --> CMP_Blog

  DATA_Portfolio --> PAGE_PortfolioPages
  PAGE_PortfolioPages -- createPortal(...) --> UI_ModalRoot
```

## Notas

- O diagrama prioriza o mapa macro e os fluxos centrais de Blog e Portfolio descritos nas fontes.
- `UI_#modal-root` aparece separado para destacar que o lightbox do portfolio nao renderiza no fluxo normal do `UI_Outlet`.
- `PAGE_src/pages/blog/*` e `CMP_src/components/blog/*` representam conjuntos de arquivos, nao um componente unico.
