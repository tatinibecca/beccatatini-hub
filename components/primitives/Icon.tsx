import { ArrowRight, ArrowUpRight, Check, LoaderCircle, type LucideProps } from "lucide-react";

/*
 * Conjunto único: Lucide (traço 2). Registre aqui cada ícone usado no site,
 * para o conjunto continuar pequeno e consistente.
 */
const icons = {
  check: Check,
  "arrow-up-right": ArrowUpRight,
  "arrow-right": ArrowRight,
  loader: LoaderCircle,
} as const;

export type IconName = keyof typeof icons;

type IconProps = Omit<LucideProps, "ref"> & { name: IconName };

export function Icon({ name, ...rest }: IconProps) {
  const Component = icons[name];
  return <Component strokeWidth={2} aria-hidden="true" focusable="false" {...rest} />;
}
