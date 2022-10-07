import { useRef, useState, useEffect } from "react";
import styles from "./RecommandResultList.module.css";
import {
  newRecommend,
  rivalRecommend,
  myRecommend,
} from "../championSearchInput/CSInput";
import WithEnemies from "./WithEnemies";
import { setRevalidateHeaders } from "next/dist/server/send-payload";

export default function WinningComponent(props) {
  const imgRef = useRef([]);
  const [rival, setRival] = useState("");
  const [isLine, setIsLine] = useState(false);
  const [isMy, setIsMy] = useState(false);
  const [data, setData] = useState([
    {
      winRate: "",
      kill15: "",
      minion15: "",
      gold15: "",
      exp15: "",
      ewinRate: "",
      ekill15: "",
      eminion15: "",
      egold15: "",
      eexp15: "",
    },
  ]);

  let num = 0;
  useEffect(() => {
    if (imgRef && imgRef.current.length !== 0) {
      for (let i = 0; i < imgRef.current.length; i++) {
        imgRef.current[i].addEventListener("mouseover", function () {
          setRival(imgRef.current[i].name);
          if (imgRef.current[i].alt === "line") {
            setIsLine(true);
          } else {
            setIsLine(false);
          }
          if (imgRef.current[i].alt === "my") {
            setIsMy(true);
          } else {
            setIsMy(false);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    if (rivalRecommend) {
      rivalRecommend.map((el, idx) => {
        if (el.en === rival) {
          const winRate = (el.data.me.win * 100) / el.data.me.matchNum;
          const kill15 = el.data.me.kills15min / el.data.me.matchNum;
          const minion15 =
            el.data.me.totalMinionsKilled15min / el.data.me.matchNum;
          const gold15 = el.data.me.goldEarned15min / el.data.me.matchNum;
          const exp15 = el.data.me.champExperience15min / el.data.me.matchNum;
          const ewinRate = (el.data.rival.win * 100) / el.data.rival.matchNum;
          const ekill15 = el.data.rival.kills15min / el.data.rival.matchNum;
          const eminion15 =
            el.data.rival.totalMinionsKilled15min / el.data.rival.matchNum;
          const egold15 =
            el.data.rival.goldEarned15min / el.data.rival.matchNum;
          const eexp15 =
            el.data.rival.champExperience15min / el.data.rival.matchNum;
          setData((data) => {
            const newData = [...data];
            newData.winRate = parseInt(winRate);
            newData.kill15 = Math.round(kill15 * 100) / 100;
            newData.minion15 = Math.round(minion15);
            newData.gold15 = parseInt(gold15);
            newData.exp15 = parseInt(exp15);
            newData.ewinRate = parseInt(ewinRate);
            newData.ekill15 = Math.round(ekill15 * 100) / 100;
            newData.eminion15 = Math.round(eminion15);
            newData.egold15 = parseInt(egold15);
            newData.eexp15 = parseInt(eexp15);
            return newData;
          });
        }
      });
    }
  }, [rival]);

  return (
    <div className={styles.container}>
      <div className={styles.recommands}>
        <div className={styles.exs}>
          <img
            className={styles.ex}
            src={`/recommend/Hype_Kitty_Emote.webp`}
          ></img>
          <div className={styles.text}>최고</div>
          <img
            className={styles.ex}
            src={`/recommend/Excited_Kitten_Emote.webp`}
          ></img>
          <div className={styles.text}>좋음</div>
          <img className={styles.ex} src={`/recommend/Me-ow_Emote.webp`}></img>
          <div className={styles.text}>보통</div>
          <img
            className={styles.ex}
            src={`/recommend/Sad_Kitten_Emote.webp`}
          ></img>
          <div className={styles.text}>나쁨</div>
          <img
            className={styles.ex}
            src={`/recommend/Angry_Kitten_Emote.webp`}
          ></img>
          <div className={styles.text}>최악</div>
        </div>
        <div className={styles.recommand}>
          <div className={styles.text}>승률</div>
          <div className={styles.imgs}>
            {newRecommend &&
              newRecommend.map((obj, idx) => {
                const img = `/champion/tiles/${obj.en}_0.jpg`;
                const numm = num;
                num++;
                return (
                  <img
                    key={idx}
                    src={img}
                    className={styles.img}
                    name={obj.en}
                    ref={(el) => (imgRef.current[numm] = el)}
                  ></img>
                );
              })}
          </div>
        </div>
        {rivalRecommend && (
          <div className={styles.recommand}>
            <div className={styles.text}>라인전</div>
            <div className={styles.imgs}>
              {rivalRecommend &&
                rivalRecommend.map((obj, idx) => {
                  const img = `/champion/tiles/${obj.en}_0.jpg`;
                  const numm = num;
                  num++;
                  return (
                    <img
                      key={idx}
                      src={img}
                      className={styles.img}
                      name={obj.en}
                      alt="line"
                      ref={(el) => (imgRef.current[numm] = el)}
                    ></img>
                  );
                })}
            </div>
          </div>
        )}
        {myRecommend && (
          <div className={styles.recommand}>
            <div className={styles.text}>숙련도</div>
            <div className={styles.imgs}>
              {myRecommend &&
                myRecommend.map((obj, idx) => {
                  const img = `/champion/tiles/${obj.en}_0.jpg`;
                  const numm = num;
                  num++;
                  return (
                    <div className={styles.mas} key={idx}>
                      <img
                        src={img}
                        className={styles.img}
                        name={obj.en}
                        alt="my"
                        ref={(el) => (imgRef.current[numm] = el)}
                      ></img>
                      <div className={styles.texts}>★{obj.masteryLevel}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.resultdetailcontainer}>
        {rival && <img src={`/champion/loading/${rival}_0.jpg`}></img>}
        {!isLine && !isMy && rival && (
          <div className={styles.withEnemiesContainer}>
            {newRecommend.map((el, idx) => {
              if (el.en === rival) {
                return (
                  <div key={idx} className={styles.team}>
                    <div className={styles.tm}>
                      <WithEnemies
                        withTeamMates={el.withTeammates}
                      ></WithEnemies>
                    </div>
                    <div className={styles.tm}>
                      <WithEnemies withEnemies={el.withEnemies}></WithEnemies>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
        {isMy && rival && myRecommend && (
          <div className={styles.withEnemiesContainer}>
            {myRecommend.map((el, idx) => {
              if (el.en === rival) {
                return (
                  <div key={idx} className={styles.team}>
                    <div className={styles.tm}>
                      <WithEnemies
                        withTeamMates={el.withTeammates}
                      ></WithEnemies>
                    </div>
                    <div className={styles.tm}>
                      <WithEnemies withEnemies={el.withEnemies}></WithEnemies>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        )}
        {isLine && (
          <>
            <div className={styles.textcontainer}>
              <div className={styles.texts}>승률 : {data.winRate}%</div>
              <progress
                id="progress"
                value={data.winRate}
                min="0"
                max={data.winRate + data.ewinRate}
              ></progress>
              <div className={styles.texts}>15분 킬수 : {data.kill15}</div>
              <progress
                id="progress"
                value={data.kill15}
                min="0"
                max={data.kill15 + data.ekill15}
              ></progress>
              {rivalRecommend[0].position1 !== "JUNGLE" && (
                <>
                  <div className={styles.texts}>
                    15분 미니언 : {data.minion15}
                  </div>
                  <progress
                    id="progress"
                    value={data.minion15}
                    min="0"
                    max={data.minion15 + data.eminion15}
                  ></progress>
                </>
              )}
              <div className={styles.texts}>15분 골드 : {data.gold15}</div>
              <progress
                id="progress"
                value={data.gold15}
                min="0"
                max={data.gold15 + data.egold15}
              ></progress>
            </div>
            <img
              src={`/champion/loading/${rivalRecommend[0].rival}_0.jpg`}
            ></img>
          </>
        )}
      </div>
    </div>
  );
}
