# 20 - Deploy e SPA

## Navegacao

- Hub principal: [`document/README.md`](../../README.md)
- Troubleshooting: [`document/docs/qa/troubleshooting.md`](../qa/troubleshooting.md)

## Implementado

## 1) Scripts de execucao/build

Definidos em `package.json:6-10`:

- `npm run dev` -> `vite`
- `npm run build` -> `vite build`
- `npm run preview` -> `vite preview`

Fonte:

- `package.json:6-10`

## 2) Configuracao Vite

Arquivo:

- `vite.config.js`

Configuracoes observadas:

- Plugin React (`vite.config.js:2`, `vite.config.js:7`)
- Plugin Tailwind para Vite (`vite.config.js:3`, `vite.config.js:7`)
- Alias `@ -> src` (`vite.config.js:8-11`)

## 3) Entrada HTML e mount points

Arquivo:

- `index.html`

Pontos relevantes:

- Root da SPA: `<div id="root"></div>` (`index.html:12`)
- Root de modais via portal: `<div id="modal-root"></div>` (`index.html:13`)
- Entrada do bundle: `<script type="module" src="/src/main.jsx"></script>` (`index.html:14`)

Relacao com funcoes/componentes:

- `Lightbox` de portfolio usa `modal-root`:
  - `src/pages/portfolio.jsx:21`, `src/pages/portfolio.jsx:57`
  - `src/pages/portfolioCategory.jsx:21`, `src/pages/portfolioCategory.jsx:55`
  - `Lightbox` nao encontrado uso direto por importacao externa; uso interno nos mesmos arquivos (`src/pages/portfolio.jsx:245`, `src/pages/portfolioCategory.jsx:235`).

## 4) Fallback SPA em Apache (`public/.htaccess`)

Arquivo:

- `public/.htaccess`

Regras implementadas:

- Ativa `mod_rewrite` (`public/.htaccess:2-4`)
- Preserva `index.html` (`public/.htaccess:6`)
- Se recurso nao e arquivo nem pasta, redireciona para `/index.html` (`public/.htaccess:8-10`)

Motivo:

- Permitir refresh/acesso direto em rotas cliente (`/blog/...`, `/portfolio/...`) sem 404 no servidor Apache.

## 5) O que o repositorio afirma sobre deploy

`README.md` descreve:

- Build gera artefatos em `dist/` (`README.md:80-90`, `README.md:210-220`)
- Publicacao baseada no conteudo de `dist/` (`README.md:94-105`, `README.md:224-235`)

Observacao:

- O repositorio nao inclui pipeline CI/CD versionado para deploy automatico.

## Planejado (nao implementado no repo)

Possiveis evolucoes de infraestrutura (sem evidencia de implementacao atual):

- Pipeline de deploy automatico (CI/CD).
- Ambientes separados (staging/producao) com variaveis de ambiente versionadas.
- Checks automaticos pre-deploy (build + smoke tests de rotas).

## Checklist rapido de deploy manual

1. Rodar `npm install`.
2. Rodar `npm run build`.
3. Confirmar pasta `dist/` gerada.
4. Publicar conteudo de `dist/` no host.
5. Se host Apache, garantir `public/.htaccess` equivalente no servidor final.
