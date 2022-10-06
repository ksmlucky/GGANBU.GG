import styles from "./Main.module.css";
import Logo from "../../logo/Logo";
import MainInput from "../../mainInput/MainInput";
export default function Main() {

  const openURL = () => {
    return window.open(
      `https://www.leagueoflegends.com/ko-kr/how-to-play/`, //수정
      "_blank"
    );
  };

  return (
    <>
      <main className={styles.main}>
        <Logo></Logo>
        <p className={styles.atag} onClick={() => { openURL() }}>league of legends가 무엇인지 모르시나요?</p>
      </main>
    </>
  );
}
