import styles from "./RecommandResultList.module.css";

export default function WithEnemies(props) {
  return (
    <>
      {props.withTeamMates &&
        props.withTeamMates.map((el, idx) => {
          return (
            <div className={styles.miniImgs} key={idx}>
              <img
                className={styles.miniImg}
                src={`/champion/tiles/${el.en}_0.jpg`}
              ></img>
              {el.evalWord === "Excellent" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Hype_Kitty_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Good" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Excited_Kitten_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Fair" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Me-ow_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Poor" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Sad_Kitten_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Bad" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Angry_Kitten_Emote.webp`}
                ></img>
              )}
            </div>
          );
        })}
      {props.withEnemies &&
        props.withEnemies.map((el, idx) => {
          return (
            <div className={styles.miniImgs} key={idx}>
              <img
                className={styles.miniImg}
                src={`/champion/tiles/${el.en}_0.jpg`}
              ></img>
              {el.evalWord === "Excellent" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Hype_Kitty_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Good" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Excited_Kitten_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Fair" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Me-ow_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Poor" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Sad_Kitten_Emote.webp`}
                ></img>
              )}
              {el.evalWord === "Bad" && (
                <img
                  className={styles.miniImg}
                  src={`/recommend/Angry_Kitten_Emote.webp`}
                ></img>
              )}
            </div>
          );
        })}
    </>
  );
}
