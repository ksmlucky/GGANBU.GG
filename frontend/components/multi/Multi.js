import { useState } from "react";
import Multisearch from "../multisearch/Multisearch";
import Search from "../search/Search";
import styles from "./Multi.module.css";

export default function Multi() {
  const [modal, setModal] = useState(false);
  function clickButton() {
    setModal(!modal);
  }
  function setSearch(search) {
    const players = search.trim().split("\n");
    const newPlayers = players.map((player) => {
      return player.substring(0, player.length - 14);
    });
    console.log(newPlayers);
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
          <h3>TOP</h3>
          <div className={styles.img}></div>
          <div className={styles.champ}></div>
          <div className={styles.search}></div>
        </div>
        <div className={styles.jug}>
          <h3>JUG</h3>
          <div className={styles.img}></div>
          <div className={styles.champ}></div>
          <div className={styles.search}></div>
        </div>
        <div className={styles.mid}>
          <h3>MID</h3>
          <div className={styles.img}></div>
          <div className={styles.champ}></div>
          <div className={styles.search}></div>
        </div>
        <div className={styles.bot}>
          <h3>BOT</h3>
          <div className={styles.img}></div>
          <div className={styles.champ}></div>
          <div className={styles.search}></div>
        </div>
        <div className={styles.sup}>
          <h3>SUP</h3>
          <div className={styles.img}></div>
          <div className={styles.champ}></div>
          <div className={styles.search}></div>
        </div>
      </div>
    </div>
  );
}
