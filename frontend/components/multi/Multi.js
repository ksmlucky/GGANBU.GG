import styles from "./Multi.module.css";

export default function Multi() {
  return (
    <div className={styles.main}>
      <button className={styles.button}>SEARCH</button>
      <div className={styles.resultcontainer}>
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
