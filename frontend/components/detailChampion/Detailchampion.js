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
    <div>
      <div className={styles.boxflexs}>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            {id ? (
              <span className={styles.champname}>{id}</span>
            ) : null}
            <button onClick={() => Setselectdata("map")} style={{
              boxShadow: selectdata === "map" ? "inset 5px 5px 10px #b08835, inset -5px -5px 10px #e0ae43" : "5px 5px 10px #b08835, -5px -5px 10px #e0ae43",
            }}>Lines</button>
            <button onClick={() => Setselectdata("chart")} style={{
              boxShadow: selectdata === "chart" ? "inset 5px 5px 10px #b08835, inset -5px -5px 10px #e0ae43" : "5px 5px 10px #b08835, -5px -5px 10px #e0ae43",
            }}>compare</button>
            <button onClick={() => Setselectdata("cloud")} style={{
              boxShadow: selectdata === "cloud" ? "inset 5px 5px 10px #b08835, inset -5px -5px 10px #e0ae43" : "5px 5px 10px #b08835, -5px -5px 10px #e0ae43",
            }}>wordcloud</button>
          </div>
          <div className={styles.contentContainer}>
            {selectdata && selectdata === "map" ? (
              <DetailMap mode={mode}/>
            ) : null}
            {selectdata && selectdata === "chart" ? <DetailChart id={id} championName={championName} /> : null}
            {selectdata && selectdata === "cloud" ? <Wordcloud /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
