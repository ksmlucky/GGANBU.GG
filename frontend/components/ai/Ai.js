import styles from "./Ai.module.css";
import * as tf from "@tensorflow/tfjs";
import * as tmImage from "@teachablemachine/image";

export default function Ai() {
  let model, webcam, labelContainer, maxPredictions;

  async function init() {
    const modelURL = "/ai/model.json";
    const metadataURL = "/ai/metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();

    document.getElementById("webcam-container").appendChild(webcam.canvas);
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement("div"));
    }
    await webcam.play();
    window.requestAnimationFrame(loop);
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }

  return (
    <div className={styles.container}>
      <button type="button" onClick={() => init()}>
        Start
      </button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </div>
  );
}
