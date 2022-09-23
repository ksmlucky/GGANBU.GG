import styles from "./Music.module.css";
import { Image } from "next/image";
import PlayArrow from "/public/music/PlayArrow.svg";
import QueueMusic from "/public/music/QueueMusic.svg";
import Repeat from "/public/music/Repeat.svg";
import SkipNext from "/public/music/SkipNext.svg";
import SkipPrevious from "/public/music/SkipPrevious.svg";
import ExpandMore from "/public/music/ExpandMore.svg";
import MoreHoriz from "/public/music/MoreHoriz.svg";
export default function Music() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.topBar}>
          <i className={styles.materialIcon}>
            <ExpandMore />
          </i>
          <span>Now Playing</span>
          <i className={styles.materialIcon}>
            <MoreHoriz />
          </i>
        </div>
        <div className={styles.imgArea}>
          <img src="#" alt=""></img>
        </div>
        <div className={styles.songDetails}>
          <p className={styles.name}>Beauz & Jana - Crazy</p>
          <p className={styles.artist}>Beauz & Jana</p>
        </div>
        <div className={styles.progessArea}>
          <div className={styles.progressBar}>
            <span></span>
          </div>
          <div className={styles.timer}>
            <span className={styles.current}>0:20</span>
            <span className={styles.current}>3:40</span>
          </div>
        </div>
        <div className={styles.controls}>
          <i id="repeatPlist" className={styles.materialIcon}>
            <PlayArrow />
          </i>
          <i id="repeatPlist" className={styles.materialIcon}>
            <SkipPrevious />
          </i>
          <div className={styles.playPause}>
            <i className={styles.materialIcon}>
              <PlayArrow />
            </i>
          </div>
          <i id="next" className={styles.materialIcon}>
            <SkipNext />
          </i>
          <i id="more-music" className={styles.materialIcon}>
            <QueueMusic />
          </i>
        </div>
      </div>
    </div>
  );
}
