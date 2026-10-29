import type { Metadata } from "next";
import { Button, Chip, EvidenceTag, Link, Tag } from "@/components/primitives";
import { ChipDemo } from "./ChipDemo";
import { ContrastTable } from "./ContrastTable";
import "./dev.css";

export const metadata: Metadata = {
  title: "Primitivos · Dev",
  robots: { index: false, follow: false },
};

/* Os estados hover/pressionado/foco abaixo são fixados via data-force só para revisão visual. */
const states = [
  { label: "Padrão", props: {} },
  { label: "Hover", props: { "data-force": "hover" } },
  { label: "Pressionado", props: { "data-force": "active" } },
  { label: "Foco (teclado)", props: { "data-force": "focus" } },
  { label: "Desabilitado", props: { disabled: true } },
  { label: "Carregando", props: { loading: true } },
] as const;

const variants = [
  { key: "primary", label: "Primário" },
  { key: "secondary", label: "Secundário" },
  { key: "ghost", label: "Terciário (ghost)" },
] as const;

const typeScale = [
  { token: "display-lg", spec: "48/56 · 36/44 mobile", display: true },
  { token: "display-md", spec: "40/48 · 32/40 mobile", display: true },
  { token: "h1", spec: "32/40 · 28/36 mobile", display: true },
  { token: "h2", spec: "24/32", display: true },
  { token: "h3", spec: "20/28", display: false },
  { token: "body-lg", spec: "18/28 · leitura de case", display: false },
  { token: "body-md", spec: "16/24 · padrão", display: false },
  { token: "body-sm", spec: "14/20", display: false },
  { token: "label", spec: "14/20 · botões e nav", display: false },
  { token: "caption", spec: "12/16 · só info não essencial", display: false },
];

const colors = [
  "--brand-orange", "--brand-pink", "--brand-forest",
  "--surface-canvas", "--surface-raised", "--surface-muted", "--surface-inverse", "--border-subtle",
  "--text-primary", "--text-secondary", "--text-on-inverse", "--text-accent", "--text-accent-on-inverse", "--text-accent-pink",
  "--action-primary", "--action-primary-hover", "--action-on-primary", "--focus-ring", "--focus-ring-on-inverse",
  "--feedback-success", "--feedback-error", "--feedback-info",
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="dev-section">
      <h2 id={id} className="text-h2 mb-6">{title}</h2>
      {children}
    </section>
  );
}

function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="dev-cell">
      <span className="dev-label">{label}</span>
      {children}
    </div>
  );
}

export default function PrimitivesPage() {
  return (
    <main className="mx-auto px-4 py-12 md:px-8">
      <header className="mb-8">
        <p className="dev-label mb-2">Fase 1 · página de revisão interna</p>
        <h1 className="text-display-md">Primitivos</h1>
        <p className="text-body-lg text-ink-secondary mt-4" style={{ maxWidth: "var(--measure)" }}>
          Tokens, fontes e primitivos com todos os estados. Os estados de hover, pressionado e foco estão fixados
          para revisão; todos os componentes também respondem de verdade ao mouse e ao teclado.
        </p>
      </header>

      <Section id="tipografia" title="Tipografia">
        <dl className="flex flex-col gap-6">
          {typeScale.map((t) => (
            <div key={t.token} className="flex flex-col gap-1">
              <dt className="dev-label">
                --text-{t.token} · {t.spec} · {t.display ? "Playfair Display" : "General Sans"}
              </dt>
              <dd
                style={{
                  fontSize: `var(--text-${t.token})`,
                  lineHeight: `var(--leading-${t.token})`,
                  fontFamily: t.display ? "var(--font-display)" : "var(--font-body)",
                  fontWeight: t.display ? "var(--weight-semibold)" : t.token === "label" ? "var(--weight-medium)" : undefined,
                }}
              >
                Design de produto com evidência
              </dd>
            </div>
          ))}
          <div className="flex flex-col gap-1">
            <dt className="dev-label">Playfair Display 500 itálico · só em citações</dt>
            <dd className="text-h2" style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: "var(--weight-medium)" }}>
              Design de produto com evidência
            </dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="dev-label">General Sans · pesos 400 / 500 / 600</dt>
            <dd className="flex flex-wrap gap-6 text-body-md">
              <span className="font-regular">Regular 400</span>
              <span className="font-medium">Medium 500</span>
              <span className="font-semibold">Semibold 600</span>
            </dd>
          </div>
        </dl>
      </Section>

      <Section id="cores" title="Cores (tokens)">
        <div className="dev-grid">
          {colors.map((c) => (
            <Cell key={c} label={c}>
              <span className="dev-swatch" style={{ background: `var(${c})` }} />
            </Cell>
          ))}
        </div>
      </Section>

      <Section id="contraste" title="Contraste conferido (WCAG 2.2 AA)">
        <p className="text-body-md text-ink-secondary mb-6" style={{ maxWidth: "var(--measure)" }}>
          Calculado no navegador a partir dos valores de tokens.css. Texto exige 4,5:1; elementos não textuais, 3:1.
        </p>
        <ContrastTable />
      </Section>

      <Section id="button" title="Button">
        {(["md", "sm"] as const).map((size) => (
          <div key={size} className="mb-8">
            <h3 className="text-h3 font-semibold mb-4">Tamanho {size === "md" ? "md · 44px" : "sm · 32px"}</h3>
            {variants.map((v) => (
              <div key={v.key} className="mb-6">
                <p className="text-label font-medium mb-2">{v.label}</p>
                <div className="dev-grid">
                  {states.map((s) => (
                    <Cell key={s.label} label={s.label}>
                      <Button variant={v.key} size={size} {...s.props}>
                        Rótulo
                      </Button>
                    </Cell>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
        <h3 className="text-h3 font-semibold mb-4">Com ícone</h3>
        <div className="flex flex-wrap gap-4">
          <Button icon="arrow-right">Rótulo</Button>
          <Button variant="secondary" icon="arrow-up-right">Rótulo</Button>
        </div>
      </Section>

      <Section id="chip" title="Chip (filtro)">
        <div className="dev-grid mb-8">
          <Cell label="Padrão"><Chip>Filtro</Chip></Cell>
          <Cell label="Hover"><Chip data-force="hover">Filtro</Chip></Cell>
          <Cell label="Pressionado"><Chip data-force="active">Filtro</Chip></Cell>
          <Cell label="Foco (teclado)"><Chip data-force="focus">Filtro</Chip></Cell>
          <Cell label="Selecionado"><Chip selected>Filtro</Chip></Cell>
          <Cell label="Selecionado + foco"><Chip selected data-force="focus">Filtro</Chip></Cell>
          <Cell label="Desabilitado"><Chip disabled>Filtro</Chip></Cell>
        </div>
        <h3 className="text-h3 font-semibold mb-4">Interativo (aria-pressed)</h3>
        <ChipDemo />
      </Section>

      <Section id="tag" title="Tag (estática)">
        <div className="dev-grid">
          <Cell label="Neutra"><Tag>Rótulo</Tag></Cell>
          <Cell label="Destaque"><Tag variant="accent">Rótulo</Tag></Cell>
          <Cell label="Rosa (1 por tela)"><Tag variant="pink">Rótulo</Tag></Cell>
          <Cell label="Inversa"><Tag variant="inverse">Rótulo</Tag></Cell>
        </div>
      </Section>

      <Section id="evidencetag" title="EvidenceTag">
        <div className="dev-grid">
          <Cell label="verified"><EvidenceTag evidence="verified" /></Cell>
          <Cell label="qualitative"><EvidenceTag evidence="qualitative" /></Cell>
          <Cell label="hypothesis"><EvidenceTag evidence="hypothesis" /></Cell>
          <Cell label="unavailable"><EvidenceTag evidence="unavailable" /></Cell>
        </div>
      </Section>

      <Section id="link" title="Link">
        {(
          [
            { label: "Inline", variant: "inline", href: "/dev/primitives" },
            { label: "Standalone", variant: "standalone", href: "/dev/primitives" },
            { label: "Externo (nova aba)", variant: "standalone", href: "https://rebeccatatini.substack.com" },
          ] as const
        ).map((l) => (
          <div key={l.label} className="mb-6">
            <p className="text-label font-medium mb-2">{l.label}</p>
            <div className="dev-grid">
              {(["", "hover", "active", "focus"] as const).map((f) => (
                <Cell key={f} label={{ "": "Padrão", hover: "Hover", active: "Pressionado", focus: "Foco (teclado)" }[f]}>
                  <Link href={l.href} variant={l.variant} data-force={f || undefined}>
                    Texto do link
                  </Link>
                </Cell>
              ))}
            </div>
          </div>
        ))}
        <p className="text-body-md mt-4" style={{ maxWidth: "var(--measure)" }}>
          Link inline em texto corrido: exemplo de frase com <Link href="/dev/primitives">um link no meio</Link> e
          outro <Link href="https://rebeccatatini.substack.com">link externo</Link> para conferir alinhamento.
        </p>
      </Section>

      <Section id="inversa" title="Sobre superfície inversa">
        <div data-surface="inverse" className="dev-inverse flex flex-wrap items-center gap-4">
          <EvidenceTag evidence="verified" />
          <Tag variant="inverse">Rótulo</Tag>
          <Chip data-force="focus">Foco sobre o verde</Chip>
          <span style={{ color: "var(--text-accent-on-inverse)" }} className="font-medium">
            Texto de destaque sobre verde
          </span>
        </div>
      </Section>
    </main>
  );
}
