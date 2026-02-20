# Documentacao Tecnica - SiteToddy

## Objetivo
Centralizar a documentacao tecnica do projeto com base no codigo real do repositorio.

## Escopo desta etapa
Esta base cobre:
- visao geral
- estrutura de pastas e arquivos relevantes
- rotas e navegacao
- layout global

## Fluxo e mapeamento de `document/`
1. [README (hub)](./README.md)
2. [docs/overview/visao-geral](./docs/overview/visao-geral.md)
3. [docs/overview/estrutura-do-projeto](./docs/overview/estrutura-do-projeto.md)
4. [docs/structure/01-structure-rules](./docs/structure/01-structure-rules.md)
5. [docs/structure/02-src-structure](./docs/structure/02-src-structure.md)
6. [docs/structure/03-public-structure](./docs/structure/03-public-structure.md)
7. [docs/architecture/rotas-e-navegacao](./docs/architecture/rotas-e-navegacao.md)
8. [docs/architecture/layout-global](./docs/architecture/layout-global.md)
9. [docs/architecture/mapa-modulos-relacoes](./docs/architecture/mapa-modulos-relacoes.md)
10. [docs/architecture/diagrama-arquitetura](./docs/architecture/diagrama-arquitetura.md)
11. [docs/overview/como-rodar-build-deploy](./docs/overview/como-rodar-build-deploy.md)
12. [modules/blog/README](./modules/blog/README.md)
13. [modules/blog/01-visao-geral-e-fluxo](./modules/blog/01-visao-geral-e-fluxo.md)
14. [modules/blog/02-rotas-do-blog](./modules/blog/02-rotas-do-blog.md)
15. [modules/blog/03-contratos-de-conteudo-markdown](./modules/blog/03-contratos-de-conteudo-markdown.md)
16. [modules/blog/04-componentes](./modules/blog/04-componentes.md)
17. [modules/blog/05-checklist-e-testes](./modules/blog/05-checklist-e-testes.md)
18. [modules/portfolio](./modules/portfolio.md)
19. [modules/account](./modules/account.md)
20. [components/reutilizaveis](./components/reutilizaveis.md)
21. [lib/api-interna](./lib/api-interna.md)
22. [docs/standards/convencoes-e-padroes](./docs/standards/convencoes-e-padroes.md)
23. [docs/qa/troubleshooting](./docs/qa/troubleshooting.md)
24. [BLOG_TESTS](./BLOG_TESTS.md)

## Fontes de verdade no codigo
- Entrada da aplicacao: `src/main.jsx`
- Mapa de rotas: `src/App.jsx`
- Layout global: `src/layouts/AppLayout.jsx`
- Estrutura de conteudo do blog: `src/content/blog/*.md`
- Dados do portfolio: `src/data/portfolio.js`

## Acervo anterior consolidado
O conteudo inicial desta documentacao reaproveita e consolida:
- `.docs_project/project_structure/src_structure.txt`
- `.docs_project/project_structure/public_structure.txt`
- [Estrutura detalhada de `src/`](./docs/structure/02-src-structure.md)
- [Estrutura detalhada de `public/`](./docs/structure/03-public-structure.md)
