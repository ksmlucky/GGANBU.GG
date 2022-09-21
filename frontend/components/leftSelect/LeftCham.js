import styles from "./LeftCham.module.css";
import { useEffect, useState } from "react";

export default function LeftCham({
  pickchampionindex,
  selectedchampion,
  SetSelectedchampion,
  pickchampion,
  pickchampionEng,
}) {
  let [line, Setline] = useState("top"); //현재 라인 선택(영어)
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
    {
      id: "4",
      lines: "support",
      champ: "",
      links: "/line/support.png",
      idx: "",
    },
    { id: "5", lines: "bot", champ: "", links: "/line/bot.png", idx: "" },
  ]);

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
  }

  function Drop(event, id) {
    let beforenewselectedchampion = [...selectedchampion];
    //잘 찾아왔으면 진행
    if (event.target.className.toLowerCase().includes("leftcham")) {
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
        }
      } else {
        event.target.src = `/images/none.png`;
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
    if (event.target.id !== line) {
      event.target.src = `/champion/tiles/${pickchampionEng}_0.jpg`;
    }
  }
  function dragLeave(event, champion) {
    event.preventDefault();
    SetEnterline("");
    if (champion) {
      event.target.src = `/champion/tiles/${champion}_0.jpg`;
    } else {
      event.target.src = `/images/none.png`;
    }
  }

  return (
    <>
      <div className={styles.container}>
        {Array.from(lineCham).map((item) => {
          return (
            <div className={styles.users} key={item.id}>
              {item.lines == line ? (
                <img
                  src="/arrow/leftarrow.png"
                  className={styles.arrow}
                  id={item.lines}
                />
              ) : null}
              <button
                className={styles.btn}
                onClick={() => {
                  reset(item.id, item.lines);
                  Setline(item.lines);
                }}
              >
                <img src={item.links} className={styles.lineImg} />
              </button>
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
                    : "/images/none.png"
                }
                draggable={false}
              ></img>
            </div>
          );
        })}
      </div>
    </>
  );
}
