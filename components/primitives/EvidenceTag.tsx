import styles from "./EvidenceTag.module.css";

export type Evidence = "verified" | "qualitative" | "hypothesis" | "unavailable";

const labels: Record<Evidence, string> = {
  verified: "Verificado",
  qualitative: "Qualitativo",
  hypothesis: "Hipótese",
  unavailable: "Não disponível",
};

/* Glifos em grade 12: cheio · meio · contorno · traço */
const glyphs: Record<Evidence, React.ReactNode> = {
  verified: <circle cx="6" cy="6" r="5" fill="currentColor" />,
  qualitative: (
    <>
      <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" />
      <path d="M6 1.5a4.5 4.5 0 0 1 0 9z" fill="currentColor" />
    </>
  ),
  hypothesis: <circle cx="6" cy="6" r="4.5" fill="none" stroke="currentColor" strokeDasharray="2 1.5" />,
  unavailable: <path d="M2 6h8" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />,
};

export function EvidenceTag({ evidence, className }: { evidence: Evidence; className?: string }) {
  return (
    <span className={[styles.tag, styles[evidence], className].filter(Boolean).join(" ")}>
      <svg viewBox="0 0 12 12" className={styles.glyph} aria-hidden="true" focusable="false">
        {glyphs[evidence]}
      </svg>
      <span className={styles.srOnly}>Evidência: </span>
      {labels[evidence]}
    </span>
  );
}
