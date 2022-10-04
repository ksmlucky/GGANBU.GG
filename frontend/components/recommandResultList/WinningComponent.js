import styles from "./RecommandResultList.module.css";

export default function WinningComponent(props) {
  return (
    <div className={styles.recommandresultcontainer}>
      <div className={styles.recommands}>
        <div className={styles.recommand}>
          <p className={styles.text}>승률</p>
          <div className={styles.imgs}>
            {props.winning.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              return (
                <div key={idx} className={styles.img}>
                  <img src={img}></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>라인전</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              return (
                <div key={idx} className={styles.img}>
                  <img src={img}></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>골드량</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              return (
                <div key={idx} className={styles.img}>
                  <img src={img}></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>포탑방패</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              return (
                <div key={idx} className={styles.img}>
                  <img src={img}></img>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.recommand}>
          <p className={styles.text}>???</p>
          <div className={styles.imgs}>
            {props.line.map((obj, idx) => {
              const img = `/champion/tiles/${obj}_0.jpg`;
              return (
                <div key={idx} className={styles.img}>
                  <img src={img}></img>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* result 결과 출력 */}
      <div classname={styles.resultdetailcontainer}></div>
    </div>
  );
}
