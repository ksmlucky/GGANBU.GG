import { useState, useEffect } from "react";
import styles from "./CSInput.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { statistics } from "../../api/api";
import axios from "axios";
import championList from "../../utils/champion";

export let newRecommend;
export let rivalRecommend;
export default function CSInput({
  csInput,
  selectline,
  leftchampion,
  rightchampion,
}) {
  const router = useRouter();
  const [recommend, setRecommend] = useState([]);
  const clist = championList();
  function resultfunc() {
    const line = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];
    let myline = line.indexOf(selectline);
    console.log(myline);
    console.log(leftchampion);
    console.log(rightchampion);
    const enemies = [];
    const teamMates = [];
    leftchampion.map((el) => {
      if (el.idx !== "") {
        teamMates.push({ championId: el.idx, position: el.lines });
      }
    });
    rightchampion.map((el) => {
      if (el.idx !== "") {
        enemies.push({ championId: el.idx, position: el.lines });
      }
    });
    // if (selectline) {
    //   if (rightchampion[myline].champ) {
    //     router.push(result);
    //   } else {
    //     alert("내 맞은편 라인에는 챔피언이 있어야합니다!");
    //   }
    // }
    axios({
      method: "post",
      url: statistics.recommend(),
      data: {
        enemies: enemies,
        teamMates: teamMates,
        roughTier: "high",
        myPosition: line[myline],
      },
    })
      .then((res) => {
        console.log(res.data);
        console.log(res.data[1].rivalDatas);
        if (res.data[0].evaluators) {
          newRecommend = res.data[0].evaluators.map((el, idx) => {
            const num = clist.findIndex((e) => e.key === el.championId);
            const withE = el.withEnemies.map((en) => {
              const numE = clist.findIndex((ele) => ele.key === en.championId);
              return { ...en, ko: clist[numE].ko, en: clist[numE].en };
            });
            const withT = el.withTeammates.map((en) => {
              const numE = clist.findIndex((ele) => ele.key === en.championId);
              return { ...en, ko: clist[numE].ko, en: clist[numE].en };
            });
            const newEl = { ...el };
            newEl.ko = clist[num].ko;
            newEl.en = clist[num].en;
            newEl.withEnemies = withE;
            newEl.withTeammates = withT;
            console.log(newEl);
            return newEl;
          });
        }
        if (res.data[1].rivalDatas) {
          rivalRecommend = res.data[1].rivalDatas.map((el, idx) => {
            const num = clist.findIndex((e) => e.key === el.champion1);
            const rivalNum = clist.findIndex((e) => e.key === el.champion2);
            const newEl = { ...el };
            newEl.ko = clist[num].ko;
            newEl.en = clist[num].en;
            newEl.rival = clist[rivalNum].en;
            return newEl;
          });
        }
        console.log(newRecommend);
        console.log(rivalRecommend);
        router.push(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function dragover(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "none";
  }

  function changes(e) {
    let champion_name = e.target.value;
    csInput(champion_name);
  }

  const result = "/recommandresult";

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <input
          type="text"
          id="search"
          placeholder="챔피언을 검색하세요"
          onChange={changes}
          onDragOver={(event) => {
            dragover(event);
          }}
          required={true}
        />
        <i></i>
      </div>
      <button
        className={styles.btn}
        onClick={() => {
          resultfunc();
        }}
      >
        결과
      </button>
    </div>
  );
}
