"use client";

import { useState } from "react";
import { Chip } from "@/components/primitives";

/* Rótulos de exemplo, só para testar o comportamento. Os filtros reais vêm dos cases (Fase 4). */
const options = ["Filtro A", "Filtro B", "Filtro C"];

export function ChipDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (o: string) =>
    setSelected((s) => (s.includes(o) ? s.filter((x) => x !== o) : [...s, o]));

  return (
    <div role="group" aria-label="Exemplo de filtros" className="flex flex-wrap gap-2">
      {options.map((o) => (
        <Chip key={o} selected={selected.includes(o)} onClick={() => toggle(o)}>
          {o}
        </Chip>
      ))}
    </div>
  );
}
