import Link from "next/link";
import styles from "./Header.module.css";

export default function Header({ children }) {
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <a className={styles.logo}>EF.GG</a>
        </Link>
        {children}
      </header>
    </>
  );
}
