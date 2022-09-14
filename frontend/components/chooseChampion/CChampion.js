import styles from "./CChampion.module.css";
import championList from "../../utils/champion";

export default function Detail() {
  const clist = championList();

  function clicked(name) {
    console.log(name);
  }
  return (
    <>
      <main className={styles.main}>
        <ul className={styles.ul}>
          {clist.map((item, idx) => {
            return (
              <li key={idx} className={styles.li}>
                <button className={styles.btn} onClick={() => clicked(item.en)}>
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
      </main>
    </>
  );
}
