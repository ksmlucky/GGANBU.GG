import { useRef, useState, useEffect } from "react";
import styles from "./RecommandResultList.module.css";

export default function WinningComponent(props) {
  const imgRef = useRef([]);
  const [rival, setRival] = useState("");
  let num = 0;
  useEffect(() => {
    if (imgRef && imgRef.current.length !== 0) {
      console.log(imgRef.current.length);
      for (let i = 0; i < imgRef.current.length; i++) {
        // console.log(imgRef.current[i]);
        imgRef.current[i].addEventListener("mouseover", function () {
          setRival(imgRef.current[i].name);
        });
      }
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.recommands}>
        <div className={styles.recommand}>
          <p className={styles.text}>승률</p>
          <div className={styles.imgs}>
            {props.winning.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              const numm = num;
              num++;
              return (
                <img
                  key={idx}
                  src={img}
                  className={styles.img}
                  name={obj}
                  ref={(el) => (imgRef.current[numm] = el)}
                ></img>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>라인전</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              const numm = num;
              num++;
              return (
                <img
                  key={idx}
                  src={img}
                  className={styles.img}
                  name={obj}
                  ref={(el) => (imgRef.current[numm] = el)}
                ></img>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>골드량</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              const numm = num;
              num++;
              return (
                <img
                  key={idx}
                  src={img}
                  className={styles.img}
                  name={obj}
                  ref={(el) => (imgRef.current[numm] = el)}
                ></img>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>포탑방패</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              const numm = num;
              num++;
              return (
                <img
                  key={idx}
                  src={img}
                  className={styles.img}
                  name={obj}
                  ref={(el) => (imgRef.current[numm] = el)}
                ></img>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>???</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              const numm = num;
              num++;
              return (
                <img
                  key={idx}
                  src={img}
                  className={styles.img}
                  name={obj}
                  ref={(el) => (imgRef.current[numm] = el)}
                ></img>
              );
            })}
          </div>
        </div>
        {/* result 결과 출력 */}
      </div>
      <div className={styles.resultdetailcontainer}>
        <div>{rival}</div>
      </div>
    </div>
  );
}
