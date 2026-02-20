# Como Rodar o Projeto em Outro Computador

Este guia explica passo a passo como executar o projeto React + Vite +
Tailwind em outro computador a partir de um arquivo `.zip`.

---

## 1. Pré-requisitos

Antes de rodar o projeto, o computador precisa ter:

### Node.js (obrigatório)

Baixe e instale: https://nodejs.org/

Após instalar, abra o terminal e verifique:

```bash
node -v
npm -v
```

Se aparecerem versões, está tudo certo.

---

## 2. Extraindo o Projeto

1.  Copie o arquivo `.zip` para o novo computador\
2.  Extraia o conteúdo\
3.  Abra a pasta do projeto\
4.  Abra o terminal dentro da pasta do projeto

No Windows: - Shift + clique direito → "Abrir terminal aqui" ou - Clique
na barra de endereço da pasta, digite `cmd` e pressione Enter

---

## 3. Instalar Dependências

O projeto possui um arquivo `package.json`, que contém a lista de
dependências.

Você precisa instalar tudo novamente executando:

```bash
npm install
```

Isso irá: - Criar a pasta `node_modules` - Baixar todas as bibliotecas
necessárias - Preparar o ambiente do projeto

Se houver erro de conflito de dependências:

```bash
npm install --legacy-peer-deps
```

---

## 4. Rodar em Modo Desenvolvimento

Após instalar as dependências:

```bash
npm run dev
```

O terminal mostrará algo como:

    Local: http://localhost:5173

Abra esse endereço no navegador.

---

## 5. Gerar Build de Produção

Para gerar a versão final otimizada:

```bash
npm run build
```

Isso criará a pasta:

    dist/

Para testar a versão de produção localmente:

```bash
npm run preview
```

---

## 6. Estrutura Importante do Projeto

Arquivos principais:

    package.json      → Dependências e scripts
    vite.config.js    → Configuração do Vite
    src/              → Código fonte
    public/           → Arquivos estáticos
    node_modules/     → Dependências (gerado após npm install)
    dist/             → Build final (gerado após npm run build)

---

## 7. Problemas Comuns

### Erro: ERESOLVE could not resolve

Solução:

```bash
npm install --legacy-peer-deps
```

---

### Erro: Porta já em uso

Se a porta estiver ocupada, você pode rodar:

```bash
npm run dev -- --port 3000
```

---

### Projeto não abre no navegador

Verifique: - Se o Node está instalado - Se o `npm install` foi
executado - Se não houve erro no terminal

---

## 8. Mais Dicas

Nunca envie a pasta `node_modules` no zip.

O correto é enviar apenas:

    src/
    public/
    package.json
    vite.config.js
    tailwind.config.js
    postcss.config.js
    index.html

Quem receber o projeto executa `npm install`.

---
