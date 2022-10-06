import { useRef, useState, useEffect } from "react";
import styles from "./RecommandResultList.module.css";
import { newRecommend, rivalRecommend } from "../championSearchInput/CSInput";

export default function WinningComponent(props) {
  const imgRef = useRef([]);
  const [rival, setRival] = useState("");
  const [isLine, setIsLine] = useState(false);
  console.log(newRecommend);
  console.log(rivalRecommend);
  let num = 0;
  useEffect(() => {
    if (imgRef && imgRef.current.length !== 0) {
      console.log(imgRef.current.length);
      for (let i = 0; i < imgRef.current.length; i++) {
        // console.log(imgRef.current[i]);
        imgRef.current[i].addEventListener("mouseover", function () {
          setRival(imgRef.current[i].name);
          if (imgRef.current[i].alt === "line") {
            setIsLine(true);
          } else {
            setIsLine(false);
          }
        });
      }
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.recommands}>
        <div className={styles.recommand}>
          <div className={styles.text}>승률</div>
          <div className={styles.imgs}>
            {newRecommend.map((obj, idx) => {
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
        <div className={styles.recommand}>
          <div className={styles.text}>라인전</div>
          <div className={styles.imgs}>
            {rivalRecommend.map((obj, idx) => {
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
      </div>
      <div className={styles.resultdetailcontainer}>
        {rival && <img src={`/champion/loading/${rival}_0.jpg`}></img>}
        {isLine && (
          <img src={`/champion/loading/${rivalRecommend[0].rival}_0.jpg`}></img>
        )}
      </div>
    </div>
  );
}
