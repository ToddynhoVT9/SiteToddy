```txt
src/ ... || código-fonte principal da aplicação React
│
├─ App.jsx ..... || define as rotas principais (home, blog, profile, signup, portfolio).
├─ index.css ... || importa o Tailwind CSS global.
├─ main.jsx .... || ponto de entrada; configura Buffer, Router e HelmetProvider.
│
├─ assets/ ... || arquivos estáticos de imagem
│   │
│   ├─ logo.png .... || logo principal usado na navegação.
│   └─ react.svg ... || logo padrão do React.
│
├─ components/ || componentes reutilizáveis de interface
│       │
│       ├─ ButtonLinkCreateAccount.jsx ... || botão/link reutilizável para criar conta.
│       ├─ Card.jsx ...................... || card visual simples com título e descrição.
│       ├─ CreateAccountCTA.jsx .......... || bloco de CTA para cadastro/login.
│       ├─ form.jsx ...................... || campo de formulário com label e input padronizado.
│       ├─ Hero.jsx ...................... || seção de apresentação principal da home.
│       ├─ LinkTree.jsx .................. || lista de links externos/redes sociais.
│       ├─ NavBar.jsx .................... || barra de navegação superior com logo e links.
│       ├─ Sidebar.jsx ................... || menu lateral com navegação principal.
│       ├─ Text.jsx ...................... || componente de texto simples (`<p>`).
│       │
│       └─ blog/ || componentes específicos do blog
│           │
│           ├─ CategoryRail.jsx ...... || trilho horizontal de posts por categoria.
│           ├─ DotIndicator.jsx ...... || indicador de páginas (bolinhas) do trilho.
│           ├─ MarkdownContent.jsx ... || renderiza markdown com suporte GFM.
│           ├─ PinnedGrid.jsx ........ || layout de posts em destaque (pinned).
│           ├─ PostCard.jsx .......... || card reutilizável de post com variantes visuais.
│           └─ RailSkeleton.jsx ...... || skeleton/loading para o trilho de posts.
│
├─ content/ ... || conteúdo em markdown
│   │
│   └─ blog/ ... || artigos do blog
│       │
│       ├─ engenharia-arquitetura-modular-frontends-grandes.md || artigo sobre arquitetura modular em frontends grandes.
│       ├─ engenharia-ci-deterministico.md || artigo sobre CI determinístico para times pequenos.
│       ├─ engenharia-gestao-continua-debito-tecnico.md || artigo sobre gestão contínua de débito técnico.
│       ├─ engenharia-observabilidade-pragmatica.md || artigo sobre observabilidade pragmática no frontend.
│       ├─ engenharia-refatoracao-segura.md || artigo sobre refatoração segura em ciclos curtos.
│       ├─ engenharia-testes-contrato-entre-servicos.md || artigo sobre testes de contrato entre serviços.
│       └─ filosofia-limites-da-eficiencia.md || reflexão sobre limites da eficiência.
│
├─ data/ ... || dados locais usados pela aplicação
│   │
│   └─ portfolio.js ... || catálogo de categorias/imagens do portfólio.
│
├─ layouts/ ... || estruturas base de páginas
│   │
│   └─ AppLayout.jsx ... || layout global com Navbar, Sidebar e `<Outlet />`.
│
├─ lib/ ... || utilitários e regras de domínio
│ │
│ └─ blog/ ... || funções de suporte ao blog
│       │
│       ├─ categoryUtils.js ... || utilidades para slug e nome de categoria.
│       └─ loadPosts.js ....... || loader de posts markdown + validações e filtros.
│
└─ pages/ ... || páginas roteáveis
    │
    ├─ Blog.jsx ................ || página temporária de sanity check do blog.
    ├─ home.jsx ................ || página inicial com hero, links e login.
    ├─ portfolio.jsx ........... || listagem de categorias do portfólio com lightbox.
    ├─ portfolioCategory.jsx ... || detalhes de categoria do portfólio com lightbox.
    ├─ profile.jsx ............. || página de perfil (placeholder).
    ├─ signup.jsx .............. || página de cadastro com validação de senha.
    │
    └─ blog/ ... || páginas do módulo blog
        │
        ├─ BlogArticle.jsx ..... || página de leitura de artigo individual.
        ├─ BlogCategory.jsx .... || página de listagem por categoria.
        └─ BlogDashboard.jsx ... || dashboard principal do blog (últimos + destaques).
```
