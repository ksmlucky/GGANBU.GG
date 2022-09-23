import styles from "./DetailMap.module.css";
import TopB from "/public/pin/topB.svg";
import JungleB from "/public/pin/jungleB.svg";
import MidB from "/public/pin/midB.svg";
import BotB from "/public/pin/botB.svg";
import SupportB from "/public/pin/supportB.svg";
import { useState } from "react";

export default function DetailMap({ mode }) {
    const [data, Setdata] = useState(["10", "20", "30", "40", "50"]);
  return (
    <div>
      <div className={styles.container}>
        <img src="/map/3dmap.png" className={styles.tdmap}></img>

        <div className={styles.toppointcontainer}>
          {mode === "dark" ? <TopB className={styles.toppoint} /> : null}
          <i className={styles.numtexts}>{`${data[0]}%`}</i>
        </div>
        <div className={styles.junglepointcontainer}>
          {mode === "dark" ? <JungleB className={styles.junglepoint} /> : null}
          <i className={styles.numtexts}>{`${data[1]}%`}</i>
        </div>
        <div className={styles.midpointcontainer}>
          {mode === "dark" ? <MidB className={styles.midpoint} /> : null}
          <i className={styles.numtexts}>{`${data[2]}%`}</i>
        </div>
        <div className={styles.botpointcontainer}>
          {mode === "dark" ? <BotB className={styles.botpoint} /> : null}
          <i className={styles.numtexts}>{`${data[3]}%`}</i>
        </div>
        <div className={styles.supportpointcontainer}>
          {mode === "dark" ? <SupportB className={styles.supportpoint} /> : null}
          <i className={styles.numtexts}>{`${data[4]}%`}</i>
        </div>
      </div>
    </div>
  );
}
