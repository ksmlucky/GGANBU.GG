import { useRef } from "react";
import styles from "./Multisearch.module.css";

export default function Multisearch(props) {
  const search = useRef("");
  return (
    <div className={styles.main}>
      <span className={styles.title}>소환사의 이름들을 작성해주세요</span>
      <textarea
        className={styles.search}
        ref={search}
        placeholder={`OOO 님이 방에 참가했습니다.
OOO 님이 방에 참가했습니다.
OOO 님이 방에 참가했습니다.
OOO 님이 방에 참가했습니다.
OOO 님이 방에 참가했습니다.`}
      ></textarea>
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
  );
}
