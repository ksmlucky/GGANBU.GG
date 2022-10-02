import styles from "./DetailMap.module.css";
import TopB from "/public/pin/topB.svg";
import JungleB from "/public/pin/jungleB.svg";
import MidB from "/public/pin/midB.svg";
import BotB from "/public/pin/botB.svg";
import SupportB from "/public/pin/supportB.svg";
import TopW from "/public/pin/topW.svg";
import JungleW from "/public/pin/jungleW.svg";
import MidW from "/public/pin/midW.svg";
import BotW from "/public/pin/botW.svg";
import SupportW from "/public/pin/supportW.svg";
import { useState } from "react";

export default function DetailMap({ mode }) {
  const [data, Setdata] = useState(["10", "20", "30", "40", "50"]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mapandpin}>
          <img src="/map/3dmap.png" className={styles.tdmap}></img>
          <div className={styles.toppointcontainer}>
            {mode === "dark" ? <TopB className={styles.toppoint} /> : <TopW className={styles.toppoint} />}
            <i className={styles.tnumtexts}>{`${data[0]}%`}</i>
          </div>
          <div className={styles.junglepointcontainer}>
            {mode === "dark" ? <JungleB className={styles.junglepoint} /> : <JungleW className={styles.junglepoint} />}
            <i className={styles.jnumtexts}>{`${data[1]}%`}</i>
          </div>
          <div className={styles.midpointcontainer}>
            {mode === "dark" ? <MidB className={styles.midpoint} /> : <MidW className={styles.midpoint} />}
            <i className={styles.mnumtexts}>{`${data[2]}%`}</i>
          </div>
          <div className={styles.botpointcontainer}>
            {mode === "dark" ? <BotB className={styles.botpoint} /> : <BotW className={styles.botpoint} />}
            <i className={styles.bnumtexts}>{`${data[3]}%`}</i>
          </div>
          <div className={styles.supportpointcontainer}>
            {mode === "dark" ? <SupportB className={styles.supportpoint} /> : <SupportW className={styles.supportpoint} />}
            <i className={styles.snumtexts}>{`${data[4]}%`}</i>
          </div>
        </div>
      </div>
    </>
  );
}
