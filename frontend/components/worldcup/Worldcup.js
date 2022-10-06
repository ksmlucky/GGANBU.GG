import { useState, useEffect, useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper";

import styles from "./Worldcup.module.css";
import champion from "../../utils/champion";
import skin from "../../utils/skin";
import axios from "axios";
import { worldcup } from "../../api/api";
import Sort from "/public/arrow/sort.svg";

export default function Worldcup() {
  const [currentList, setCurrentList] = useState(champion());
  const [nextChampList, setNextChampList] = useState([]);
  const [leftChamp, setLeftChamp] = useState("");
  const [rightChamp, setRightChamp] = useState("");
  const [round, setRound] = useState(0);
  const [winner, setWinner] = useState();
  const [result, setResult] = useState({});
  const [statistics, setStatistics] = useState(false);
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);
  const [sortGoldmedal, setSortGoldmedal] = useState(false);
  const [sortWinrate, setSortWinrate] = useState(false);
  const [content, setContent] = useState({});
  function shuffle(list) {
    for (let i = list.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    if (round !== 0) {
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
          alert("결승입니다!");
          return [];
        } else if (round === "결과") {
          return [];
        } else {
          selected(newChampList.slice(0, round));
          alert(`${round}강 입니다!`);
          return newChampList.slice(0, round);
        }
      });
    } else {
      setCurrentList(champion());
      shuffle(champion());
    }
  }, [round]);

  useEffect(() => {
    if (winner !== undefined) {
      axios({
        method: "post",
        url: worldcup.updateGoldMedal(),
        data: {
          winner: winner.en,
          datas: result,
        },
      })
        .then((res) => {})
        .catch((e) => {});

      axios({
        method: "get",
        url: worldcup.getChampionByName() + winner.en,
      })
        .then((res) => {
          setContent(res.data);
        })
        .catch((e) => {});
    }
  }, [winner]);

  function selected(current) {
    if (currentList.length === 0) {
      setCurrentList(shuffle(current));

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
      setResult((result) => {
        const newResult = { ...result };
        newResult[win.en].win++;
        return newResult;
      });
      selected(currentList);
    } else {
      setNextChampList((nextChampList) => {
        const newNextChampList = [...nextChampList];
        newNextChampList.push(win);
        if (leftChamp === win) {
          setResult((result) => {
            const newResult = { ...result };
            const w = leftChamp.en;
            const l = rightChamp.en;
            if (!newResult[w]) {
              newResult[w] = { win: 1, lose: 0 };
            } else {
              newResult[w].win = newResult[w].win + 1;
            }
            if (!newResult[l]) {
              newResult[l] = { win: 0, lose: 1 };
            } else {
              newResult[l].lose = 1;
            }
            return newResult;
          });
        } else {
          setResult((result) => {
            const newResult = { ...result };
            const w = rightChamp.en;
            const l = leftChamp.en;
            if (!newResult[w]) {
              newResult[w] = { win: 0, lose: 0 };
            } else {
              newResult[w].win = newResult[w].win + 1;
            }
            if (!newResult[l]) {
              newResult[l] = { win: 0, lose: 0 };
            } else {
              newResult[l].lose = 1;
            }
            return newResult;
          });
        }
        if (currentList.length !== 0) {
          selected(currentList);
          return newNextChampList;
        } else {
          selected(newNextChampList);
          return [];
        }
      });
    }
  }
  const skinList = skin;
  return (
    <main className={styles.main}>
      {round === 0 && !statistics && (
        <div className={styles.btns}>
          <button
            className={styles.btn}
            onClick={() => {
              setRound(32);
            }}
          >
            32강
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setRound(64);
            }}
          >
            64강
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              setRound(128);
            }}
          >
            128강
          </button>
        </div>
      )}

      {round !== 0 && !statistics && (
        <>
          {round !== "결승" && round !== "결과" && <h2>{round}강</h2>}
          {round === "결승" && <h2>{round}</h2>}
          {round === "결과" && <h2>{round}</h2>}
          <div className={styles.vs}>
            {round === "결과" && winner && (
              <>
                <div className={styles.resultPage}>
                  <div className={styles.resultBtn}>
                    <button
                      className={styles.rbtn}
                      onClick={() => {
                        axios({
                          method: "get",
                          url: worldcup.getGoldMedalCount(),
                        })
                          .then((res) => {
                            setInfo((info) => {
                              const newInfo = [...info];
                              newInfo.splice(0);
                              res.data.map((item, idx) => {
                                newInfo.push({
                                  rank: idx + 1,
                                  en: item.englishname,
                                  ko: item.name,
                                  goldmedal: item.goldmedalcount,
                                  winrate: Number(
                                    (item.winRate * 100).toFixed(2)
                                  ),
                                });
                              });
                              setStatistics(true);
                              setSortGoldmedal(true);
                              return newInfo;
                            });
                          })
                          .catch((e) => {});
                      }}
                    >
                      전체 결과 보기
                    </button>
                    <button
                      className={styles.rbtn}
                      onClick={() => {
                        setStatistics(false);
                        setSortGoldmedal(false);
                        setSortWinrate(false);
                        setRound(0);
                        setNextChampList("");
                        setLeftChamp("");
                        setRightChamp("");
                        setWinner();
                        setResult({});
                        setValue("");
                      }}
                    >
                      다시하기
                    </button>
                  </div>
                  <div className={styles.resultComponent}>
                    <div className={styles.resultImg}>
                      <img
                        src={`/champion/splash/${winner.en}_0.jpg`}
                        className={styles.img}
                      ></img>
                    </div>
                    <div className={styles.resultContent}>
                      <ul className={styles.ul}>
                        <li>
                          <b>{content.name}</b>({content.englishname})
                        </li>
                        <li>
                          <b>난이도 : </b> {content.difficulty}
                        </li>
                        <li>
                          <b>챔피언 설명 : </b>
                          {content.blurb}
                        </li>
                        <li>
                          <b>우승 횟수 : </b>
                          {content.goldmedalcount}회
                        </li>
                        <li>
                          <b>승률(승리 횟수 / 전체 1:1대결수) : </b>
                          {(content.winRate * 100).toFixed(2)}%
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
            {round !== "결과" && leftChamp && !statistics && (
              <div className={styles.imgContainer}>
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className={styles.swiper}
                  loop={true}
                >
                  {skin.map((el, idx) => {
                    if (el.includes(leftChamp.en)) {
                      return (
                        <SwiperSlide
                          key={idx}
                          className={styles.swiperslide}
                          style={{
                            backgroundImage: `url(/champion/splash/${el})`,
                          }}
                        ></SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
                <button
                  className={styles.selectbtn}
                  onClick={() => {
                    select(leftChamp);
                  }}
                >
                  {leftChamp.ko}
                </button>
              </div>
            )}
            {round !== "결과" && rightChamp && !statistics && (
              <div className={styles.imgContainer}>
                <Swiper
                  effect={"cards"}
                  grabCursor={true}
                  modules={[EffectCards]}
                  className={styles.swiper}
                  loop={true}
                >
                  {skin.map((el, idx) => {
                    if (el.includes(rightChamp.en)) {
                      return (
                        <SwiperSlide
                          key={idx}
                          className={styles.swiperslide}
                          style={{
                            backgroundImage: `url(/champion/splash/${el})`,
                            objectFit: "contain",
                          }}
                        ></SwiperSlide>
                      );
                    }
                  })}
                </Swiper>
                <button
                  className={styles.selectbtn}
                  onClick={() => {
                    select(rightChamp);
                  }}
                >
                  {rightChamp.ko}
                </button>
              </div>
            )}
          </div>
        </>
      )}
      {statistics && (
        <div className={styles.resultTablePage}>
          <div className={styles.input}>
            <button
              className={styles.btn}
              onClick={() => {
                setStatistics(false);
                setSortGoldmedal(false);
                setSortWinrate(false);
                setRound(0);
                setNextChampList("");
                setLeftChamp("");
                setRightChamp("");
                setWinner();
                setResult({});
                setValue("");
              }}
            >
              다시하기
            </button>
            <input
              className={styles.text}
              placeholder="챔피언  이름"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            ></input>
          </div>
          <div className={styles.scroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th width="10%">순위</th>
                  <th width="15%">이미지</th>
                  <th width="15%">이름</th>
                  <th width="30%">
                    우승횟수{" "}
                    <button
                      className={styles.sortBtn}
                      onClick={() => {
                        if (sortGoldmedal === false) {
                          axios({
                            method: "get",
                            url: worldcup.getGoldMedalCount(),
                          })
                            .then((res) => {
                              setInfo((info) => {
                                const newInfo = [...info];
                                newInfo.splice(0);
                                res.data.map((item, idx) => {
                                  newInfo.push({
                                    rank: idx + 1,
                                    en: item.englishname,
                                    ko: item.name,
                                    goldmedal: item.goldmedalcount,
                                    winrate: Number(
                                      (item.winRate * 100).toFixed(2)
                                    ),
                                  });
                                });
                                return newInfo;
                              });
                              setSortGoldmedal(true);
                              setSortWinrate(false);
                            })
                            .catch((e) => {}); // axios 끝
                        } //if문 끝
                        else {
                          axios({
                            method: "get",
                            url: worldcup.getGoldMedalCount(),
                          })
                            .then((res) => {
                              setInfo((info) => {
                                const newInfo = [...info];
                                newInfo.splice(0);
                                res.data.map((item, idx) => {
                                  newInfo.push({
                                    rank: idx + 1,
                                    en: item.englishname,
                                    ko: item.name,
                                    goldmedal: item.goldmedalcount,
                                    winrate: Number(
                                      (item.winRate * 100).toFixed(2)
                                    ),
                                  });
                                });
                                newInfo.sort(function (a, b) {
                                  return b.rank - a.rank;
                                });
                                return newInfo;
                              });
                              setSortGoldmedal(false);
                              setSortWinrate(false);
                            })
                            .catch((e) => {}); // axios 끝
                        } // else문 끝
                      }}
                    >
                      <Sort />
                    </button>
                  </th>
                  <th width="30%">
                    승률{" "}
                    <button
                      className={styles.sortBtn}
                      onClick={() => {
                        if (sortWinrate === false) {
                          axios({
                            method: "get",
                            url: worldcup.getWinRate(),
                          })
                            .then((res) => {
                              setInfo((info) => {
                                const newInfo = [...info];
                                newInfo.splice(0);
                                res.data.map((item, idx) => {
                                  newInfo.push({
                                    rank: idx + 1,
                                    en: item.englishname,
                                    ko: item.name,
                                    goldmedal: item.goldmedalcount,
                                    winrate: Number(
                                      (item.winRate * 100).toFixed(2)
                                    ),
                                  });
                                });
                                return newInfo;
                              });
                              setSortGoldmedal(false);
                              setSortWinrate(true);
                            })
                            .catch((e) => {}); //axios 끝
                        } // if문 끝
                        else {
                          axios({
                            method: "get",
                            url: worldcup.getWinRate(),
                          })
                            .then((res) => {
                              setInfo((info) => {
                                const newInfo = [...info];
                                newInfo.splice(0);
                                res.data.map((item, idx) => {
                                  newInfo.push({
                                    rank: idx + 1,
                                    en: item.englishname,
                                    ko: item.name,
                                    goldmedal: item.goldmedalcount,
                                    winrate: Number(
                                      (item.winRate * 100).toFixed(2)
                                    ),
                                  });
                                });
                                newInfo.sort(function (a, b) {
                                  return b.rank - a.rank;
                                });
                                return newInfo;
                              });
                              setSortGoldmedal(false);
                              setSortWinrate(false);
                            })
                            .catch((e) => {}); //axios 끝
                        } // else문 끝
                      }}
                    >
                      <Sort />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {info
                  .filter((item) => item.ko.includes(value))
                  .map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>{item.rank}</td>
                        <td>
                          <img
                            src={`/champion/tiles/${item.en}_0.jpg`}
                            id={item.ko}
                            alt={item.en}
                            className={styles.imgResult}
                          />
                        </td>
                        <td>{item.ko}</td>
                        <td>{item.goldmedal}</td>
                        <td>{item.winrate}%</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
