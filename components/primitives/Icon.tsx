import type { SVGProps } from "react";

/*
 * Conjunto mínimo para a Fase 1. Traço único (2) em grade 24.
 * ⏳ A biblioteca de ícones definitiva ainda não foi escolhida.
 */
const paths = {
  check: <path d="M20 6 9 17l-5-5" />,
  "arrow-up-right": <path d="M7 17 17 7M7 7h10v10" />,
  "arrow-right": <path d="M5 12h14M12 5l7 7-7 7" />,
  loader: <path d="M21 12a9 9 0 1 1-6.22-8.56" />,
} as const;

export type IconName = keyof typeof paths;

type IconProps = SVGProps<SVGSVGElement> & { name: IconName };

export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
