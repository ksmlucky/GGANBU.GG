import React, { useEffect, useRef, useState } from "react";
const Keyboard = () => {
  let timertime = 11;
  let pressstop = false;
  let playerTime = 0;
  const [result, setResult] = useState("");
  const [keyboardinput, Setkeyboardinput] = useState("");
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(0);
  const difficulty = [100, 80, 60, 40, 20];
  const [stage, setStage] = useState(0);
  const showtime = useRef();
  console.log(stage);
  useEffect(() => {
    document.addEventListener("keydown", detectKey, true);
  }, [stage]);

  const detectKey = (e) => {
    console.log("clicked key: ", e.key);
    if (e.key === "a") {
      pressstop = true;
    }
  };

  function startGame(stage) {
    console.log(stage);
    const st = setInterval(function () {
      setStart((start) => {
        if (start === 5) {
          startTime(stage);
          clearInterval(st);
          setStart(0);
        }
        return start + 1;
      });
    }, 1000);
  }

  function startTime(stage) {
    console.log(stage);
    const time = setInterval(function () {
      playerTime++;
      if (pressstop === true) {
        setScore(playerTime);
        console.log(stage);
        if (stage >= 4) {
          setStage("CLEAR");
        } else if (playerTime <= difficulty[stage]) {
          setStage((stage) => {
            return stage + 1;
          });
        } else {
          setStage("GAMEOVER");
        }
        clearInterval(time);
        playerTime = 0;
        pressstop = false;
      }
    }, 10);
  }

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
    }, 1000);
  }

  return (
    <div>
      {/* <div>{result}</div> */}
      {/* <span ref={showtime}>{keyboardinput}</span> */}
      <div>{start}</div>
      <button
        onClick={() => {
          startGame(stage);
        }}
      >
        Start
      </button>
      {stage === "CLEAR" && <div>CLEAR</div>}
      {stage === "GAMEOVER" && stage !== "CLEAR" && <div>GAMEOVER</div>}
      {stage !== "GAMEOVER" && stage !== "CLEAR" && <div>Stage{stage + 1}</div>}
      {score}
    </div>
  );
};
export default Keyboard;
