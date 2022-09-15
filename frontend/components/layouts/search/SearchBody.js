import styles from "./SearchBody.module.css";

const champion =[
    {id :1, cham : "Aatrox", date : "2022-09-08", result : true, spell1 : "flash", spell2 : "teleport"},
    {id :2, cham : "Gwen", date : "2022-09-07", result : true, spell1 : "ignite", spell2 : "teleport"},
    {id :3, cham : "Vladimir", date : "2022-09-06", result : false, spell1 : "ignite", spell2 : "ghost"}
  ]
export default function SearchBody() {
  

  return (
    <>
        <div className={styles.result}>
            {champion.map((cham, idx)=>{
                let championImg = `/champion/tiles/${cham.cham}_0.jpg`
                let spell1Img = `/spell/${cham.spell1}.png`;
                let spell2Img = `/spell/${cham.spell2}.png`;
                return(
                    <div key={idx}>
                        <div className={cham.result === true ? styles.win : styles.lose}>
                                <label className={styles.label}>{cham.date}</label>
                                <div>
                                    <img src={championImg} width={75} height={75}></img>
                                </div>
                                <div>
                                    <img className={styles.spell} src={spell1Img} width={35} height={35}></img>
                                    <img className={styles.spell} src={spell2Img} width={35} height={35}></img>
                                </div>
                                <div>
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