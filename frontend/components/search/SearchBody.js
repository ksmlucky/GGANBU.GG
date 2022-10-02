import styles from "./SearchBody.module.css";

const champion = [
  { cham: "Aatrox", date: "2022-09-08", result: true, spell1: "flash", spell2: "teleport", item1: "", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "" },
  { cham: "Gwen", date: "2022-09-07", result: true, spell1: "ignite", spell2: "teleport", item1: "", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "" },
  { cham: "Vladimir", date: "2022-09-06", result: false, spell1: "ignite", spell2: "ghost", item1: "", item2: "", item3: "", item4: "", item5: "", item6: "", item7: "" }
]
export default function SearchBody() {
  return (
    <>
      <div>
        <button className={styles.btn}>갱신</button>
      </div>
      <div className={styles.result}>
        {champion.map((cham, idx) => {
          let championImg = `/champion/tiles/${cham.cham}_0.jpg`
          let spell1Img = `/spell/${cham.spell1}.png`;
          let spell2Img = `/spell/${cham.spell2}.png`;

          return (
            <div key={idx}>
              <div className={cham.result === true ? styles.win : styles.lose}>
                <label className={styles.label}>{cham.date}<br></br>{cham.result === true ? "승리" : "패배"}</label>
                <div>
                  <img src={championImg} width={75} height={75}></img>
                </div>
                <div>
                  <img className={styles.spell} src={spell1Img}></img>
                  <img className={styles.spell} src={spell2Img}></img>
                </div>
                <div>
                  <img className={styles.item} src={`${cham.item1}` === "" ? "/item/noItem.png" : `"/item/${cham.item1}.png"`}></img>
                  <img className={styles.item} src={`${cham.item2}` === "" ? "/item/noItem.png" : `"/item/${cham.item2}.png"`}></img>
                  <img className={styles.item} src={`${cham.item3}` === "" ? "/item/noItem.png" : `"/item/${cham.item3}.png"`}></img>
                  <img className={styles.item} src={`${cham.item4}` === "" ? "/item/noItem.png" : `"/item/${cham.item4}.png"`}></img>
                  <img className={styles.item} src={`${cham.item5}` === "" ? "/item/noItem.png" : `"/item/${cham.item5}.png"`}></img>
                  <img className={styles.item} src={`${cham.item6}` === "" ? "/item/noItem.png" : `"/item/${cham.item6}.png"`}></img>
                  <img className={styles.item} src={`${cham.item6}` === "" ? "/item/noItem.png" : `"/item/${cham.item7}.png"`}></img>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    </>
  );
}