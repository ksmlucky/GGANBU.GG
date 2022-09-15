import styles from "./LeftCham.module.css";
import { useEffect, useState } from "react";

export default function LeftCham({ cham, Setcham, idxs, nodrag, yesdrag }) {
  let [line, Setline] = useState("");
  let champion = cham;
  let idx = idxs;

  let [lineCham, SetLineCham] = useState([
    { id: "1", lines: "top", champ: "", links: "/line/top.png", idx: ""},
    { id: "2", lines: "jungle", champ: "", links: "/line/jungle.png", idx: "" },
    { id: "3", lines: "mid", champ: "", links: "/line/mid.png", idx: "" },
    { id: "4", lines: "support", champ: "", links: "/line/support.png", idx: "" },
    { id: "5", lines: "bot", champ: "", links: "/line/bot.png", idx: "" },
  ]);

  // useEffect(() => {
  //   let before = [...lineCham];
  //   let after = before.map((check) => {
  //     return check.lines === line ? { ...check, champ: champion } : check;
  //   });
  //   SetLineCham(after);
  // }, [cham]);

  function changeLine(line,champion,idx) {
    let before = [...lineCham];
    let after = before.map((check) => {
      return check.lines === line ? { ...check, champ: champion, idx:idx } : check;
    });
    SetLineCham(after);
  }

  function reset(line) {
    let before = [...lineCham];
    let nums = null;
    let after = before.map((check) => {
      if(check.lines === line){nums = check.idx; yesdrag(nums);}
      return check.lines === line ? { ...check, champ: "", idx:"" } : check;
    });
    SetLineCham(after);

  }

  function Drop(event) {
    console.log(event)
    if(event.target.className.toLowerCase().includes("leftcham")){
      let newline = event.target.id;
      changeLine(newline,champion,idx);
      setTimeout(() => {
        nodrag(idx);
      }, 100);
    }
    setTimeout(() => {
      Setcham("");
    }, 100);
  }
  function dragOver(event) {
    event.preventDefault();
    // console.log(event);
  }
  function dragEnter(event) {
    event.preventDefault();
    // console.log(event);
  }
  function dragLeave() {
    // console.log("leave");
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
                  Setline(item.lines);
                  console.log(line, champion);
                }}
              >
                <img src={item.links} className={styles.lineImg} />
              </button>
              <img
                className={styles.btncham}
                onClick={() => {
                    reset(item.lines);
                }}
                onDragOver={(event)=>dragOver(event)}
                onDragEnter={(event)=>dragEnter(event)}
                onDragLeave={(event)=>dragLeave(event)}
                onDrop={(event)=>Drop(event)}
                id={item.lines}
                src={
                    item.champ
                      ? `/champion/tiles/${item.champ}_0.jpg`
                      : "/images/none.png"
                  }
                  draggable={false}
              >
              </img>
            </div>
          );
        })}
      </div>
    </>
  );
}
