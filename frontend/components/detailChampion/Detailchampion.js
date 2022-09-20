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
      <div className={styles.container}>
        <div className={styles.profile}>
          <img src={`/champion/tiles/${id}_0.jpg`}></img>
          <span>
            {id ? clist.find((element) => element.en === id).ko : null}
          </span>
          <div>
            <img src={`/champion/tiles/${id}_0.jpg`}></img>
            <img></img>
            <img></img>
            <img></img>
            <img></img>
          </div>
        </div>
        <div className={styles.rune}></div>
        <div className={styles.skill}></div>
        <div className={styles.item}></div>
      </div>
    </div>
  );
}
