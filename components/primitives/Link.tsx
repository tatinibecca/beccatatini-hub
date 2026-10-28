import NextLink from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { Icon } from "./Icon";
import styles from "./Link.module.css";

type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "inline" | "standalone";
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

export function Link({ href, variant = "inline", className, children, ...rest }: LinkProps) {
  const external = isExternal(href);
  const classes = [styles.link, variant === "standalone" && styles.standalone, external && styles.external, className]
    .filter(Boolean)
    .join(" ");

  const icon = (external || variant === "standalone") && (
    <Icon name={external ? "arrow-up-right" : "arrow-right"} className={styles.icon} />
  );

  // No inline, a última palavra e o ícone ficam juntos: o ícone nunca quebra sozinho para a linha seguinte
  let body: React.ReactNode = (
    <>
      {children}
      {icon}
    </>
  );
  if (icon && variant === "inline" && typeof children === "string") {
    const cut = children.lastIndexOf(" ") + 1;
    body = (
      <>
        {children.slice(0, cut)}
        <span className={styles.nowrap}>
          {children.slice(cut)}
          {"\u00a0"}
          {icon}
        </span>
      </>
    );
  }

  const content = (
    <>
      {body}
      {external && <span className={styles.srOnly}> (abre em nova aba)</span>}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes} {...rest}>
      {content}
    </NextLink>
  );
}
