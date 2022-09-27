import { useEffect, useRef, useState } from "react";
import styles from "./skillQuiz.module.css";
import championList from "../../utils/champion";

export default function SkillQuiz({setMode}) {
  const clist = championList();
  const [randomChampion, setRandomChampion] = useState(Math.floor(Math.random()*161));
  const [randomSkill, setRandomSkill] = useState(Math.floor(Math.random()*5));
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [gameStart, setGameStart] = useState(false);
  const intervalId = useRef(null);

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
            1분동안 최대한 많은 문제를 맞추세요!
            <button className={styles.btn} onClick={()=>{
                setGameStart(true);
                intervalId.current = setInterval(()=>setTimer((timer)=>timer-1),1000);
            }}>
            게임 시작
            </button>
        </div>
        }

        {gameStart === true && timer >= 0 &&
        <>
        <div className={styles.score}>점수 : {score}</div>
        <div className={styles.container}>
            <div className={styles.timer}>{timer}</div>
            해당 스킬을 가진 챔피언을 입력하시오.                  
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

            <input className={styles.text} 
            placeholder="챔피언 이름" 
            value={value} 
            onChange={(event)=>{
                setValue(event.target.value);
            }}
            onKeyDown={(event)=>{
                if(event.key === 'Enter'){
                    if(value === clist[randomChampion].ko){
                        setScore((score)=>score+1);
                    }
                    setRandomChampion(()=>{
                        return Math.floor(Math.random()*161);
                    });
                    setRandomSkill(()=>{
                        return Math.floor(Math.random()*5);
                    })
                }
            }}
            ></input>
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
        </>
        }
        {gameStart === true && timer <0 &&
            <div className={styles.container} >{score}점을 획득하셨습니다.
            <button className={styles.btn} onClick={()=>{
                setGameStart(false);
                setScore(0);
                setTimer(60);
                clearInterval(intervalId.current);
            }}>
            메인화면으로
            </button>
            </div>

        }
    </>
  );
}
