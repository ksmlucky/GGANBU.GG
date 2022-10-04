import { useRouter } from "next/router";
import styles from "./Detailchampion.module.css";
import championList from "../../utils/champion";

import DetailMap from "../detailMap/DetailMap";
import DetailChart from "../detailChart/DetailChart";
import { useEffect, useState } from "react";
import Wordcloud from "../wordcloud/Wordcloud";

export default function DetailChampion({ mode }) {
  const router = useRouter();
  const { id } = router.query;

  const clist = championList();

  const [selectdata, Setselectdata] = useState("");
  const [championName, setChampionName] = useState("")
  useEffect(() => {
    const championKo = clist.findIndex(i => i.en === id);
    if (clist[championKo]) {
      setChampionName(clist[championKo].ko)
    }
  })
  return (
    <>
      <div className={styles.container}>
        <div className={styles.buttonContainer}>
          {id ? (
            <div className={styles.titleimg}>
              <span className={styles.champname}>{championName}</span>
              <img src={`/champion/tiles/${id}_0.jpg`}></img>
            </div>
          ) : null}
          <div className={styles.btns}>
            <button onClick={() => Setselectdata("map")}>Lines</button>
            <button onClick={() => Setselectdata("chart")}>compare</button>
            <button onClick={() => Setselectdata("cloud")}>wordcloud</button>
          </div>
        </div>
        <div className={styles.contentContainer}>
          {selectdata && selectdata === "map" ? <DetailMap mode={mode} /> : null}
          {selectdata && selectdata === "chart" ? <DetailChart id={id} championName={championName} /> : null}
          {selectdata && selectdata === "cloud" ? <Wordcloud /> : null}
        </div>
      </div>
    </>
  );
}
