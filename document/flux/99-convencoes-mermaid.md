# 99 - Convencoes Mermaid

Este documento define o padrao visual e de nomenclatura para os diagramas em `document/flux/`.

## Prefixos de nos

- `UI_`: elementos de interface (botao, modal, pagina renderizada).
- `PAGE_`: paginas/rotas de alto nivel.
- `CMP_`: componentes React reutilizaveis ou especificos de modulo.
- `LIB_`: bibliotecas internas, hooks e utilitarios.
- `DATA_`: entidades de dados, colecoes e payloads.
- `FILE_`: arquivos de codigo ou configuracao quando o foco for estrutura.

## Direcao dos diagramas

- Arquitetura macro e fluxo vertical: `flowchart TB`.
- Relacoes entre componentes no mesmo nivel: `flowchart LR`.

## Uso de subgraph

- Use `subgraph` para agrupar por contexto tecnico.
- Exemplos de grupos recomendados:
  - `src/pages`
  - `src/components/blog`
  - `src/lib/blog`
- Nomeie subgraphs com termos claros e consistentes com o codigo.

## Checklist de consistencia

- O diagrama possui secao **Fonte** no topo com os `.md` usados.
- Prefixos dos nos seguem `UI_`, `PAGE_`, `CMP_`, `LIB_`, `DATA_`, `FILE_`.
- Direcao (`TB`/`LR`) esta adequada ao tipo de leitura.
- `subgraph` foi usado quando ha agrupamentos naturais.
- Nomes de nos estao curtos, objetivos e sem ambiguidade.
- Fluxo representa apenas informacao existente nos documentos-fonte.

## Mini-exemplo: flowchart

```mermaid
flowchart TB
  subgraph FILE_src/pages
    PAGE_Home[HomePage]
  end

  subgraph FILE_src/components/blog
    CMP_BlogList[BlogList]
  end

  PAGE_Home --> CMP_BlogList
```

## Mini-exemplo: sequenceDiagram

```mermaid
sequenceDiagram
  participant UI_User as UI_User
  participant PAGE_Blog as PAGE_Blog
  participant LIB_BlogApi as LIB_BlogApi
  participant DATA_Posts as DATA_Posts

  UI_User->>PAGE_Blog: abre rota /blog
  PAGE_Blog->>LIB_BlogApi: solicitar posts()
  LIB_BlogApi-->>DATA_Posts: retornar lista
  DATA_Posts-->>PAGE_Blog: payload
  PAGE_Blog-->>UI_User: renderiza listagem
```
