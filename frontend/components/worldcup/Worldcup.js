import { useState, useEffect } from "react";

import styles from "./Worldcup.module.css";
import champion from "../../utils/champion";
import skin from "../../utils/skin";

export default function Worldcup() {
  const [currentList, setCurrentList] = useState(champion());
  const [nextChampList, setNextChampList] = useState([]);
  const [leftChamp, setLeftChamp] = useState("");
  const [rightChamp, setRightChamp] = useState("");
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState("");

  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    if (round !== 0) {
      console.log("slice");
      return list.slice(0, round);
    } else {
      setCurrentList(list);
    }
  }
  useEffect(() => {
    shuffle(currentList);
  }, []);

  useEffect(() => {
    if (round !== 0) {
      setCurrentList((newChampList) => {
        if (round === "결승") {
          selected(newChampList);
          return [];
        } else if (round === "결과") {
          return [];
        } else {
          selected(newChampList.slice(0, round));
          return newChampList.slice(0, round);
        }
      });
    }
  }, [round]);
  function selected(current) {
    if (currentList.length === 0) {
      setCurrentList(shuffle(current));
      setNextChampList([]);
      setRound((round) => {
        if (round === 4) {
          return "결승";
        } else if (round === "결승") {
          return "결과";
        } else {
          return round / 2;
        }
      });
    } else {
      setLeftChamp(current.pop());
      setRightChamp(current.pop());
      setCurrentList(current);
    }
  }
  function select(win) {
    if (round === "결승") {
      setWinner(win);
      selected(currentList);
    } else {
      setNextChampList((nextChampList) => {
        const newNextChampList = [...nextChampList];
        newNextChampList.push(win);
        console.log(newNextChampList);
        if (currentList.length !== 0) {
          selected(currentList);
        } else {
          selected(newNextChampList);
        }
        return newNextChampList;
      });
    }
  }
  const skinList = skin;
  return (
    <main className={styles.main}>
      {round === 0 && (
        <div className={styles.round}>
          <button
            onClick={() => {
              setRound(32);
            }}
          >
            32강
          </button>
          <button
            onClick={() => {
              setRound(64);
            }}
          >
            64강
          </button>
          <button
            onClick={() => {
              setRound(128);
            }}
          >
            128강
          </button>
        </div>
      )}
      {round !== 0 && (
        <>
          {round}
          <div className={styles.round}>
            <div className={styles.vs}>
              {round === "결과" && winner && (
                <div>
                  <img
                    src={`/champion/splash/${winner.en}_0.jpg`}
                    className={styles.img}
                  ></img>
                </div>
              )}
              {round !== "결과" && leftChamp && (
                <div className={styles.imgContainer}>
                  <img
                    src={`/champion/splash/${leftChamp.en}_0.jpg`}
                    className={styles.img}
                  ></img>
                  <button
                    onClick={() => {
                      select(leftChamp);
                    }}
                  >
                    선택
                  </button>
                </div>
              )}
              {round !== "결과" && rightChamp && (
                <div className={styles.imgContainer}>
                  <img
                    src={`/champion/splash/${rightChamp.en}_0.jpg`}
                    className={styles.img}
                  ></img>
                  <button
                    onClick={() => {
                      select(rightChamp);
                    }}
                  >
                    선택
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
