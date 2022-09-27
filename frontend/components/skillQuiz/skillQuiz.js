import { useEffect, useState } from "react";
import styles from "./skillQuiz.module.css";
import championList from "../../utils/champion";

export default function SkillQuiz({setMode}) {
  const clist = championList();
  const [randomChampion, setRandomChampion] = useState(Math.floor(Math.random()*161));
  const [randomSkill, setRandomSkill] = useState(Math.floor(Math.random()*5));
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [gameStart, setGameStart] = useState(false);



  useEffect(()=>{
  },[])
  useEffect(()=>{
    setValue("");
    console.log("점수 : "+score)
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
            {timerId}
            해당 스킬을 가진 챔피언을 입력하시오.
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
            <input className={styles.text} placeholder="챔피언 이름" value={value} onChange={(event)=>{
                setValue(event.target.value);
            }}></input>
            <button className={styles.btn} onClick={()=>{
                if(value === clist[randomChampion].ko){
                    setScore((score)=>score+1);
                }
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
