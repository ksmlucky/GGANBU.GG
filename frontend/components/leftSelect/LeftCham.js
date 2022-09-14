import styles from "./LeftCham.module.css";
import { useState } from "react";

export default function LeftCham({ cham }) {
  let [line, Setline] = useState("");
  let [lineCham, SetLineCham] = useState([
    { id: "1", lines: "top", champ: "", links: "/line/top.png" },
    { id: "2", lines: "jungle", champ: "", links: "/line/jungle.png" },
    { id: "3", lines: "mid", champ: "", links: "/line/mid.png" },
    { id: "4", lines: "support", champ: "", links: "/line/support.png" },
    { id: "5", lines: "bot", champ: "", links: "/line/bot.png" },
  ]);
  let champion = cham;
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

                  // SetLineCham(
                  //   lineCham.map((itemc) => {
                  //     itemc.lines === line
                  //       ? {
                  //           id: item.id,
                  //           lines: line,
                  //           champ: champion,
                  //           links: `/line/${item.lines}.png`,
                  //         }
                  //       : itemc;
                  //   })
                  // );
                }}
              >
                <img src={item.links} className={styles.lineImg} />
              </button>
              <img
                src={
                  item.champ
                    ? `/champion/tiles/${item.champ}_0.jpg`
                    : "/images/none.png"
                }
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
