import { useEffect,useState } from "react";
import styles from "./DetailChart.module.css";
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
import { withRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
  
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
    const [champion, setChampion] = useState([]);
    useEffect(()=>{
        if(myChart !== undefined){
            myChart.destroy();
        }
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['승률', '픽률', '밴률', 'DPM', '솔로킬 횟수', 'CC기 총 시간'],
                datasets: [{
                    label: 'My First Dataset',
                    data: [65, 59, 90, 81, 56, 55],
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                  }, {
                    label: 'My Second Dataset',
                    data: [28, 48, 40, 19, 96, 27],
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
    },[])
    
    return(
        <>
            <div className={styles.component}>
                <canvas id="myChart" width="400" height="400"></canvas>
            </div>
        </>
    );
}