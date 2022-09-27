import styles from "./Footer.module.css";

export default function Footer({ setMode }) {
  return (
    <>
      <footer className={styles.footer}>
        <span className={styles.copyright}>
          Copyrightⓒ 2020 GGanbu.gg All rights reserved
        </span>
        <div className={styles.modecontainer}>
          <button
            className={styles.mode}
            onClick={() => {
              setMode("light");
              console.log("light");
            }}
          >
            LIGHT
          </button>
          <button
            className={styles.mode}
            onClick={() => {
              setMode("dark");
              console.log("dark");
            }}
          >
            DARK
          </button>
        </div>
      </footer>
    </>
  );
}
