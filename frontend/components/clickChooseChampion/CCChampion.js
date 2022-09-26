import styles from "./CCChampion.module.css";
import championList from "../../utils/champion";
import CCSInput from "../clickChampionSearchInput/CCSInput";
import { useEffect, useRef, useState } from "react";

export default function ClickChooseChampion(props) {
  const clist = championList(); //챔피언 목록
  const [pickchampion, SetPickchampion] = useState(""); //마우스로 잡은 챔피언(한국어)
  const [pickchampionEng, SetPickchampionEng] = useState(""); //마우스로 잡은 챔피언(영어)
  let [pickchampionindex, SetPickchampionindex] = useState(); //마우스로 잡은 챔피언의 index(숫자)
  let [csinput, setCsinput] = useState(""); //챔피언 검색을 위한 입력 결과(한국어)

  const click = (en) => {
    console.log(en);
    SetPickchampionEng(en);
  };

  const csInput = (input) => {
    setCsinput(input);
  };

  return (
    <>
      <main className={styles.main}>
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
                      onClick={() => {
                        click(item.en);
                        if (props.clickChamp) {
                          props.clickChamp(item.en);
                        }
                      }}
                    >
                      <img
                        src={`/champion/tiles/${item.en}_0.jpg`}
                        id={item.ko}
                        alt={item.en}
                        index={item.index}
                        selected={item.selected}
                        className={styles.img}
                        style={{
                          border:
                            item.en === pickchampionEng
                              ? "2px solid var(--gold3)"
                              : "none",
                        }}
                        draggable={false}
                      />
                      <span className={styles.name}>{item.ko}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
          <CCSInput csInput={csInput} pickchampionEng={pickchampionEng} />
        </div>
      </main>
    </>
  );
}
