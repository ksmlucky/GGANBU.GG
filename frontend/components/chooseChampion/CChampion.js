import styles from "./CChampion.module.css";
import championList from "../../utils/champion";
import CSInput from "../championSearchInput/CSInput";
import { useEffect, useRef, useState } from "react";
import LeftCham from "../leftSelect/LeftCham";
import RightCham from "../rightSelect/RightCham";

export default function ChooseChampion() {
  const clist = championList(); //챔피언 목록
  const [pickchampion, SetPickchampion] = useState(""); //마우스로 잡은 챔피언(한국어)
  const [pickchampionEng, SetPickchampionEng] = useState(""); //마우스로 잡은 챔피언(영어)
  let [pickchampionindex, SetPickchampionindex] = useState(); //마우스로 잡은 챔피언의 index(숫자)
  let [csinput, setCsinput] = useState(""); //챔피언 검색을 위한 입력 결과(한국어)
  const [selectedchampion, SetSelectedchampion] = useState([]); //선택한 챔피언(전체)(한국어)
  const [leftchampion, SetLeftchampion] = useState([]); //선택한 챔피언(우리팀)
  const [rightchampion, SetRightchampion] = useState([]); //선택한 챔피언(상대팀)
  const [summoner, setSummoner] = useState("");

  const [selectline, Setselectline] = useState("top");

  const [makefive, Setmakefive] = useState(false);

  useEffect(() => {
    SetSelectedchampion([]);
  }, [selectline]);

  // 사용자가 객체(object)를 드래그하려고 시작할 때 발생함.
  const onDragStart = (event) => {
    SetPickchampion(event.target.id);
    SetPickchampionEng(event.target.alt);
  };

  // 잡은 Item을 놓았을 때 발생
  const onDragEnd = (event) => {
    SetPickchampion("");
  };

  const csInput = (input) => {
    setCsinput(input);
  };

  function dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  }

  function changes(e) {
    let champion_name = e.target.value;
    setSummoner(champion_name);
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.titlecontainer}>
          <span className={styles.title}>챔피언 선택</span>
          <img></img>
        </div>
        <div className={styles.maincontainer}>
          <LeftCham
            pickchampionindex={pickchampionindex} //마우스로 잡은 챔피언
            selectedchampion={selectedchampion}
            SetSelectedchampion={SetSelectedchampion}
            pickchampion={pickchampion}
            pickchampionEng={pickchampionEng}
            Setselectline={Setselectline}
            SetLeftchampion={SetLeftchampion}
            makefive={makefive}
            Setmakefive={Setmakefive}
          />

          <div className={styles.uiandinput}>
            <div className={styles.sumonercontainer}>
              <button
                className={styles.givefive}
                onClick={() => {
                  Setmakefive(!makefive);
                }}
                style={{
                  color: makefive ? "var(--logo)" : "var(--text)",
                }}
              >
                {makefive ? "전체모드" : "깐부모드"}
              </button>
              <input
                type="text"
                id="search"
                placeholder="소환사 이름을 적어보세요"
                onChange={changes}
                onDragOver={(event) => {
                  dragover(event);
                }}
                required={true}
              />
            </div>
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
                      <img
                        src={`/champion/tiles/${item.en}_0.jpg`}
                        id={item.ko}
                        alt={item.en}
                        index={item.index}
                        selected={item.selected}
                        className={styles.img}
                        draggable={
                          selectedchampion.indexOf(item.ko) === -1
                            ? true
                            : false
                        }
                        style={{
                          filter:
                            selectedchampion.indexOf(item.ko) === -1
                              ? "saturate(1)"
                              : "saturate(0)",
                        }}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                      // ref={(el) => (refer.current[idx] = el)}
                      />
                      <span className={styles.name}>{item.ko}</span>
                    </li>
                  );
                })}
            </ul>
            <CSInput
              csInput={csInput}
              selectline={selectline}
              leftchampion={leftchampion}
              rightchampion={rightchampion}
            />
          </div>
          <RightCham
            pickchampionindex={pickchampionindex} //마우스로 잡은 챔피언
            selectedchampion={selectedchampion}
            SetSelectedchampion={SetSelectedchampion}
            pickchampion={pickchampion}
            pickchampionEng={pickchampionEng}
            selectline={selectline}
            SetRightchampion={SetRightchampion}
            makefive={makefive}
            Setmakefive={Setmakefive}
          />
        </div>
      </div>
    </>
  );
}
