import React, { useEffect, useRef, useState } from "react";

import styles from "./Game.module.css";
let pressstop = false;
let load = false;
const Keyboard = () => {
  let playerTime = 0;
  const [result, setResult] = useState("");
  const [keyboardinput, Setkeyboardinput] = useState("");
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(0);
  const difficulty = [50, 50, 40];
  const ready = [33, 30, 30];
  const [stage, setStage] = useState(0);
  const [inGame, setInGame] = useState(false);
  const [def, setDef] = useState(false);
  useEffect(() => {
    document.addEventListener("keydown", detectKey);
  }, []);

  const detectKey = (e) => {
    if (e.key === "e" && load === false) {
      pressstop = true;
    }
  };

  function startGame(stage) {
    setInGame(true);
    setDef(true);
    // setLoad(true);
    load = true;
    pressstop = false;
    const st = setInterval(function () {
      setStart((start) => {
        if (start === 4) {
          setDef(false);
          load = false;
          startTime(stage);
          setStart(0);
          clearInterval(st);
        }
        return start + 1;
      });
    }, 1000);
  }

  function startTime(stage) {
    const time = setInterval(function () {
      playerTime++;
      if (pressstop === true) {
        setScore(playerTime);
        setInGame(false);
        if (playerTime <= ready[stage]) {
          setStage("FAST");
        } else if (playerTime <= difficulty[stage]) {
          setStage((stage) => {
            if (stage >= 2) {
              return "CLEAR";
            }
            return stage + 1;
          });
        } else {
          setStage("GAMEOVER");
        }
        pressstop = false;
        playerTime = 0;
        clearInterval(time);
      }
    }, 10);
  }

  function reset() {
    setStage(0);
    setScore(0);
    setInGame(false);
  }
  return (
    <main className={styles.main}>
      {stage === 0 && inGame === false && (
        <>
          <p>말파이트 궁피하기</p>
          <p>E키를 눌러서 말파의 궁을 피해보세요</p>
          <button
            className={styles.btn}
            onClick={() => {
              startGame(stage);
            }}
          >
            시작하기
          </button>
        </>
      )}

      {inGame === true && (
        <video
          controls={false}
          autoPlay={true}
          muted={true}
          className={styles.video}
        >
          <source
            src={`/gamevideo/stage_0${stage + 1}.mp4`}
            type={"video/mp4"}
          ></source>
        </video>
      )}
      {stage === "GAMEOVER" && (
        <video
          controls={false}
          autoPlay={true}
          muted={true}
          loop={true}
          className={styles.videofail}
        >
          <source src={`/gamevideo/teemo.mp4`} type={"video/mp4"}></source>
        </video>
      )}

      {inGame === false && stage !== 0 && (
        <>
          {stage === "FAST" && <p>너무 빨리 누르셨습니다.</p>}
          {stage === "CLEAR" && <p>클리어!</p>}
          {stage === "GAMEOVER" && (
            <>
              <p>당신은 죽었습니다</p>
            </>
          )}
          {stage !== "GAMEOVER" && stage !== "CLEAR" && stage !== "FAST" && (
            <div>
              <div>Stage{stage}</div>
            </div>
          )}
          {stage !== "GAMEOVER" && stage !== "CLEAR" && stage !== "FAST" && (
            <button
              className={styles.btns}
              onClick={() => {
                startGame(stage);
              }}
            >
              다음 라운드
            </button>
          )}
          {stage === "GAMEOVER" && (
            <button
              className={styles.btns}
              onClick={() => {
                reset();
              }}
            >
              다시하기
            </button>
          )}
          {stage === "CLEAR" && (
            <button
              className={styles.btns}
              onClick={() => {
                reset();
              }}
            >
              다시하기
            </button>
          )}
          {stage === "FAST" && (
            <button
              className={styles.btns}
              onClick={() => {
                reset();
              }}
            >
              다시하기
            </button>
          )}
        </>
      )}
    </main>
  );
};
export default Keyboard;
