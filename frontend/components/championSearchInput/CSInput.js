import styles from "./CSInput.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CSInput({
  csInput,
  selectline,
  leftchampion,
  rightchampion,
}) {
  const router = useRouter();
  function resultfunc() {
    const line = ["top", "jungle", "mid", "bot", "support"];
    let myline = line.indexOf(selectline);
    if (selectline) {
      if (rightchampion[myline].champ) {
        router.push(result);
      } else {
        alert("no counter line enemy select");
      }
    }
  }

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
    <div className={styles.container}>
      <div className={styles.searchbar}>
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
      <button
        className={styles.btn}
        onClick={() => {
          resultfunc();
        }}
      >
        결과
      </button>
    </div>
  );
}
