import { useEffect, useState } from "react";
import styles from "./skillQuiz.module.css";
import championList from "../../utils/champion";

export default function SkillQuiz({setMode}) {
  const clist = championList();
  const [randomChampion, setRandomChampion] = useState(Math.floor(Math.random()*161));
  const [randomSkill, setRandomSkill] = useState(Math.floor(Math.random()*5));
  const [gameStart, setGameStart] = useState(false);
  useEffect(()=>{
  },[])
  useEffect(()=>{
},[randomChampion,randomSkill])
  return (
    <>
        {gameStart === false &&
        <div className={styles.container}>  
            <button className={styles.btn} onClick={()=>{
                setGameStart(true);
            }}>
            게임 시작
            </button>
        </div>
        }
        {gameStart ===true && 
        <div className={styles.container}>
            해당 스킬을 가진 챔피언을 입력하시오.
            {clist.findIndex(i=>i.index ===randomChampion) &&
            <>                    
                {randomSkill === 0 ? (
                    <img 
                    src={`/passive/${clist[randomChampion].passive}.png`}
                    id={clist[randomChampion].ko}
                    alt={clist[randomChampion].en}
                    />
                ) : randomSkill === 1 ? (
                    <img 
                    src={`/skill/${clist[randomChampion].Q}.png`}
                    id={clist[randomChampion].ko}
                    alt={clist[randomChampion].en}
                    />
                ) : randomSkill === 2 ? (
                    <img 
                    src={`/skill/${clist[randomChampion].W}.png`}
                    id={clist[randomChampion].ko}
                    alt={clist[randomChampion].en}
                    />
                ) : randomSkill === 3 ? (
                    <img 
                    src={`/skill/${clist[randomChampion].E}.png`}
                    id={clist[randomChampion].ko}
                    alt={clist[randomChampion].en}
                    />
                ) : (
                    <img 
                    src={`/skill/${clist[randomChampion].R}.png`}
                    id={clist[randomChampion].ko}
                    alt={clist[randomChampion].en}
                    />
                ) }
            </>
            }
            <button className={styles.btn} onClick={()=>{
                setRandomChampion(()=>{
                    return Math.floor(Math.random()*161);
                });
                setRandomSkill(()=>{
                    return Math.floor(Math.random()*5);
                })
            }}>
            제출
            </button>
        </div>
        }

    </>
  );
}
