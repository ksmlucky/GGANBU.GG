import styles from "./Music.module.css";
import { Image } from "next/image";
import PlayArrow from "/public/musicicon/PlayArrow.svg";
import Pause from "/public/musicicon/Pause.svg";
import QueueMusic from "/public/musicicon/QueueMusic.svg";
import ScreenShare from "/public/musicicon/ScreenShare.svg";
import SkipNext from "/public/musicicon/SkipNext.svg";
import SkipPrevious from "/public/musicicon/SkipPrevious.svg";
import ExpandMore from "/public/musicicon/ExpandMore.svg";
import MoreHoriz from "/public/musicicon/MoreHoriz.svg";
import Playing from "/public/musicicon/Playing.svg";
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
        setPlaying(false);
        cancelAnimationFrame(animationRef.current);
      } else {
        audioPlayer.current.play();
        setPlaying(true);
        animationRef.current = requestAnimationFrame(whilePlaying);
      }
    }
  };

  // const preview = () => {
  //   if (audioPlayer) {
  //     audioPlayer.current.pause();
  //     cancelAnimationFrame(animationRef.current);
  //     const newidx = idx - 1 < 0 ? tracks.length - 1 : idx - 1;
  //     setPlaying(false);
  //     audioPlayer.current.src = tracks[newidx].source;
  //     audioPlayer.current.load();
  //     setIdx(newidx);
  //     progressBar.current.value = 0;
  //     setDuration(audioPlayer.current.duration);
  //     animationRef.current = requestAnimationFrame(whilePlaying);
  //   }
  // };

  const next = () => {
    if (audioPlayer) {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
      const newidx = idx + 1 > tracks.length - 1 ? 0 : idx + 1;
      // setPlaying(false);
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
    }
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  setInterval(() => {
    if (audioPlayer.current) {
      if (audioPlayer.current.currentTime === audioPlayer.current.duration) {
        next();
      }
    }
  }, 1000);

  // 시간 출력
  const calculateTime = (secs) => {
    if (!isNaN(secs)) {
      const minutes = Math.floor(secs / 60);
      const seconds = Math.floor(secs % 60);
      return `${minutes < 10 ? `0${minutes}` : `${minutes}`}:${seconds < 10 ? `0${seconds}` : `${seconds}`
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
      album: "/album/awaken.jpg",
      source: "/mp3/Awaken.mp3",
    },
    {
      name: "Burn-It-All-Down",
      artist: "league of legends",
      album: "/album/Burn-It-All-Down.jpg",
      source: "/mp3/Burn-It-All-Down.mp3",
    },
    {
      name: "Passengers",
      artist: "league of legends",
      album: "/album/Chromonicci-Passengers.jpg",
      source: "/mp3/Chromonicci-Passengers.mp3",
    },
    {
      name: "DJ-Sona-Ethereal",
      artist: "league of legends",
      album: "/album/DJ-Sona-Ethereal.jpg",
      source: "/mp3/DJ-Sona-Ethereal.mp3",
    },
    {
      name: "I_ll-See-You-Again",
      artist: "league of legends",
      album: "/album/I_ll-See-You-Again.jpg",
      source: "/mp3/I_ll-See-You-Again.mp3",
    },
    {
      name: "K_DA-MORE",
      artist: "league of legends",
      album: "/album/K_DA-MORE.jpg",
      source: "/mp3/K_DA-MORE.mp3",
    },
    {
      name: "THE-BADDEST",
      artist: "league of legends",
      album: "/album/K_DA-THE-BADDEST.jpg",
      source: "/mp3/K_DA-THE-BADDEST.mp3",
    },
    {
      name: "VILLAIN",
      artist: "league of legends",
      album: "/album/K_DA-VILLAIN.jpg",
      source: "/mp3/K_DA-VILLAIN.mp3",
    },
    {
      name: "Legends-Never-Die",
      artist: "league of legends",
      album: "/album/Legends-Never-Die.jpg",
      source: "/mp3/Legends-Never-Die.mp3",
    },
    {
      name: "Lightbringer",
      artist: "league of legends",
      album: "/album/lightbringer.jpg",
      source: "/mp3/Lightbringer.mp3",
    },
    {
      name: "Lost_Chapter",
      artist: "league of legends",
      album: "/album/lost_chapter.jpg",
      source: "/mp3/Lost_Chapter.mp3",
    },
    {
      name: "Phoenix",
      artist: "league of legends",
      album: "/album/phoenix.jpg",
      source: "/mp3/Phoenix.mp3",
    },
    {
      name: "RISE",
      artist: "league of legends",
      album: "/album/rise.jpg",
      source: "/mp3/RISE.mp3",
    },
    {
      name: "GIANTS",
      artist: "league of legends",
      album: "/album/True-Damage-GIANTS.jpg",
      source: "/mp3/True-Damage-GIANTS.mp3",
    },
    {
      name: "Warriors",
      artist: "league of legends",
      album: "/album/Warriors.jpg",
      source: "/mp3/Warriors.mp3",
    },
  ];

  return (
    <div className={styles.container}>
      {openlist ? (
        <div className={styles.listcontainer}>
          {tracks.map((list, idxx) => {
            return (
              <div className={styles.listcheck}>
                {idxx == idx ? (
                  <i id="play-music" className={styles.materialIcon}>
                    <Playing />
                  </i>
                ) : null}
                <button
                  key={idx}
                  onClick={() => {
                    change(idxx);
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
        <span className={styles.topBar}>현재 듣고있는 노래</span>
        <img src={tracks[idx].album} alt="" className={styles.imgArea}></img>
        <p className={styles.name}>
          {audioPlayer.current ? tracks[idx].name : null}
        </p>
        <p className={styles.artist}>
          {audioPlayer.current ? tracks[idx].artist : null}
        </p>
        <div className={styles.audioPlayer}>
          <span>
            {audioPlayer.current
              ? calculateTime(audioPlayer.current.currentTime) ?? "00:00"
              : "00:00"}
          </span>
          <input
            type="range"
            className={styles.progressBar}
            defaultValue="0"
            ref={progressBar}
            onChange={changeRange}
          />
          <span>
            {audioPlayer.current
              ? calculateTime(audioPlayer.current.duration) ?? "00:00"
              : "00:00"}
          </span>
        </div>
        <div className={styles.controls}>
          <i id="repeatPlist" className={styles.materialIcon} onClick={openURL}>
            <ScreenShare />
          </i>
          <i className={styles.materialIcon} onClick={toggle}>
            {playing ? <Pause /> : <PlayArrow />}
          </i>
          <i id="more-music" className={styles.materialIcon} onClick={open}>
            <QueueMusic />
          </i>
        </div>
      </div>
    </div>
  );
}
