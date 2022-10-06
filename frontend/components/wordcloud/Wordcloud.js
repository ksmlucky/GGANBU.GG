import ReactWordcloud from "react-wordcloud";
import styles from "./Wordcloud.module.css";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { wordcloud } from "../../api/api";
import championList from "../../utils/champion";

export default function Wordcloud({id}) {
  const clist = championList();
  const [data,setData] = useState([]);
  const [words, setWords] = useState([]);
  const champ = useMemo(() => words, []);
  const [w, setW] = useState(null);
  useEffect(() => {
    const champPoint = clist.findIndex((i)=>i.en === id);
    const champKey = clist[champPoint].key;
    axios({
      method : "post",
      url : wordcloud.getAllTeam(),
      params :{
        championId : champKey,
        roughTier : "high",
      }

    }).then((res)=>{
      setData(res.data);
    }).catch((e)=>{

    });
    setW("w");
  }, []);

  useEffect(()=>{
    words.splice(0);
    data.map((item)=>{
      const champPoint = clist.findIndex((i)=>i.key === item.championId);
      const champName = clist[champPoint].ko;
      setWords((words)=>{
        const newWords = [...words];
        newWords.push({text: champName, value : item.score});
        return newWords;
      })
    });
  },[data]);

  const options = {
    colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
    enableTooltip: false,
    deterministic: false,
    fontFamily: "impact",
    fontSizes: [5, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 1,
    rotationAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  return (
    <>
      <div className={styles.wordcloud}>
        <div className={styles.cursor} style={{ width: "100%", height: "100%" }}>
          {w !== null && (
            <ReactWordcloud words={words} options={options}></ReactWordcloud>
          )}
        </div>
      </div>
    </>
  );
}
