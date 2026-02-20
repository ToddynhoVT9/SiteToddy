# Regras de Estrutura do Projeto

## Objetivo

Definir onde colocar novas partes do projeto, seguindo o padrão já usado no repositório.

## Princípios

- `src/pages/` contém telas roteadas (ex.: `src/pages/home.jsx`, `src/pages/blog/BlogDashboard.jsx`).
- `src/components/` contém blocos de UI reutilizáveis; blog tem subpasta própria (`src/components/blog/`).
- `src/layouts/` contém estrutura global de página (ex.: `src/layouts/AppLayout.jsx`).
- `src/lib/` contém regra de domínio e parsing (ex.: `src/lib/blog/loadPosts.js`, `src/lib/blog/categoryUtils.js`).
- `src/data/` contém dados estáticos consumidos por páginas (ex.: `src/data/portfolio.js`).
- `src/content/` contém conteúdo editorial (ex.: `src/content/blog/*.md`); `public/` e `src/assets/` servem para assets com estratégias diferentes.

## Árvore de decisão: “Estou criando X, onde vai?”

```txt
Nova coisa?
├─ É rota/tela acessada por URL?
│  └─ src/pages/
├─ É estrutura compartilhada (shell com Outlet)?
│  └─ src/layouts/
├─ É UI reutilizável?
│  ├─ Domínio blog? -> src/components/blog/
│  └─ Geral? -> src/components/
├─ É regra/função de domínio/parsing?
│  └─ src/lib/
├─ É dado estático usado por tela?
│  └─ src/data/
├─ É conteúdo editorial (artigos)?
│  └─ src/content/blog/*.md
└─ É arquivo estático (imagem/ícone) para URL direta?
   ├─ Referência por "/images/..." -> public/
   └─ Import no código -> src/assets/
```

## Regras por pasta

### `src/pages/`

- Use para componentes de página ligados ao roteamento em `src/App.jsx`.
- Exemplo de rotas/blog: `src/pages/blog/BlogDashboard.jsx`, `src/pages/blog/BlogCategory.jsx`, `src/pages/blog/BlogArticle.jsx`.
- Exemplo de rotas/portfolio: `src/pages/portfolio.jsx`, `src/pages/portfolioCategory.jsx`.
- Se criar página nova, atualizar o mapa de rotas em `src/App.jsx`.

### `src/components/` (e `src/components/blog/`)

- Use para UI reutilizável e desacoplada de rota.
- Exemplos gerais: `src/components/NavBar.jsx`, `src/components/Sidebar.jsx`, `src/components/ButtonLinkCreateAccount.jsx`.
- Caso especial blog: `src/components/blog/PostCard.jsx`, `src/components/blog/MarkdownContent.jsx`, `src/components/blog/CategoryRail.jsx`.
- Regra prática: se o componente só faz sentido no blog, manter em `src/components/blog/`; se é global, manter em `src/components/`.

### `src/layouts/`

- Use para composição estrutural compartilhada com `Outlet`.
- Exemplo atual: `src/layouts/AppLayout.jsx` (usa `NavBar`, `Sidebar` e `Outlet`).

### `src/lib/`

- Use para funções de domínio, normalização, validação e parsing.
- Exemplos: `src/lib/blog/loadPosts.js` (carrega/valida markdown), `src/lib/blog/categoryUtils.js` (slug/categoria).
- Regra prática: se a lógica não é de render e pode ser testada isoladamente, tende a pertencer a `src/lib/`.

### `src/data/`

- Use para datasets estáticos consumidos pelas páginas/componentes.
- Exemplo atual: `src/data/portfolio.js` com `portfolioData`.

### `src/content/`

- Use para conteúdo em Markdown do blog.
- Exemplo: `src/content/blog/engenharia-ci-deterministico.md`.
- O conteúdo é lido por `src/lib/blog/loadPosts.js` via `import.meta.glob("../../content/blog/*.md", ...)`.

### `public/` vs `src/assets/`

- `public/`: quando o app usa caminho absoluto direto (`/images/...` ou `/favicon.svg`).
- Exemplos: `public/favicon.svg`, `public/images/blog/covers/placeholder-1.svg`.
- `src/assets/`: quando o arquivo é importado no código.
- Exemplos: `src/assets/logo.png` importado em `src/components/NavBar.jsx`, `src/assets/react.svg`.

## Convenções mínimas

### Nomes de arquivos

- `src/components/` e `src/components/blog/`: predominância de `PascalCase` (ex.: `NavBar.jsx`, `PostCard.jsx`).
- `src/pages/` raiz: há padrão misto hoje (`home.jsx`, `profile.jsx`, `portfolioCategory.jsx`, e `Blog.jsx`).
- `src/content/blog/`: arquivos em `kebab-case` com prefixo de tema (ex.: `engenharia-ci-deterministico.md`).

### Rotas e slugs

- Rotas definidas em `src/App.jsx`: `/blog/:categoria/:slug` e `/portfolio/:categoria`.
- Slugs e categorias no blog seguem formato em minúsculas com hífen no frontmatter (ex.: `slug: "ci-deterministico-times-pequenos"`, `category: "engenharia"` em `src/content/blog/engenharia-ci-deterministico.md`).
- Normalização de slug/categoria em `src/lib/blog/categoryUtils.js` e `src/lib/blog/loadPosts.js`.

## Anti-padrões (evitar)

- Colocar parsing/validação de markdown dentro de página (já centralizado em `src/lib/blog/loadPosts.js`).
- Duplicar regra de domínio em múltiplas páginas em vez de reutilizar `src/lib/blog/*`.
- Espalhar dados de portfolio em JSX; manter o dataset em `src/data/portfolio.js`.
- Criar rota nova sem registrar em `src/App.jsx`.
- Misturar asset de URL direta em `src/assets/` quando a referência esperada é `/images/...` em `public/`.
- Misturar conteúdo editorial dentro de JSX quando ele pertence a `src/content/blog/*.md`.
