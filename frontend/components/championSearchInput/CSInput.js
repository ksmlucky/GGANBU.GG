import styles from "./CSInput.module.css";
import Link from "next/link";

export default function CSInput({ csInput }) {
  function dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  }

  function changes(e) {
    let champion_name = e.target.value;
    csInput(champion_name);
  }

  const result = "/recommandresult";

  return (
    <form className={styles.container}>
      <div className={styles.search}>
        <input
          type="text"
          id="search"
          placeholder="챔피언을 검색하세요"
          onChange={changes}
          onDragOver={(event) => {
            dragover(event);
          }}
          required={true}
        />
        <i></i>
      </div>
      <Link href={result}>
        <button className={styles.btn}>Result</button>
      </Link>
    </form>
  );
}
