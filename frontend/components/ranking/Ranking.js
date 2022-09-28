import { useState, useEffect, useRef } from "react";
import styles from "./Ranking.module.css";
import ranking from "../../utils/ranking";
import { div } from "@tensorflow/tfjs";

export default function Ranking() {
  const [user, setUser] = useState(ranking);
  const [page, setPage] = useState(1);
  const [lenArr, setLenArr] = useState([]);
  const scrollRef = useRef();
  const scrollTop = function () {
    scrollRef.current.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
  };
  useEffect(() => {
    setLenArr([...Array(parseInt(user.length / 100) + 1).keys()]);
  }, [page]);
  return (
    <div className={styles.flexbox}>
      <div className={styles.main}>
        <div className={styles.titlecontainer}>
          <div className={styles.h1}>Ranking</div>
          <div  className={styles.titleout}> <div className={styles.title}></div></div>
        </div>
        <div className={styles.container}>
          <table className={styles.border}>
            <thead className={styles.head}>
              <tr className={styles.att}>
                <th>Rank</th>
                <th>Summoner</th>
                <th>Tier</th>
                <th>LP</th>
                <th>Most Champion</th>
                <th>Win Rate</th>
              </tr>
            </thead>
            <tbody className={styles.articles}>
              {user
                .filter((num, idx) => {
                  return parseInt(idx / 100) + 1 === page ? num : null;
                })
                .map((user, idx) => {
                  return (
                    <tr
                      key={idx}
                      className={styles.article}
                      ref={idx === 0 ? scrollRef : null}
                    >
                      <td>{user.rank}</td>
                      <td>{user.summoner}</td>
                      <td>{user.tier}</td>
                      <td>{user.lp}</td>
                      <td className={styles.imgs}>
                        <img
                          src={`/champion/tiles/${user.mostChampion[0]}_0.jpg`}
                          className={styles.img}
                        ></img>
                        <img
                          src={`/champion/tiles/${user.mostChampion[1]}_0.jpg`}
                          className={styles.img}
                        ></img>
                        <img
                          src={`/champion/tiles/${user.mostChampion[2]}_0.jpg`}
                          className={styles.img}
                        ></img>
                      </td>
                      <td>
                        <progress
                          className={styles.progress}
                          value={user.winRate}
                          min="0"
                          max="100"
                        ></progress>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className={styles.buttons}>
          {lenArr.map((num, idx) => {
            return (
              <div key={idx}>
                <button
                  className={styles.button}
                  onClick={(e) => {
                    setPage(Number(e.target.innerText));
                    scrollTop();
                  }}
                >
                  {num + 1}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
