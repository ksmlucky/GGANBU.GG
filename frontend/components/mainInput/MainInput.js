import styles from "./MainInput.module.css";
import Link from "next/link";

export default function MainInput() {
  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <input
          type="text"
          id="search"
          placeholder="소환사 아이디를 검색하세요"
          required={true}
        />
        <i></i>
      </div>
      <Link href="/search">
        <button className={styles.btn}>검색하기</button>
      </Link>
    </div>
  );
}
