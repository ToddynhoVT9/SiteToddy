# 05 - Blog: Componentes

## Fonte

- `document/modules/blog/04-componentes.md`

## Diagrama (Mermaid)

```mermaid
flowchart LR
  subgraph PAGE_Consumo[PAGE_src/pages/blog/*]
    PAGE_BlogDashboard["PAGE_BlogDashboard\nsrc/pages/blog/BlogDashboard.jsx"]
    PAGE_BlogCategory["PAGE_BlogCategory\nsrc/pages/blog/BlogCategory.jsx"]
    PAGE_BlogArticle["PAGE_BlogArticle\nsrc/pages/blog/BlogArticle.jsx"]
  end

  subgraph UI_Rails[UI rails]
    CMP_CategoryRail["CMP_CategoryRail\nsrc/components/blog/CategoryRail.jsx"]
    CMP_DotIndicator["CMP_DotIndicator\nsrc/components/blog/DotIndicator.jsx"]
  end

  subgraph UI_Cards[cards]
    CMP_PinnedGrid["CMP_PinnedGrid\nsrc/components/blog/PinnedGrid.jsx"]
    CMP_PostCard["CMP_PostCard\nsrc/components/blog/PostCard.jsx"]
  end

  subgraph UI_Markdown[markdown]
    CMP_MarkdownContent["CMP_MarkdownContent\nsrc/components/blog/MarkdownContent.jsx"]
    LIB_ReactMarkdown["LIB_react-markdown"]
    LIB_RemarkGfm["LIB_remark-gfm"]
  end

  subgraph UI_Skeleton[skeleton/loading]
    CMP_RailSkeleton["CMP_RailSkeleton\nsrc/components/blog/RailSkeleton.jsx"]
  end

  subgraph LIB_Externas[libs/utilitarios usados]
    LIB_LinkReactRouter["LIB_Link (react-router-dom)"]
    LIB_CategorySlugToTitle["LIB_categorySlugToTitle"]
  end

  PAGE_BlogDashboard --> CMP_CategoryRail
  PAGE_BlogDashboard --> CMP_PinnedGrid
  PAGE_BlogDashboard --> CMP_PostCard
  PAGE_BlogDashboard --> CMP_RailSkeleton

  PAGE_BlogCategory --> CMP_PostCard
  PAGE_BlogArticle --> CMP_MarkdownContent

  CMP_CategoryRail --> CMP_PostCard
  CMP_CategoryRail --> CMP_DotIndicator
  CMP_PinnedGrid --> CMP_PostCard

  CMP_PostCard --> LIB_LinkReactRouter
  CMP_PostCard --> LIB_CategorySlugToTitle

  CMP_MarkdownContent --> LIB_ReactMarkdown
  CMP_MarkdownContent --> LIB_RemarkGfm
```

## Notas

- O diagrama inclui somente dependencias e relacoes de importacao/uso citadas no documento-fonte.
- `CMP_DotIndicator` e `CMP_RailSkeleton` aparecem como nos proprios; nao possuem dependencias externas listadas.
