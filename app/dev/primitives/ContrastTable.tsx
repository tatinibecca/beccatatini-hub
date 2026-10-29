"use client";

import { useEffect, useState } from "react";

/* Lê os valores direto de tokens.css (via getComputedStyle) e calcula o contraste WCAG 2.2. */
type Pair = { fg: string; bg: string; use: string; min: 4.5 | 3 };

const pairs: Pair[] = [
  { fg: "--text-primary", bg: "--surface-canvas", use: "Texto principal", min: 4.5 },
  { fg: "--text-primary", bg: "--surface-raised", use: "Chip padrão", min: 4.5 },
  { fg: "--text-primary", bg: "--surface-muted", use: "Chip hover, EvidenceTag qualitativo", min: 4.5 },
  { fg: "--text-primary", bg: "--border-subtle", use: "Ghost hover/pressionado, Chip pressionado", min: 4.5 },
  { fg: "--text-secondary", bg: "--surface-canvas", use: "Texto secundário, EvidenceTag não disponível", min: 4.5 },
  { fg: "--text-secondary", bg: "--surface-muted", use: "Desabilitado, Tag neutra", min: 4.5 },
  { fg: "--text-accent", bg: "--surface-canvas", use: "Link, Botão secundário, Tag de destaque", min: 4.5 },
  { fg: "--text-accent", bg: "--surface-raised", use: "Link sobre superfície elevada", min: 4.5 },
  { fg: "--action-primary-hover", bg: "--surface-muted", use: "Botão secundário hover", min: 4.5 },
  { fg: "--action-primary-hover", bg: "--border-subtle", use: "Botão secundário pressionado", min: 4.5 },
  { fg: "--action-on-primary", bg: "--action-primary", use: "Botão primário", min: 4.5 },
  { fg: "--action-on-primary", bg: "--action-primary-hover", use: "Botão primário hover/pressionado", min: 4.5 },
  { fg: "--text-on-inverse", bg: "--surface-inverse", use: "Chip selecionado, EvidenceTag verificado", min: 4.5 },
  { fg: "--text-accent-on-inverse", bg: "--surface-inverse", use: "Destaque sobre verde", min: 4.5 },
  { fg: "--text-accent-pink", bg: "--surface-canvas", use: "Tag rosa", min: 4.5 },
  { fg: "--focus-ring", bg: "--surface-canvas", use: "Anel de foco (não-texto)", min: 3 },
  { fg: "--focus-ring-on-inverse", bg: "--surface-inverse", use: "Anel de foco sobre o verde (não-texto)", min: 3 },
  { fg: "--feedback-success", bg: "--surface-canvas", use: "Texto de sucesso", min: 4.5 },
  { fg: "--feedback-error", bg: "--surface-canvas", use: "Texto de erro", min: 4.5 },
  { fg: "--feedback-info", bg: "--surface-canvas", use: "Texto informativo", min: 4.5 },
  { fg: "--text-secondary", bg: "--surface-raised", use: "Borda do chip em hover (não-texto)", min: 3 },
  { fg: "--brand-orange", bg: "--surface-canvas", use: "Laranja de marca — só decorativo", min: 3 },
  { fg: "--brand-pink", bg: "--surface-canvas", use: "Rosa de marca — só decorativo, nunca carrega informação", min: 3 },
];

function luminance(hex: string) {
  let n = hex.replace("#", "");
  if (n.length === 3) n = [...n].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(n.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export function ContrastTable() {
  const [values, setValues] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    const names = new Set(pairs.flatMap((p) => [p.fg, p.bg]));
    setValues(Object.fromEntries([...names].map((n) => [n, style.getPropertyValue(n).trim()])));
  }, []);

  if (!values) return <p>Calculando contraste…</p>;

  return (
    <div className="overflow-x-auto">
      <table className="contrast-table">
        <caption className="sr-only">Contraste medido dos pares de tokens usados nos primitivos</caption>
        <thead>
          <tr>
            <th scope="col">Amostra</th>
            <th scope="col">Texto / elemento</th>
            <th scope="col">Fundo</th>
            <th scope="col">Uso</th>
            <th scope="col">Razão</th>
            <th scope="col">Mínimo</th>
            <th scope="col">Resultado</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map((p) => {
            const r = ratio(values[p.fg], values[p.bg]);
            const pass = r >= p.min;
            return (
              <tr key={p.fg + p.bg}>
                <td>
                  {p.min === 4.5 ? (
                    <span className="contrast-sample" style={{ color: `var(${p.fg})`, background: `var(${p.bg})` }}>
                      Aa
                    </span>
                  ) : (
                    <span className="contrast-sample" style={{ background: `var(${p.bg})` }} aria-hidden="true">
                      <span className="contrast-dot" style={{ background: `var(${p.fg})` }} />
                    </span>
                  )}
                </td>
                <td><code>{p.fg}</code> {values[p.fg]}</td>
                <td><code>{p.bg}</code> {values[p.bg]}</td>
                <td>{p.use}</td>
                <td>{r.toFixed(2).replace(".", ",")}:1</td>
                <td>{p.min.toString().replace(".", ",")}:1</td>
                <td>{pass ? "✅ Passa" : "❌ Não passa"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
