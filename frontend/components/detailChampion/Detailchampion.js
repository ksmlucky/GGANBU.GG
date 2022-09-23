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

  return (
    <div>
      <div className={styles.boxflexs}>
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <button onClick={() => Setselectdata("map")}>Lines</button>
            <button onClick={() => Setselectdata("chart")}>compare</button>
            <button onClick={() => Setselectdata("cloud")}>wordcloud</button>
          </div>
          <div className={styles.contentContainer}>
            {selectdata && selectdata === "map" ? (
              <DetailMap mode={mode}/>
            ) : null}
            {selectdata && selectdata === "chart" ? <DetailChart /> : null}
            {selectdata && selectdata === "cloud" ? <Wordcloud /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
