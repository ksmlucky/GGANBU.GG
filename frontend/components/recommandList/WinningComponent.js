import Image from "next/image";
import styles from "./RecommandList.module.css";

export default function WinningComponent(props) {
  console.log(props.winning);
  return (
    <div className={styles.recommands}>
      <div className={styles.recommand}>
        <p className={styles.text}>승률</p>
        <div className={styles.imgs}>
          {props.winning.map((obj, idx) => {
            const img = `/champion/tiles/${obj}_0.jpg`;
            return (
              <div key={idx} className={styles.img}>
                <Image
                  src={img}
                  layout="intrinsic"
                  height={50}
                  width={50}
                ></Image>
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
                <Image
                  src={img}
                  layout="intrinsic"
                  height={50}
                  width={50}
                ></Image>
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
                <Image
                  src={img}
                  layout="intrinsic"
                  height={50}
                  width={50}
                ></Image>
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
                <Image
                  src={img}
                  layout="intrinsic"
                  height={50}
                  width={50}
                ></Image>
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
                <Image
                  src={img}
                  layout="intrinsic"
                  height={50}
                  width={50}
                ></Image>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
