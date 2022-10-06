import ReactWordcloud from "react-wordcloud";
import styles from "./Wordcloud.module.css";
import { useMemo, useState, useEffect } from "react";
import words from "../../utils/words";
import { div } from '@tensorflow/tfjs';

export default function Wordcloud() {
  const champ = useMemo(() => words, []);
  const [w, setW] = useState(null);
  useEffect(() => {
    setW("w");
  }, []);
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
        <div style={{ width: "100%", height: "100%" }}>
          {w !== null && (
            <ReactWordcloud words={champ} options={options}></ReactWordcloud>
          )}
        </div>
      </div>
    </>
  );
}
