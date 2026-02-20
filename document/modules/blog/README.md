# 40 - Modulo Blog

## Objetivo
Documentar o modulo de Blog existente no projeto, cobrindo:
- fluxo de dados
- rotas e decisoes de renderizacao
- contrato do markdown/frontmatter
- componentes de UI do blog
- checklist de testes e validacao manual

## Sumario
1. [01-visao-geral-e-fluxo](./01-visao-geral-e-fluxo.md)
2. [02-rotas-do-blog](./02-rotas-do-blog.md)
3. [03-contratos-de-conteudo-markdown](./03-contratos-de-conteudo-markdown.md)
4. [04-componentes](./04-componentes.md)
5. [05-checklist-e-testes](./05-checklist-e-testes.md)

## Fontes de verdade no codigo
- Rotas do blog em `src/App.jsx:18-22`
- Paginas do blog em `src/pages/blog/`
- Componentes do blog em `src/components/blog/`
- Loader e utilitarios em `src/lib/blog/loadPosts.js` e `src/lib/blog/categoryUtils.js`
- Conteudo markdown em `src/content/blog/*.md`

## Relacao com a documentacao raiz
- Voltar para o hub principal: [`document/README.md`](../../README.md)
