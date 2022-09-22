import styles from "./Input.module.css";
import Link from "next/link";

export default function Input() {
  return (
    <form className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          id="search"
          placeholder="소환사 아이디를 검색하세요"
          required={true}
        />
        <i></i>
      </div>
      <Link href="/search">
        <button className={styles.btn}>Search</button>
      </Link>
    </form>
  );
}
