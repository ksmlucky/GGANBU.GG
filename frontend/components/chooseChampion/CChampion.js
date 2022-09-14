import styles from "./CChampion.module.css";
import championList from "../../utils/champion";
import CSInput from "../championSearchInput/CSInput";
import { useState } from "react";
import LeftCham from "../leftSelect/LeftCham";

export default function Detail() {
  const clist = championList();

  let [csinput, setCsinput] = useState("");
  let [cham, Setcham] = useState("");

  function searching(text) {
    let name = csinput.toLowerCase();
    if (text.toLowerCase().includes(name.toLowerCase())) {
      return "display:none";
    } else {
      return "display:''";
    }
  }

  function clicked(name) {
    Setcham(name);
  }
  return (
    <>
      <main className={styles.main}>
        <LeftCham cham={cham} />
        <div className={styles.choose}>
          <ul className={styles.ul}>
            {clist
              .filter((value) => {
                if (
                  csinput == "" ||
                  value.ko.toLowerCase().includes(csinput.toLocaleLowerCase())
                ) {
                  return value;
                }
              })
              .map((item, idx) => {
                return (
                  <li key={idx} className={styles.li}>
                    <button
                      className={styles.btn}
                      onClick={() => clicked(item.en)}
                    >
                      <img
                        src={`/champion/tiles/${item.en}_0.jpg`}
                        id={item.ko}
                        className={styles.img}
                      />
                      <span className={styles.name}>{item.ko}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
          <CSInput setCsinput={setCsinput} />
        </div>
        <div className={styles.right}>right</div>
      </main>
    </>
  );
}
