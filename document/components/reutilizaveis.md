# Componentes Reutilizaveis (fora do modulo blog)

## Navegacao

- Hub principal: [`document/README.md`](../README.md)
- Layout global: [`document/docs/architecture/layout-global.md`](../docs/architecture/layout-global.md)

## Escopo

Arquivos cobertos em `src/components/`:

- `ButtonLinkCreateAccount.jsx`
- `Card.jsx`
- `CreateAccountCTA.jsx`
- `form.jsx`
- `Hero.jsx`
- `LinkTree.jsx`
- `NavBar.jsx`
- `Sidebar.jsx`
- `Text.jsx`

## `ButtonLinkCreateAccount` - `src/components/ButtonLinkCreateAccount.jsx`

Responsabilidade:

- Renderizar CTA de criacao de conta em dois modos:
  - `as="link"` (padrao)
  - `as="button"` (submit)

Props:

- `as` (`"link" | "button"`, default `"link"`) - `src/components/ButtonLinkCreateAccount.jsx:4`
- `label` (string, default `"Criar conta"`) - `src/components/ButtonLinkCreateAccount.jsx:5`
- `to` (string, default `"/signup"`) - `src/components/ButtonLinkCreateAccount.jsx:6`

Importacao/uso:

- Importado em `src/pages/home.jsx:4`; usado em `src/pages/home.jsx:57`.
- Importado em `src/pages/signup.jsx:3`; usado em `src/pages/signup.jsx:57`.

Exemplo real:

```jsx
<ButtonLinkCreateAccount />
<ButtonLinkCreateAccount as="button" label="Cadastrar" />
```

## `Card` - `src/components/Card.jsx`

Responsabilidade:

- Card simples com titulo e descricao.

Props:

- `title` (string) - `src/components/Card.jsx:1`
- `description` (string) - `src/components/Card.jsx:1`

Importacao/uso:

- Nao encontrado uso direto.

Exemplo possivel (nao utilizado atualmente):

```jsx
<Card title="Titulo" description="Descricao" />
```

## `CreateAccountCTA` - `src/components/CreateAccountCTA.jsx`

Responsabilidade:

- Bloco de CTA com links para `/signup` e `/profile`.

Props:

- Sem props.

Importacao/uso:

- Nao encontrado uso direto.

Exemplo possivel (nao utilizado atualmente):

```jsx
<CreateAccountCTA />
```

## `Form` - `src/components/form.jsx`

Responsabilidade:

- Campo de formulario padronizado com `label + input`.

Props:

- `placeholder` (string) - `src/components/form.jsx:1`
- `id` (string) - `src/components/form.jsx:1`
- `name` (string) - `src/components/form.jsx:1`
- `type` (string, default `"text"`) - `src/components/form.jsx:1`

Importacao/uso:

- Importado em `src/pages/home.jsx:3`; usado em `src/pages/home.jsx:33`, `src/pages/home.jsx:40`.
- Importado em `src/pages/signup.jsx:2`; usado em `src/pages/signup.jsx:34`, `src/pages/signup.jsx:36`, `src/pages/signup.jsx:43`, `src/pages/signup.jsx:50`.

Exemplo real:

```jsx
<Form id="email" name="Email" type="email" placeholder="seuemail@exemplo.com" />
```

## `Hero` - `src/components/Hero.jsx`

Responsabilidade:

- Bloco de apresentacao principal na home.

Props:

- Sem props.

Importacao/uso:

- Importado em `src/pages/home.jsx:1`; usado em `src/pages/home.jsx:18`.

Exemplo real:

```jsx
<Hero />
```

## `LinkTree` - `src/components/LinkTree.jsx`

Responsabilidade:

- Lista organizada de links externos (textos, desenhos, doacao e redes).

Props:

- Sem props.

Dependencias internas:

- Usa `Text` (`src/components/LinkTree.jsx:1`, uso em `src/components/LinkTree.jsx:24`, `src/components/LinkTree.jsx:31`, `src/components/LinkTree.jsx:37`, `src/components/LinkTree.jsx:40`).
- Usa `LinkItem` interno (`src/components/LinkTree.jsx:3`), sem importacao externa.

Importacao/uso:

- Importado em `src/pages/home.jsx:2`; usado em `src/pages/home.jsx:21`.

Exemplo real:

```jsx
<LinkTree />
```

## `Navbar` - `src/components/NavBar.jsx`

Responsabilidade:

- Navegacao superior com logo e links principais.

Props:

- Sem props.

Dependencias internas:

- `LinkItemNav` interno (`src/components/NavBar.jsx:4`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/components/NavBar.jsx:28-30`.

Importacao/uso:

- Importado em `src/layouts/AppLayout.jsx:2`; usado em `src/layouts/AppLayout.jsx:8`.

Exemplo real:

```jsx
<Navbar />
```

## `Sidebar` - `src/components/Sidebar.jsx`

Responsabilidade:

- Navegacao lateral secundaria com secoes (navegacao e extra).

Props:

- Sem props.

Dependencias internas:

- `Section` (`src/components/Sidebar.jsx:4`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/components/Sidebar.jsx:57`, `src/components/Sidebar.jsx:81`.
- `SideNavItem` (`src/components/Sidebar.jsx:15`)
  - Nao encontrado uso direto por importacao externa.
  - Uso interno em `src/components/Sidebar.jsx:58-62`, `src/components/Sidebar.jsx:82`.
- `ExternalItem` (`src/components/Sidebar.jsx:33`)
  - Nao encontrado uso direto por importacao externa.
  - Nao encontrado uso direto em runtime atual (bloco comentado em `src/components/Sidebar.jsx:66-79`).

Importacao/uso:

- Importado em `src/layouts/AppLayout.jsx:3`; usado em `src/layouts/AppLayout.jsx:13`.

Exemplo real:

```jsx
<Sidebar />
```

## `Text` - `src/components/Text.jsx`

Responsabilidade:

- Wrapper simples para texto (`<p>` estilizado).

Props:

- `children` - `src/components/Text.jsx:1`

Importacao/uso:

- Importado em `src/components/LinkTree.jsx:1`; usado em `src/components/LinkTree.jsx:24`, `src/components/LinkTree.jsx:31`, `src/components/LinkTree.jsx:37`, `src/components/LinkTree.jsx:40`.

Exemplo real:

```jsx
<Text children="Meus textos:" />
```

## Implementado

- Todos os componentes acima existem e compilam no projeto.
- Uso direto confirmado para: `ButtonLinkCreateAccount`, `Form`, `Hero`, `LinkTree`, `Navbar`, `Sidebar`, `Text`.
- Sem uso direto confirmado para: `Card`, `CreateAccountCTA`.

## Planejado

- Revisar e remover/reativar componentes sem uso direto (`Card`, `CreateAccountCTA`) conforme decisao de produto.
- Se reativados, documentar rotas/paginas consumidoras.
