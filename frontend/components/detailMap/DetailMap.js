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
import { useEffect, useState } from "react";
import championList from "../../utils/champion";
import axios from "axios";
import { statistics } from "../../api/api";

export default function DetailMap({ id, mode }) {
  const clist = championList();
  const [data, setData] = useState([]);
  useEffect(()=>{
    const champPoint = clist.findIndex((i)=>i.en === id);
    const champKey = clist[champPoint].key;
    axios({
      method : "post",
      url : statistics.getMatchNumPerLane(),
      data : {
        championId : champKey,
        roughTier : "high",
      },
    })
    .then((res)=>{
      const top = res.data.matchNumTOP;
      const jungle = res.data.matchNumJUNGLE;
      const mid = res.data.matchNumMIDDLE;
      const bottom = res.data.matchNumBOTTOM;
      const utility = res.data.matchNumUTILITY;
      const total = top+jungle+mid+bottom+utility;
      setData([((top/total)*100).toFixed(), 
      ((jungle/total)*100).toFixed(), 
      ((mid/total)*100).toFixed(), 
      ((bottom/total)*100).toFixed(),
      ((utility/total)*100).toFixed()]);
    }).catch((e)=>{
      console.log(e);
    })
  },[])

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
