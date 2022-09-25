import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.css";
const Keyboard = () => {
  let timertime = 10;
  let pressstop = false;

  const [result, setResult] = useState("");
  const [keyboardinput, Setkeyboardinput] = useState("");

  const showtime = useRef();

  useEffect(() => {
    document.addEventListener("keydown", detectKey, true);
  }, []);

  const detectKey = (e) => {
    console.log("clicked key: ", e.key);
    if (e.key === "b") {
      startTimer(timertime);
    }
    if (e.key === "a") {
      pressstop = true;
    }
  };

  function startTimer(timertime) {
    var hour, min, sec;

    var timer = setInterval(function () {
      timertime--;

      min = Math.floor(timertime / 60);
      hour = Math.floor(min / 60);
      sec = timertime % 60;
      min = min % 60;

      var th = hour;
      var tm = min;
      var ts = sec;

      if (th < 10) {
        th = "0" + hour;
      }
      if (tm < 10) {
        tm = "0" + min;
      }
      if (ts < 10) {
        ts = "0" + sec;
      }
      if (timertime === -1) {
        setResult("timeout");
        clearInterval(timer);
      } else if (pressstop === true) {
        setResult("clear");
        clearInterval(timer);
      } else {
        Setkeyboardinput(`${th} : ${tm} : ${ts}`);
      }
    }, 100);
  }

  return (
    <div className={styles.container}>
      <span>{result}</span>
      <span ref={showtime}>{keyboardinput}</span>
    </div>
  );
};
export default Keyboard;
