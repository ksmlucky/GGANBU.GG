import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <span className={styles.copyright}>
          Copyrightⓒ2020 EF.GG All rights reserved
        </span>
      </footer>
    </>
  );
}
