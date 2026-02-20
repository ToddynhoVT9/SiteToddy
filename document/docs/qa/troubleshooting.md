# 90 - Troubleshooting

## Navegacao
- Hub principal: [`document/README.md`](../../README.md)
- Deploy e SPA: [`document/docs/overview/como-rodar-build-deploy.md`](../overview/como-rodar-build-deploy.md)
- Portfolio: [`document/modules/portfolio.md`](../../modules/portfolio.md)

## Escopo
Problemas observaveis na estrutura atual do repositorio e como diagnosticar/corrigir.

## 1) Imagens do portfolio retornando 404

## Sinal observavel
- `src/data/portfolio.js` aponta para imagens em `/images/portfolio/...`:
  - exemplos em `src/data/portfolio.js:8`, `src/data/portfolio.js:86`.
- Em `public/`, nao ha arquivos de portfolio no estado atual:
  - `rg --files public` lista apenas:
    - `public/favicon.svg`
    - `public/images/blog/covers/placeholder-1.svg`

## Impacto
- Cards e lightbox do portfolio podem aparecer quebrados/sem imagem.

Relacao com funcoes/componentes:
- `portfolioData` e importado/usado em:
  - `src/pages/portfolio.jsx:4,166`
  - `src/pages/portfolioCategory.jsx:4,132`
- `Lightbox` interno usa `item.src` para renderizar imagem:
  - `src/pages/portfolio.jsx:118-123`
  - `src/pages/portfolioCategory.jsx:114-119`

## Como verificar
```powershell
rg -n "/images/portfolio/" src/data/portfolio.js
rg --files public
```

## Como resolver
1. Adicionar os arquivos referenciados em `public/images/portfolio/...`.
2. Ou ajustar `src` em `src/data/portfolio.js` para caminhos existentes.

## 2) Refresh em rotas SPA retorna 404 no servidor

## Sinal observavel
- Sem fallback de SPA no servidor, atualizar `/blog/...` ou `/portfolio/...` pode quebrar.
- O repo ja possui fallback Apache em `public/.htaccess:1-11`.

Relacao com funcoes/componentes:
- Rotas cliente definidas em `src/App.jsx:18-30`:
  - `BlogDashboard`, `BlogCategory`, `BlogArticle`, `Portfolio`, `PortfolioCategory`.
- Esses componentes sao importados em `src/App.jsx:4-6`, `src/App.jsx:8`, `src/App.jsx:10` e usados em `src/App.jsx:19-21`, `src/App.jsx:28-29`.

## Como verificar
```powershell
Get-Content public/.htaccess
```

## Como resolver
1. Em Apache, garantir regras equivalentes as de `public/.htaccess`.
2. Em host sem Apache, configurar fallback para `index.html` na plataforma (regra equivalente).

## 3) Classes utilitarias fora do padrao Tailwind podem nao aplicar

## Sinal observavel
Ocorrencias com formato nao-arbitrary (exemplos):
- `max-w-420px` em `src/components/blog/CategoryRail.jsx:189`, `src/components/blog/RailSkeleton.jsx:20`
- `min-h-360px` em `src/pages/blog/BlogDashboard.jsx:21`
- `z-9999` / `z-10000` em `src/pages/portfolio.jsx:58,74` e `src/pages/portfolioCategory.jsx:56,70`
- `md:h-65` em `src/pages/portfolio.jsx:140`

## Impacto
- Estilo pode nao ser aplicado como esperado dependendo da configuracao/utilitario aceito.

Relacao com funcoes/componentes:
- `CategoryRail` importado em `src/pages/blog/BlogDashboard.jsx:4`; usado em `src/pages/blog/BlogDashboard.jsx:122`.
- `RailSkeleton` importado em `src/pages/blog/BlogDashboard.jsx:7`; usado em `src/pages/blog/BlogDashboard.jsx:117`.
- `Lightbox` (funcoes internas) em `src/pages/portfolio.jsx:20` e `src/pages/portfolioCategory.jsx:20`; uso interno em `src/pages/portfolio.jsx:245`, `src/pages/portfolioCategory.jsx:235`.

## Como verificar
```powershell
rg -n "max-w-420px|min-h-360px|min-h-460px|min-h-260px|z-9999|z-10000|md:h-65" src
```

## Como resolver
1. Converter para sintaxe arbitrary quando necessario (ex.: `max-w-[420px]`, `min-h-[360px]`, `z-[9999]`).
2. Revisar visual apos ajuste com `npm run dev`.

## 4) Componentes/paginas sem uso direto

## Sinal observavel
- Componentes exportados sem importacao no app atual:
  - `Card` (`src/components/Card.jsx:1`)
  - `CreateAccountCTA` (`src/components/CreateAccountCTA.jsx:3`)
- Pagina auxiliar sem rota:
  - `Blog` (`src/pages/Blog.jsx:4`)

## Impacto
- Aumenta manutencao e confunde leitura do estado real da aplicacao.

Relacao com funcoes/componentes:
- `Card`: nao encontrado uso direto.
- `CreateAccountCTA`: nao encontrado uso direto.
- `Blog` (`src/pages/Blog.jsx:4`): nao encontrado uso direto no roteador `src/App.jsx`.

## Como verificar
```powershell
rg -n "export default function (Card|CreateAccountCTA|Blog)" src/pages src/components
rg -n "import .*CreateAccountCTA|import .*Card|./pages/Blog" src
```

## Como resolver
1. Decidir entre remover, arquivar ou plugar nas rotas/telas.
2. Se mantiver sem uso, documentar explicitamente como componente utilitario/rascunho.

## 5) Peer deps e install warnings (quando aparecer no ambiente local)

## Sinal observavel
- Durante `npm install`, podem surgir warnings de peer dependency conforme versoes do ambiente.
- O repo nao versiona logs de install; diagnostico depende da maquina local.

Relacao com componentes/funcoes:
- Nao se aplica a uma funcao/componente especifica do app.

## Como verificar
```powershell
npm install
npm ls
```

## Como resolver
1. Fixar versoes no lockfile e usar Node/NPM compativeis com o time.
2. Tratar warnings criticos antes do deploy.
