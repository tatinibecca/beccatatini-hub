import type { HTMLAttributes } from "react";
import styles from "./Tag.module.css";

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "neutral" | "accent" | "pink" | "inverse";
};

export function Tag({ variant = "neutral", className, ...rest }: TagProps) {
  return <span className={[styles.tag, styles[variant], className].filter(Boolean).join(" ")} {...rest} />;
}
