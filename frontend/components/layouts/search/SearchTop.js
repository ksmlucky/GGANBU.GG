import styles from "./SearchTop.module.css";
export default function SearchTop() {
  const icon = "/spell/barrier.png";
  return (
    <>
        <div className={styles.icon}>
            <img src="/spell/barrier.png" width={100} height={100}></img>
            <label className={styles.label}> summonerId </label>
            
        </div>
        <div>
          <img src="/tier/gold.png" width={100} height={100}></img>
          <label >100승 95패</label></div>
    </>
  );
}