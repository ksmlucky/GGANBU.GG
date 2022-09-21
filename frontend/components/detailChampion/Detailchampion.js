import { useRouter } from "next/router";
import styles from "./Detailchampion.module.css";
import championList from "../../utils/champion";
import { useEffect } from "react";

export default function DetailChampion() {
  const router = useRouter();
  const { id } = router.query;

  const clist = championList();

  return (
    <div>
      <div className={styles.boxflexs}>
        <div className={styles.container}>
          <div className={styles.profile}>
            <div className={styles.tiles}>
              <img src={id ? `/champion/tiles/${id}_0.jpg` : null}></img>
            </div>

            <div className={styles.name}>
              <span>
                {id ? clist.find((element) => element.en === id).ko : null}
              </span>
            </div>

            <div className={styles.skills}>
              <img
                src={
                  id
                    ? `/passive/${
                        clist.find((element) => element.en === id).passive
                      }.png`
                    : null
                }
              ></img>
              <img
                src={
                  id
                    ? `/skill/${
                        clist.find((element) => element.en === id).Q
                      }.png`
                    : null
                }
              ></img>
              <img
                src={
                  id
                    ? `/skill/${
                        clist.find((element) => element.en === id).W
                      }.png`
                    : null
                }
              ></img>
              <img
                src={
                  id
                    ? `/skill/${
                        clist.find((element) => element.en === id).E
                      }.png`
                    : null
                }
              ></img>
              <img
                src={
                  id
                    ? `/skill/${
                        clist.find((element) => element.en === id).R
                      }.png`
                    : null
                }
              ></img>
            </div>
          </div>
          <div className={styles.rune}>
            <div className={styles.primary}>
              <div className={styles.PrimaryMain}></div>
              <div className={styles.PrimaryRowOne}></div>
              <div className={styles.PrimaryRowTwo}></div>
              <div className={styles.PrimaryRowThree}></div>
              <div className={styles.PrimaryRowFour}></div>
            </div>
            <div className={styles.secondary}>
              <div className={styles.SecondaryMain}></div>
              <div className={styles.SecondaryRowOne}></div>
              <div className={styles.SecondaryRowTwo}></div>
              <div className={styles.SecondaryRowThree}></div>
            </div>
            <div className={styles.statmods}>
              <div className={styles.StatmodsMain}></div>
              <div className={styles.StatmodsRowOne}></div>
              <div className={styles.StatmodsRowTwo}></div>
              <div className={styles.StatmodsRowThree}></div>
            </div>
          </div>
          <div className={styles.skill}></div>
          <div className={styles.item}></div>
        </div>
      </div>
    </div>
  );
}
