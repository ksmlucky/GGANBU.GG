import styles from "./Music.module.css";
import { Image } from "next/image";
import PlayArrow from "/public/musicicon/PlayArrow.svg";
import QueueMusic from "/public/musicicon/QueueMusic.svg";
import ScreenShare from "/public/musicicon/ScreenShare.svg";
import SkipNext from "/public/musicicon/SkipNext.svg";
import SkipPrevious from "/public/musicicon/SkipPrevious.svg";
import ExpandMore from "/public/musicicon/ExpandMore.svg";
import MoreHoriz from "/public/musicicon/MoreHoriz.svg";
import { createContext, useState, useEffect, useContext, useRef } from "react";

export default function Music() {
  let [idx, setIdx] = useState(0);
  const [audio, setAudio] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [openlist, setOpenlist] = useState(true);

  const audioPlayer = useRef(); // reference our audio component
  const progressBar = useRef(); // reference our progress bar
  const animationRef = useRef(); // reference the animation

  const toggle = () => {
    if (audioPlayer.current) {
      if (playing) {
        audioPlayer.current.pause();
        cancelAnimationFrame(animationRef.current);
      } else {
        audioPlayer.current.play();
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    }
    setPlaying(!playing);
  };

  const preview = () => {
    if (audioPlayer) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      const newidx = idx - 1 < 0 ? tracks.length - 1 : idx - 1;
      setPlaying(false);
      audioPlayer.current.src = tracks[newidx].source;
      audioPlayer.current.load();
      setIdx(newidx);
      progressBar.current.value = 0;
      setDuration(audioPlayer.current.duration);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const next = () => {
    if (audioPlayer) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      const newidx = idx + 1 > tracks.length - 1 ? 0 : idx + 1;
      setPlaying(false);
      audioPlayer.current.src = tracks[newidx].source;
      audioPlayer.current.load();
      setIdx(newidx);
      progressBar.current.value = 0;
      setDuration(audioPlayer.current.duration);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const change = (idx) => {
    if (audioPlayer) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      setPlaying(false);
      const newidx = idx;
      audioPlayer.current.autoplay = true;
      audioPlayer.current.src = tracks[newidx].source;
      audioPlayer.current.load();
      setIdx(newidx);
      progressBar.current.value = 0;
      setDuration(audioPlayer.current.duration);
      audioPlayer.current.play();
      setPlaying(true);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  // 길이 표시 시작

  useEffect(() => {
    if (audioPlayer) {
      setDuration(Math.floor(audioPlayer.current.duration));
      progressBar.current.max = duration;
      setPlaying(true);
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  // 시간 출력
  const calculateTime = (secs) => {
    if(!isNaN(secs)){
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${
      seconds < 10 ? `0${seconds}` : `${seconds}`
    }`;
  }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    console.log(progressBar.current.value);
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressBar.current.value);
  };
  // setinterval 시작

  const openURL = () => {
    return window.open(
      `https://www.google.com/search?q=${tracks[idx].name}`, //수정
      "_blank"
    );
  };

  const open = () => {
    setOpenlist(!openlist);
  };

  // 길이 표시 끝
  const tracks = [
    {
      name: "Awaken",
      artist: "league of legends",
      album: "/champion/tiles/Aatrox_0.jpg",
      source: "/mp3/RISE.mp3",
      time: "197",
    },
    {
      name: "K_DA-THE-BADDEST",
      artist: "league of legends",
      album: "/champion/tiles/Zyra_0.jpg",
      source: "/mp3/K_DA-THE-BADDEST.mp3",
      time: "162",
    },
  ];

  return (
    <div className={styles.container}>
      {openlist ? (
        <div className={styles.listcontainer}>
          {tracks.map((list, idx) => {
            return (
              <div key={idx}>
                <button
                  onClick={() => {
                    change(idx);
                  }}
                >
                  {list.name}
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
      <div className={styles.wrapper}>
        <audio
          ref={audioPlayer}
          src={tracks[idx].source}
          preload="metadata"
        ></audio>
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
        {/* progress 시작 */}
        <div className={styles.audioPlayer}>
          {/* progress bar */}
          <div>
          <span>{audioPlayer.current?calculateTime(audioPlayer.current.currentTime)??"00:00": "00:00"}</span>
            <input
              type="range"
              className={styles.progressBar}
              defaultValue="0"
              ref={progressBar}
              onChange={changeRange}
            />
            <span>{audioPlayer.current?calculateTime(audioPlayer.current.duration)??"00:00": "00:00"}</span>
          </div>
        </div>
        {/* progress 끝 */}
        <div className={styles.controls}>
          <div className={styles.screenshare} onClick={openURL}>
            <i id="repeatPlist" className={styles.materialIcon}>
              <ScreenShare />
            </i>
          </div>
          <div
            className={styles.previous}
            onClick={() => {
              preview();
            }}
          >
            <i id="repeatPlist" className={styles.materialIcon}>
              <SkipPrevious />
            </i>
          </div>
          <div className={styles.playPause} onClick={toggle}>
            <i className={styles.materialIcon}>
              <PlayArrow />
              {idx}
            </i>
          </div>
          <div
            className={styles.previous}
            onClick={() => {
              next();
            }}
          >
            <i id="next" className={styles.materialIcon}>
              <SkipNext />
            </i>
          </div>
          <div className={styles.shuffle} onClick={open}>
            <i id="more-music" className={styles.materialIcon}>
              <QueueMusic />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}
