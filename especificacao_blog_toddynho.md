# Especificação Técnica --- Implementação do Blog

## 1. Visão Geral

O blog será estruturado como um **dashboard de categorias** acessível
pela rota:

    /blog

A página principal do blog exibirá todas as categorias disponíveis,
organizadas verticalmente (uma abaixo da outra).

Cada categoria conterá:

-   Uma seção de destaque com até **3 artigos fixados (pinned)**
-   Uma faixa horizontal (slider) contendo os **10 artigos mais
    recentes**
-   Um botão claro de **"Ver todos os artigos da categoria"**

------------------------------------------------------------------------

## 2. Estrutura de Rotas

### 2.1 Página Principal do Blog

    /blog

Exibe: - Bloco "Últimos artigos" (cross-categoria --- 15 artigos mais
recentes) - Todas as categorias - Em cada categoria: - 3 artigos
pinned - Slider com até 10 artigos (ordenados por `updatedAt`)

### 2.2 Página da Categoria

    /blog/:categoria

Exibe: - Lista completa de artigos da categoria - Sem limite de 10 -
Ordenação por `updatedAt` (mais recente primeiro) - Caso necessário,
considerar virtualização futura

### 2.3 Página do Artigo

    /blog/:categoria/:slug

Exibe: - Conteúdo completo do artigo - Metadados SEO individuais -
Navegação opcional (próximo / anterior)

------------------------------------------------------------------------

## 3. Estrutura Visual da Categoria

### 3.1 Layout Geral

Estrutura base já existente:

┌───────────────────────────────┐\
│ NavBar │\
└───────────────────────────────┘\
┌───────────────┬───────────────┐\
│ SideBar │ Conteúdo │\
│ │ (rota atual) │\
└───────────────┴───────────────┘

### 3.2 Área de Destaque (Pinned)

Cada categoria pode possuir até **3 artigos fixados**.

Layout:

┌───────────────┬───────────────┐\
│ │ Poste secundário │\
│ Poste principal │───────────────\
│ │ Poste terciário │\
└───────────────┴───────────────┘

Regras:

-   O artigo principal ocupa grande espaço à esquerda.
-   Os dois artigos secundários ocupam a direita.
-   A soma visual dos dois secundários equivale ao espaço do principal.
-   Caso não existam 3 pinned, adaptar layout dinamicamente.

------------------------------------------------------------------------

## 4. Slider de Artigos

Cada categoria terá uma faixa horizontal contendo:

-   Até 10 artigos mais recentes
-   Ordenados por `updatedAt` (decisão padrão)

### 4.1 Navegação

O slider deverá permitir:

-   Setas laterais clicáveis
-   Scroll horizontal com roda do mouse (Shift + Scroll)
-   Suporte a arraste (touch / mobile)
-   Navegação por teclado
-   Indicador visual de posição (bolinhas de progresso)

### 4.2 UX

-   Botão visível "Ver todos os artigos"
-   Indicadores acessíveis
-   Feedback visual ao focar via teclado

------------------------------------------------------------------------

## 5. Estrutura de Conteúdo

Os artigos serão armazenados em **Markdown com frontmatter**.

### 5.1 Exemplo de Frontmatter

``` yaml
---
title: "Título do Artigo"
slug: "titulo-do-artigo"
category: "engenharia"
updatedAt: "2026-02-18"
summary: "Resumo curto do artigo."
cover: "/images/capa.jpg"
tags: ["infraestrutura", "energia"]
pinned: false
---
```

### 5.2 Regras

-   `slug` será global (único no sistema).
-   Ordenação baseada em `updatedAt`.
-   `pinned: true` define artigos destacados.

------------------------------------------------------------------------

## 6. Organização Visual dos Cards

Cada card deverá conter:

-   Imagem de capa (resolução base 240p)
-   Título
-   Data
-   Resumo (1--2 linhas)
-   Tag ou categoria

### 6.1 Performance

-   Lazy-loading das imagens
-   Tamanho fixo para evitar layout shift
-   Skeleton loading nos trilhos de categoria

------------------------------------------------------------------------

## 7. Bloco "Últimos Artigos"

Na página `/blog`, antes das categorias, deverá existir:

-   Um bloco "Últimos artigos"
-   15 artigos mais recentes
-   Cross-categoria

Objetivo: facilitar acesso rápido ao conteúdo novo.

------------------------------------------------------------------------

## 8. SEO (SPA)

Cada artigo deverá definir:

-   `<title>` específico
-   `<meta name="description">`
-   Open Graph tags (OG)

Evitar uso de título genérico global.

------------------------------------------------------------------------

## 9. Acessibilidade

-   Botões do slider com `aria-label`
-   Foco visível via teclado
-   Cards devem ser `<Link>` reais (não apenas `div onClick`)

------------------------------------------------------------------------

## 10. Escalabilidade Futura

Caso o número de artigos cresça significativamente:

-   Implementar virtualização na listagem completa da categoria
-   Considerar paginação opcional
-   Possível futura integração com CMS

------------------------------------------------------------------------

## 11. Resumo Arquitetural

O blog será composto por:

-   Dashboard de categorias
-   Sistema de destaque (pinned)
-   Slider horizontal limitado a 10
-   Página completa por categoria
-   Página individual por artigo
-   Estrutura em Markdown com frontmatter
-   SEO e acessibilidade integrados
-   Base preparada para escalabilidade futura
