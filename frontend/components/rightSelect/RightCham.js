import styles from "./RightCham.module.css";
import { useEffect, useState } from "react";

export default function RightCham({
  pickchampionindex,
  selectedchampion,
  SetSelectedchampion,
  pickchampion,
  pickchampionEng,
  selectline,
  SetRightchampion,
  makefive,
  Setmakefive,
  pickid,
}) {
  let [line, Setline] = useState(""); //현재 라인 선택(영어)
  let [enterline, SetEnterline] = useState(""); // 현재 드래그한 챔피언이 dragEnter한 라인(영어)
  let [lineCham, SetLineCham] = useState([
    {
      id: "1",
      lines: "TOP",
      champ: "",
      kchamp: "",
      links: "/line/top.svg",
      idx: "",
    },
    {
      id: "2",
      lines: "JUNGLE",
      champ: "",
      kchamp: "",
      links: "/line/jungle.svg",
      idx: "",
    },
    {
      id: "3",
      lines: "MIDDLE",
      champ: "",
      kchamp: "",
      links: "/line/mid.svg",
      idx: "",
    },
    { id: "4", lines: "BOTTOM", champ: "", links: "/line/bot.svg", idx: "" },
    {
      id: "5",
      lines: "UTILITY",
      champ: "",
      links: "/line/support.svg",
      idx: "",
    },
  ]);

  const [disableline, Setdisableline] = useState([]);

  useEffect(() => {
    if (selectline === "TOP") {
      if (makefive) {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE", "BOTTOM", "UTILITY"]);
      } else {
        Setdisableline(["TOP", "JUNGLE"]);
      }
    } else if (selectline === "JUNGLE") {
      if (makefive) {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE", "BOTTOM", "UTILITY"]);
      } else {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE"]);
      }
    } else if (selectline === "MIDDLE") {
      if (makefive) {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE", "BOTTOM", "UTILITY"]);
      } else {
        Setdisableline(["MIDDLE", "JUNGLE"]);
      }
    } else if (selectline === "BOTTOM") {
      if (makefive) {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE", "BOTTOM", "UTILITY"]);
      } else {
        Setdisableline(["BOTTOM", "UTILITY"]);
      }
    } else if (selectline === "UTILITY") {
      if (makefive) {
        Setdisableline(["JUNGLE", "TOP", "MIDDLE", "BOTTOM", "UTILITY"]);
      } else {
        Setdisableline(["UTILITY", "BOTTOM"]);
      }
    }
  }, [selectline, makefive]);

  useEffect(() => {
    let newlinecham = lineCham.map((check) => {
      //라인별 챔피언 상황에 추가
      return { ...check, champ: "", kchamp: "", idx: "" };
    });
    SetLineCham(newlinecham);
    SetRightchampion(newlinecham);
  }, [selectline]);

  function reset(id, line) {
    //선택된 챔피언 중에서 해당 챔피언을 제거
    const newselectedchampion = selectedchampion.filter(
      (selected) => selected !== lineCham[id - 1].kchamp
    );
    SetSelectedchampion(newselectedchampion); //갱신
    let newlinecham = lineCham.map((check) => {
      //라인별 챔피언 상황에 추가
      return check.lines === line ? { ...check, champ: "", kchamp: "" } : check;
    });
    SetLineCham(newlinecham);
    SetRightchampion(newlinecham);
  }

  function Drop(event, id) {
    let beforenewselectedchampion = [...selectedchampion];
    //잘 찾아왔으면 진행
    if (event.target.className.toLowerCase().includes("rightcham")) {
      //표시되야할 라인인지 확인하고 진행
      if (disableline.indexOf(event.target.id) !== -1) {
        //라인이 선택되어있지 않으면 진행
        if (event.target.id !== line) {
          //먼저 선택된 챔피언이 있으면 없애주고 진행
          if (lineCham[id - 1].kchamp) {
            beforenewselectedchampion = selectedchampion.filter(
              (selected) => selected !== lineCham[id - 1].kchamp
            );
            SetSelectedchampion(beforenewselectedchampion); //우선 제거
          }
          //선택된 리스트에 챔피언이 없다면
          if (beforenewselectedchampion.indexOf(pickchampion) === -1) {
            beforenewselectedchampion.push(pickchampion);
            SetSelectedchampion(beforenewselectedchampion); //선택 리스트에 추가
            //라인별 챔피언 상황에 추가
            let newlinecham = lineCham.map((check) => {
              return check.lines === event.target.id
                ? {
                    ...check,
                    champ: pickchampionEng,
                    kchamp: pickchampion,
                    idx: pickid,
                  }
                : check;
            });
            SetLineCham(newlinecham);
            SetRightchampion(newlinecham);
          }
        }
      } else {
        if (
          disableline.indexOf(event.target.id) !== -1 &&
          event.target.id !== line
        ) {
          event.target.src = `/transparent.png`;
        } else {
          event.target.src = `/sleepyporo.gif`;
          // event.target.style.background =
          //   "linear-gradient(145deg, var(--btn-linear-up-s), var(--btn-linear-up-l));";
          // event.target.style.boxShadow =
          //   "3px 3px 10px var(--btn-on-s), -3px -3px 10px var(--btn-on-l)";
        }
      }
    }
  }

  function dragOver(event) {
    event.preventDefault();
  }
  function dragEnter(event) {
    event.preventDefault();
    SetEnterline(event.target.id);
    if (disableline.indexOf(event.target.id) !== -1) {
      if (event.target.id !== line) {
        event.target.src = `/champion/tiles/${pickchampionEng}_0.jpg`;
      }
    }
  }
  function dragLeave(event, champion) {
    event.preventDefault();
    SetEnterline("");
    if (disableline.indexOf(event.target.id) !== -1) {
      if (champion) {
        event.target.src = `/champion/tiles/${champion}_0.jpg`;
      } else {
        if (
          disableline.indexOf(event.target.id) !== -1 &&
          event.target.id !== line
        ) {
          event.target.src = `/transparent.png`;
        } else {
          event.target.src = `/sleepyporo.gif`;
          // event.target.style.background =
          //   "linear-gradient(145deg, var(--btn-linear-up-s), var(--btn-linear-up-l));";
          // event.target.style.boxShadow =
          //   "3px 3px 10px var(--btn-on-s), -3px -3px 10px var(--btn-on-l)";
        }
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        {Array.from(lineCham).map((item) => {
          return (
            <div
              className={styles.users}
              key={item.id}
              style={{
                background:
                  item.lines == selectline
                    ? "linear-gradient(90deg, rgba(200,155,60,0.2) 30%, rgba(120,90,40,0.7) 80%)"
                    : disableline.includes(item.lines)
                    ? "linear-gradient(90deg, rgba(3,151,171,0.2) 30%, rgba(0,90,130,0.7) 80%)"
                    : "linear-gradient(90deg, rgba(91,90,86,0.2) 30%, rgba(60,60,65,0.7) 80%)",
              }}
            >
              <img
                className={styles.btncham}
                onClick={() => {
                  reset(item.id, item.lines);
                }}
                onDragOver={(event) => dragOver(event)}
                onDragEnter={(event) => dragEnter(event)}
                onDragLeave={(event) => dragLeave(event, item.champ)}
                onDrop={(event) => Drop(event, item.id)}
                id={item.lines}
                src={
                  item.champ
                    ? `/champion/tiles/${item.champ}_0.jpg`
                    : disableline.indexOf(item.lines) !== -1 &&
                      item.lines !== line
                    ? "/transparent.png"
                    : "/sleepyporo.gif"
                }
                draggable={false}
                // style={{
                //   boxShadow:
                //     "3px 3px 10px var(--btn-on-s), -3px -3px 10px var(--btn-on-l)",

                //   background:
                //     disableline.indexOf(item.lines) !== -1 &&
                //       item.lines !== line
                //       ? "linear-gradient(145deg, var(--btn-linear-down-s), var(--btn-linear-down-l))"
                //       : "linear-gradient(145deg, var(--btn-linear-up-s), var(--btn-linear-up-l))",
                // }}
              ></img>

              <img
                src={item.links}
                className={styles.lineImg}
                onClick={() => {
                  reset(item.id, item.lines);
                }}
              />
              {item.lines == selectline ? (
                <div className={styles.background}></div>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
