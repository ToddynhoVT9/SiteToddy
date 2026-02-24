# 00 - Indice de Diagramas

## Diagramas

- [01-arquitetura-macro.md](./01-arquitetura-macro.md): visao macro dos blocos principais e suas relacoes.
- [02-layout-global.md](./02-layout-global.md): estrutura de layout global e composicao base de paginas.
- [03-rotas-e-navegacao.md](./03-rotas-e-navegacao.md): fluxo de navegacao entre rotas e paginas.
- [04-blog-fluxo-de-dados.md](./04-blog-fluxo-de-dados.md): entrada, transformacao e consumo de dados no modulo de blog.
- [05-blog-componentes.md](./05-blog-componentes.md): relacoes entre componentes do modulo de blog.
- [06-portfolio-fluxo-modal.md](./06-portfolio-fluxo-modal.md): estados e transicoes do fluxo de modal no portfolio.
- [07-build-deploy.md](./07-build-deploy.md): fluxo de build e deploy do projeto.

## Mapa fonte -> diagrama

- `01-arquitetura-macro.md` <- `document/docs/architecture/diagrama-arquitetura.md` + `mapa-modulos-relacoes.md`
- `02-layout-global.md` <- `document/docs/architecture/layout-global.md`
- `03-rotas-e-navegacao.md` <- `document/docs/architecture/rotas-e-navegacao.md`
- `04-blog-fluxo-de-dados.md` <- `document/modules/blog/01-visao-geral-e-fluxo.md` + `document/lib/api-interna.md`
- `05-blog-componentes.md` <- `document/modules/blog/04-componentes.md`
- `06-portfolio-fluxo-modal.md` <- `document/modules/portfolio.md` + trechos de `mapa-modulos-relacoes.md`
- `07-build-deploy.md` <- `document/docs/overview/20-como-rodar-build-deploy.md` + `document/SETUP_PROJETO.md`
- `99-convencoes-mermaid.md` <- padrao interno desta pasta
