import { useRef } from "react";
import styles from "./Multisearch.module.css";

export default function Multisearch(props) {
  const search = useRef("");
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <textarea className={styles.search} ref={search}></textarea>
        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => {
              props.clickButton();
              props.setSearch(search.current.value);
            }}
          >
            검색
          </button>
          <button
            className={styles.button}
            onClick={() => {
              props.clickButton();
            }}
          >
            닫기
          </button>
        </div>
      </div>
    </main>
  );
}
