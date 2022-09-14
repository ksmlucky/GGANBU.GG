import styles from "./CSInput.module.css";

export default function CSInput({ setCsinput }) {
  function changes(e) {
    let champion_name = e.target.value;
    setCsinput(champion_name);
  }

  return (
    <form className={styles.container}>
      <div className="search">
        <input
          type="search"
          id="search"
          className={styles.input}
          placeholder="소환사 아이디를 검색하세요"
          onChange={changes}
        />
      </div>
      <button className={styles.btn}>Search</button>
    </form>
  );
}
