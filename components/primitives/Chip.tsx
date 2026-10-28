import type { ButtonHTMLAttributes } from "react";
import { Icon } from "./Icon";
import styles from "./Chip.module.css";

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-pressed"> & {
  selected?: boolean;
};

export function Chip({ selected = false, className, children, type = "button", ...rest }: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={[styles.chip, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {selected && <Icon name="check" className={styles.icon} />}
      {children}
    </button>
  );
}
