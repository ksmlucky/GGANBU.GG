import styles from "./Input.module.css";
import Link from "next/link";


export default function Input() {
  return (
    <form className={styles.container}>
      <div className="search">
        <input
          type="search"
          id="search"
          className={styles.input}
          placeholder="소환사 아이디를 검색하세요"
        />
      </div>
      <Link href="/search">
        <button className={styles.btn}>Search</button>
      </Link>
    </form>
  );
}
