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
}) {
  let [line, Setline] = useState(""); //현재 라인 선택(영어)
  let [enterline, SetEnterline] = useState(""); // 현재 드래그한 챔피언이 dragEnter한 라인(영어)
  let [lineCham, SetLineCham] = useState([
    {
      id: "1",
      lines: "top",
      champ: "",
      kchamp: "",
      links: "/line/top.png",
      idx: "",
    },
    {
      id: "2",
      lines: "jungle",
      champ: "",
      kchamp: "",
      links: "/line/jungle.png",
      idx: "",
    },
    {
      id: "3",
      lines: "mid",
      champ: "",
      kchamp: "",
      links: "/line/mid.png",
      idx: "",
    },
    { id: "4", lines: "bot", champ: "", links: "/line/bot.png", idx: "" },
    {
      id: "5",
      lines: "support",
      champ: "",
      links: "/line/support.png",
      idx: "",
    },
  ]);

  const [disableline, Setdisableline] = useState([]);

  useEffect(() => {
    if (selectline === "top") {
      Setdisableline(["top", "jungle"]);
    } else if (selectline === "jungle") {
      Setdisableline(["jungle", "top", "mid"]);
    } else if (selectline === "mid") {
      Setdisableline(["mid", "jungle"]);
    } else if (selectline === "bot") {
      Setdisableline(["bot", "support"]);
    } else if (selectline === "support") {
      Setdisableline(["support", "bot"]);
    }
  }, [selectline]);

  useEffect(() => {
    let newlinecham = lineCham.map((check) => {
      //라인별 챔피언 상황에 추가
      return { ...check, champ: "", kchamp: "" };
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
                ? { ...check, champ: pickchampionEng, kchamp: pickchampion }
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
          event.target.src = `/images/none.png`;
        } else {
          event.target.src = `item/noitem.png`;
        }
      }
    }
  }

  function dragOver(event) {
    event.preventDefault();
    // console.log(event);
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
          event.target.src = `/images/none.png`;
        } else {
          event.target.src = `item/noItem.png`;
        }
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        {Array.from(lineCham).map((item) => {
          return (
            <div className={styles.users} key={item.id}>
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
                    ? "/images/none.png"
                    : "item/noitem.png"
                }
                draggable={false}
              ></img>
              <button
                className={styles.btn}
                onClick={() => {
                  reset(item.id, item.lines);
                }}
              >
                <img src={item.links} className={styles.lineImg} />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
