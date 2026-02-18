---
title: "Gestao continua de debito tecnico"
slug: "gestao-continua-debito-tecnico"
category: "engenharia"
updatedAt: "2026-02-13"
summary: "Um fluxo simples para tratar debito tecnico sem pausar entregas de produto."
cover: "/images/blog/covers/placeholder-1.svg"
tags: ["debito-tecnico", "processo"]
pinned: false
---

## Debito com criterio

Nem todo debito precisa ser removido agora; o foco deve ser risco operacional e custo recorrente.

## Prioridade semanal

- Classificar impacto tecnico
- Reservar capacidade fixa por sprint
- Medir reducao de incidentes

```js
export function shouldScheduleDebtTask({ risk, recurrence }) {
  return risk === "high" || recurrence > 3;
}
```

