import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";

interface CardProps {
  children: ReactNode;
  additionalStyles?: CSSProperties;
}

export function Card({ children, additionalStyles }: CardProps) {
  return (
    <div className={styles.cardContainer} style={{ ...additionalStyles }}>
      <div className={styles.cardContentWrapper}>{children}</div>
    </div>
  );
}
