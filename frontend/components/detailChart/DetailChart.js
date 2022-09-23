import { useEffect,useState } from "react";
import styles from "./DetailChart.module.css";
import championList from "../../utils/champion";
import {
    Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  } from 'chart.js';
  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

export default function DetailChart(){
    const clist = championList();
    const [champion, setChampion] = useState(['']);
    const [selectedchampion, setSelectedchampion] = useState([]); //선택한 챔피언(한국어)
    const [imsi, setImsi] = useState('아트록');
    const [bools, setBools] = useState(false);
    const [myChart, setMyChart] = useState();
    function makeList(item){
        console.log(item.target.id);
        
    }
    
    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['승률', '픽률', '밴률', 'DPM', '솔로킬 횟수', 'CC기 총 시간'],
                datasets: [{
                    label: imsi,
                    data: [65, 59, 5, 81, 56, 55],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                  }, {
                    label: '리신',
                    data: [28, 48, 40, 19, 5, 27],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                  }]
            },
    options: {
        responsive: false,
        scales :{
            radar:{
                angleLines :{
                    color :"white"
                },
                grid:{
                    color :"white",

                },
                pointLabels :{
                    color : "white",
                },
                ticks :{
                    color :"white",
                    backdropColor :"black",
                }
            }
        },
        plugins: {
        title: {
            display: true,
            text: '챔피언 비교'
        }
        }
    },
        });

        setBools(true);
    },[])
    
    useEffect(()=>{
        if(bools === true && myChart){
            myChart.destroy();
        }
        const ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['승률', '픽률', '밴률', 'DPM', '솔로킬 횟수', 'CC기 총 시간'],
                datasets: [{
                    label: imsi,
                    data: [65, 59, 5, 81, 56, 55],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                  }, {
                    label: '리신',
                    data: [28, 48, 40, 19, 5, 27],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                  }]
            },
    options: {
        responsive: false,
        scales :{
            radar:{
                angleLines :{
                    color :"white"
                },
                grid:{
                    color :"white",

                },
                pointLabels :{
                    color : "white",
                },
                ticks :{
                    color :"white",
                    backdropColor :"black",
                }
            }
        },
        plugins: {
        title: {
            display: true,
            text: '챔피언 비교'
        }
        }
    },
        });

        setBools(true);
    },[imsi])
    
    return(
        <>
            <button onClick={()=>{
                setImsi('ㅇㅇ');
            }
            }></button>
            <div className={styles.component}>
                <div className={styles.chart}><canvas className={styles.canvas} id="myChart" ></canvas></div>
   
                    <ul className={styles.ul}>
                    {clist.map((item, idx) =>{
                        return(
                            <li key={idx} className={styles.li}>
                                <button className={styles.btn} onClick={(item)=>{
                                    makeList(item);
                                }}>
                                    <img
                                    src={`/champion/champion_icon/${item.en}.png`}
                                    id={item.ko}
                                    alt={item.en}
                                    index={item.index}
                                    className={styles.img}
                                    ></img>
                                </button>
                                <span className={styles.name}>{item.ko}</span>
                            </li>
                        );
                    }
                    )}
                    </ul>
            </div>

        </>
    );
}