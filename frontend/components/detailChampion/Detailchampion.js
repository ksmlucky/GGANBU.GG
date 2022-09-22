import { useRouter } from "next/router";
import styles from "./Detailchampion.module.css";
import championList from "../../utils/champion";
import { useEffect } from "react";

export default function DetailChampion() {
  const router = useRouter();
  const { id } = router.query;

  const clist = championList();

  return (
    <div>
      <div className={styles.boxflexs}>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button>Lines</button>
            <button>compare</button>
            <button>wordcloud</button>
          </div>
          <div className={styles.contentContainer}></div>
        </div>
      </div>
    </div>
  );
}
