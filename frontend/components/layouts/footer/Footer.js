import styles from "./Footer.module.css";

export default function Footer({ setMode }) {
  return (
    <>
      <footer className={styles.footer}>
        <span className={styles.copyright}>
          Copyrightⓒ 2022 GGanbu.gg All rights reserved
        </span>
        <div className={styles.modecontainer}>
          <button
            className={styles.mode}
            onClick={() => {
              setMode("light");
            }}
          >
            낮모드
          </button>
          <button
            className={styles.mode}
            onClick={() => {
              setMode("dark");
            }}
          >
            밤모드
          </button>
        </div>
      </footer>
    </>
  );
}
