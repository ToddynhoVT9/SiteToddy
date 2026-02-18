---
title: "Testes de contrato entre servicos"
slug: "testes-contrato-entre-servicos"
category: "engenharia"
updatedAt: "2026-02-14"
summary: "Estrutura minima para validar acordos entre consumidores e provedores de API."
cover: "/images/blog/covers/placeholder-1.svg"
tags: ["testes", "api"]
pinned: false
---

## Onde contratos quebram

A maioria das quebras ocorre quando payload muda sem alinhamento com quem consome o endpoint.

## Checklist de seguranca

- Versionar schema de resposta
- Validar contrato no pipeline
- Rejeitar build em quebra incompativel

```js
export function contractIsValid(expectedVersion, receivedVersion) {
  return expectedVersion === receivedVersion;
}
```


