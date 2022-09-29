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
  const [info, setInfo] = useState("");
  const intervalId = useRef(null);

  useEffect(()=>{
    setValue("");
  },[randomChampion,randomSkill])

  return (
    <>
        {gameStart === false &&
        <div className={styles.container}>
            <div className={styles.quiz}>
            1분동안 제시된 스킬을 가진 챔피언을 맞추세요!
            </div>
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

        <div className={styles.container}>
            <div className={styles.timer}>{timer}</div>
            <div className={styles.quiz}>해당 스킬을 가진 챔피언을 입력하시오.</div>
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
                        setInfo("맞았습니다!");
                        setScore((score)=>score+1);
                    }else{
                        setInfo("틀렸습니다!")
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
                    setInfo("맞았습니다!");
                    setScore((score)=>score+1);
                } else {
                    setInfo("틀렸습니다!")
                }
                setRandomChampion(()=>{
                    return Math.floor(Math.random()*161);
                });
                setRandomSkill(()=>{
                    return Math.floor(Math.random()*5);
                })
            }}>
            입력
            </button>

            <div className={info==="맞았습니다!" ? styles.answer : styles.wrong}>{info}</div>
            <div className={styles.score}>맞힌 갯수 : {score}</div>
        </div>
        </>
        }
        {gameStart === true && timer <0 &&
            <div className={styles.container} >    
            {score}개를 맞추셨어요!
            {score < 5 && " 좀더 분발하세요!"}
            {score < 10 && score >=5 && " 롤을 해보긴 하셨군요."}
            {score < 15 && score >=10 && " 상당한 실력의 소유자시군요!"}
            {score >= 15 && " 롤을 그만하셔야 될 것 같습니다!"}
            <button className={styles.btn} onClick={()=>{
                setGameStart(false);
                setScore(0);
                setTimer(60);
                clearInterval(intervalId.current);
                setInfo("");
            }}>
            메인화면으로
            </button>
            </div>

        }
    </>
  );
}
