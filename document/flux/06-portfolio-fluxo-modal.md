# 06 - Portfolio: Fluxo do Modal

## Fonte

- `document/modules/portfolio.md`
- `document/docs/architecture/mapa-modulos-relacoes.md`

## Diagrama 1 (stateDiagram-v2)

```mermaid
stateDiagram-v2
  [*] --> Lista
  Lista --> ModalAberto: clica item
  ModalAberto --> Lista: fecha (backdrop/botao/Escape)
```

## Diagrama 2 (flowchart)

```mermaid
flowchart TB
  PAGE_Portfolio["PAGE_Portfolio\nsrc/pages/portfolio.jsx"]
  PAGE_PortfolioCategory["PAGE_PortfolioCategory\nsrc/pages/portfolioCategory.jsx"]

  UI_AcaoAbrir["UI_acao: clique em item"]
  CMP_Lightbox["CMP_Lightbox\ncomponente interno nas pages"]
  LIB_CreatePortal["LIB_createPortal(..., modalRoot)"]
  UI_ModalRoot["UI_#modal-root"]
  FILE_IndexHtml["FILE_index.html\n<div id='modal-root'></div>"]

  PAGE_Portfolio --> UI_AcaoAbrir
  PAGE_PortfolioCategory --> UI_AcaoAbrir

  UI_AcaoAbrir --> CMP_Lightbox
  CMP_Lightbox --> LIB_CreatePortal
  LIB_CreatePortal --> UI_ModalRoot
  FILE_IndexHtml --> UI_ModalRoot
```

## Notas

- As duas paginas (`portfolio.jsx` e `portfolioCategory.jsx`) possuem implementacao propria de `Lightbox`, ambas com portal para `#modal-root`.
- O estado de fechamento do modal cobre os caminhos documentados: clique no backdrop, botao de fechar e tecla `Escape`.
