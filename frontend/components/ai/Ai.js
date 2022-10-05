import styles from "./Ai.module.css";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";
import { useState } from "react";
import region from "./../../utils/region";

let best = -1;
let bestregion;
let data;
let cheesebtn = false;

export default function Ai() {
  let model, webcam, labelContainer, maxPredictions;

  const [start, setStart] = useState(false);
  const getregion = region();
  const [bestregions, setBestregions] = useState();

  async function init() {
    const modelURL = "/ai/model.json";
    const metadataURL = "/ai/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(100, 100, flip);
    await webcam.setup();

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    await webcam.play();
    setStart(true);
    window.requestAnimationFrame(loop);
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);

    if (cheesebtn) {
      let resultPrediction = prediction.map((item, idx) => {
        if (item.probability.toFixed(2) > best) {
          best = item.probability.toFixed(2);
          bestregion = idx;
        }
        return { city: item.className, count: item.probability.toFixed(2) };
      });
      data = resultPrediction;
      setBestregions(bestregion);
      cheesebtn = false;
    }
  }

  function cheese() {
    cheesebtn = true;
    best = 0;
    bestregion = 0;
  }

  return (
    <div className={styles.container}>
      {bestregions ? (
        <video
          controls={false}
          autoPlay={true}
          muted={true}
          loop={true}
          className={styles.video}
          key={getregion[bestregions].video}
        >
          <source
            src={getregion[bestregions].video}
            type={"video/webm"}
          ></source>
        </video>
      ) : null}
      {!start ? (
        <button
          type="button"
          onClick={() => init()}
          className={styles.startbtn}
        >
          시작
        </button>
      ) : null}
      <div id="webcam-container" className={styles.webcamContainer}>
        {start ? (
          <button
            type="button"
            onClick={() => cheese()}
            className={styles.cheesebtn}
          >
            찰칵!
          </button>
        ) : null}
      </div>
      <div id="label-container" className={styles.labelContainer}>
        {bestregions ? (
          <img src={getregion[bestregions].icon} className={styles.icon}></img>
        ) : null}
        {bestregions ? (
          <span className={styles.name}>{getregion[bestregions].name}</span>
        ) : null}
        {bestregions ? (
          <ul className={styles.ul}>
            {getregion[bestregions].champions.map((item, idx) => {
              return (
                <>
                  <li className={styles.liname} key={idx}>
                    <img
                      src={`/champion/tiles/${item}_0.jpg`}
                      className={styles.champ}
                    ></img>
                    <span className={styles.champname}>
                      {getregion[bestregions].ko[idx]}
                    </span>
                  </li>
                </>
              );
            })}
          </ul>
        ) : null}
        {bestregions ? (
          <p className={styles.story}>{getregion[bestregions].story}</p>
        ) : null}
      </div>
    </div>
  );
}
