# 60 - Profile e Signup

## Navegacao
- Hub principal: [`document/README.md`](../README.md)
- Componentes reutilizaveis: [`document/components/reutilizaveis.md`](../components/reutilizaveis.md)

## Rotas

Definidas em `src/App.jsx`:
- `/profile` -> `Profile` (`src/App.jsx:24`)
- `/signup` -> `Signup` (`src/App.jsx:25`)

Importacao/uso no roteador:
- `Profile` importado em `src/App.jsx:7`; usado em `src/App.jsx:24`.
- `Signup` importado em `src/App.jsx:9`; usado em `src/App.jsx:25`.

## Implementado

## 1) `/profile` (`src/pages/profile.jsx`)
- Estado atual: placeholder textual.
- Implementacao:
  - componente `Profile` em `src/pages/profile.jsx:1-7`.
  - renderiza apenas texto estatico em `src/pages/profile.jsx:3-5`.

Funcoes/componentes descritos e uso:
- `Profile` (`src/pages/profile.jsx:1`)
  - Importado em `src/App.jsx:7`; usado em `src/App.jsx:24`.

## 2) `/signup` (`src/pages/signup.jsx`)
- Estado atual: formulario local sem persistencia externa.
- Implementacao:
  - coleta `name`, `email`, `password`, `confirm` com `FormData` (`src/pages/signup.jsx:8-13`).
  - valida igualdade de senha (`src/pages/signup.jsx:15-18`).
  - em sucesso faz `console.log` (`src/pages/signup.jsx:20`).
  - link para voltar ao login (`src/pages/signup.jsx:59-64`).

Funcoes/componentes descritos e uso:
- `Signup` (`src/pages/signup.jsx:5`)
  - Importado em `src/App.jsx:9`; usado em `src/App.jsx:25`.
- `handleSignup` (`src/pages/signup.jsx:6`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/pages/signup.jsx:33` (`onSubmit`).
- `Form` (`src/components/form.jsx:1`)
  - Importado em `src/pages/signup.jsx:2`; usado em `src/pages/signup.jsx:34`, `src/pages/signup.jsx:36`, `src/pages/signup.jsx:43`, `src/pages/signup.jsx:50`.
- `ButtonLinkCreateAccount` (`src/components/ButtonLinkCreateAccount.jsx:3`)
  - Importado em `src/pages/signup.jsx:3`; usado em `src/pages/signup.jsx:57`.

## 3) Componentes relacionados de conta (fora da rota)

## `ButtonLinkCreateAccount`
- Arquivo: `src/components/ButtonLinkCreateAccount.jsx`
- Uso real:
  - em `src/pages/home.jsx:4,57` (modo link/CTA)
  - em `src/pages/signup.jsx:3,57` (modo botao de submit)

## `CreateAccountCTA`
- Arquivo: `src/components/CreateAccountCTA.jsx`
- Estado atual:
  - Componente existe.
  - Nao encontrado uso direto por importacao no projeto atual.

## `Card`
- Arquivo: `src/components/Card.jsx`
- Estado atual:
  - Componente existe.
  - Nao encontrado uso direto por importacao no projeto atual.

## Planejado (nao implementado)

TODOs sugeridos para evolucao de `/profile` e `/signup`:
- Integrar autenticacao real (backend/API).
- Persistir cadastro em banco/servico.
- Substituir `alert/console.log` por mensagens de erro/sucesso na UI.
- Adicionar validacao de senha mais robusta (forca, regras minimas).
- Em `/profile`, adicionar edicao de dados do usuario e foto (quando houver backend).
- Criar fluxo de recuperacao de senha.

Observacao:
- Todos os itens acima sao planejados e nao existem no comportamento atual.
