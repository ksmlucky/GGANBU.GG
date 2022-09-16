import { useState, useEffect, useRef } from "react";
import styles from "./Ranking.module.css";
import ranking from "../../utils/ranking";

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
    <div className={styles.main}>
      <div className={styles.h1}>
        <h1>Ranking</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.att}>
          <div>Rank</div>
          <div>Summoner</div>
          <div>Tier</div>
          <div>LP</div>
          <div>Most Champion</div>
          <div>Win Rate</div>
        </div>
        <div className={styles.border}>
          <div className={styles.articles}>
            {/* <div className="styles.articleContainer"> */}
            {user
              .filter((num, idx) => {
                return parseInt(idx / 100) + 1 === page ? num : null;
              })
              .map((user, idx) => {
                return (
                  <div
                    key={idx}
                    className={styles.article}
                    ref={idx === 0 ? scrollRef : null}
                  >
                    <div>{user.rank}</div>
                    <div>{user.summoner}</div>
                    <div>{user.tier}</div>
                    <div>{user.lp}</div>
                    <div className={styles.imgs}>
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
                    </div>
                    <div>
                      <progress
                        className={styles.progress}
                        value={user.winRate}
                        min="0"
                        max="100"
                      ></progress>
                    </div>
                  </div>
                );
              })}
            {/* </div> */}
          </div>
        </div>
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
  );
}
