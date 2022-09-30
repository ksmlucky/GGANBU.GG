import { useState } from "react";
import Multisearch from "../multisearch/Multisearch";
import Search from "../search/Search";
import styles from "./Multi.module.css";
import { classNames } from "./../../utils/classNames";

export default function Multi() {
  const [modal, setModal] = useState(true);
  const [players, setPlayers] = useState([
    "Paker",
    "Ghoby",
    "Nomaker",
    "Carryaa",
    "Rullu",
  ]);
  function clickButton() {
    setModal(!modal);
  }
  function setSearch(search) {
    const players = search.trim().split("\n");
    const newPlayers = players.map((player) => {
      return player.substring(0, player.length - 14);
    });
    setPlayers(newPlayers);
  }
  return (
    <div className={styles.main}>
      {modal && (
        <Multisearch
          clickButton={clickButton}
          setSearch={setSearch}
        ></Multisearch>
      )}
      <div className={styles.resultcontainer}>
        <button
          className={styles.button}
          onClick={() => {
            clickButton();
          }}
        >
          검색
        </button>
        <div className={styles.top}>
          <span className={styles.name}>{players[0]}</span>
          <div className={styles.img}>
            <img src="/tier/master.png" alt="" style={{ width: "80%" }} />
          </div>
          <div className={styles.champ}>
            <img
              src="/champion/tiles/Aatrox_0.jpg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div className={styles.search}>
            <img
              src="/line/jungle.svg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
        </div>
        <div className={styles.jug}>
          <span className={styles.name}>{players[1]}</span>
          <div className={styles.img}>
            <img src="/tier/platinum.png" alt="" style={{ width: "80%" }} />
          </div>
          <div className={styles.champ}>
            <img
              src="/champion/tiles/Ekko_0.jpg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div className={styles.search}>
            <img
              src="/line/top.svg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
        </div>
        <div className={styles.mid}>
          <span className={styles.name}>{players[2]}</span>
          <div className={styles.img}>
            <img src="/tier/bronze.png" alt="" style={{ width: "80%" }} />
          </div>
          <div className={styles.champ}>
            <img
              src="/champion/tiles/Gwen_0.jpg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div className={styles.search}>
            <img
              src="/line/mid.svg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
        </div>
        <div className={styles.bot}>
          <span className={styles.name}>{players[3]}</span>
          <div className={styles.img}>
            <img src="/tier/gold.png" alt="" style={{ width: "80%" }} />
          </div>
          <div className={styles.champ}>
            <img
              src="/champion/tiles/MissFortune_0.jpg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div className={styles.search}>
            <img
              src="/line/support.svg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
        </div>
        <div className={styles.sup}>
          <span className={styles.name}>{players[4]}</span>
          <div className={styles.img}>
            <img src="/tier/platinum.png" alt="" style={{ width: "80%" }} />
          </div>
          <div className={styles.champ}>
            <img
              src="/champion/tiles/Pyke_0.jpg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
          <div className={styles.search}>
            <img
              src="/line/bot.svg"
              alt=""
              style={{ width: "80%", marginTop: "20px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
