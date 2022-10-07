import { useState, useEffect } from "react";
import styles from "./CSInput.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { statistics } from "../../api/api";
import axios from "axios";
import championList from "../../utils/champion";

export let newRecommend;
export let rivalRecommend;
export let myRecommend;
export default function CSInput({
  csInput,
  selectline,
  leftchampion,
  rightchampion,
  summoner,
}) {
  const router = useRouter();
  const [recommend, setRecommend] = useState([]);
  const clist = championList();
  useEffect(() => {
    myRecommend = null;
    rivalRecommend = null;
  });
  function resultfunc() {
    const line = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "UTILITY"];
    let myline = line.indexOf(selectline);
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

    axios({
      method: "post",
      url: statistics.recommend(),
      data: {
        enemies: enemies,
        teamMates: teamMates,
        roughTier: "high",
        myPosition: line[myline],
        summonerName: summoner,
      },
    })
      .then((res) => {
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
            return newEl;
          });
        }
        if (res.data[1] && res.data[1].recommnedType === "LANING_RECOMMEND") {
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
        if (res.data[1] && res.data[1].recommnedType === "MASTERY_RECOMMEND") {
          myRecommend = res.data[1].evaluators.map((el, idx) => {
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
            return newEl;
          });
        }
        if (res.data[2]) {
          myRecommend = res.data[2].evaluators.map((el, idx) => {
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
            return newEl;
          });
        }
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
