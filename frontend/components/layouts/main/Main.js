import styles from "./Main.module.css";
import Logo from "../../logo/Logo";
import MainInput from "../../mainInput/MainInput";
export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <Logo></Logo>
        <MainInput />
      </main>
    </>
  );
}
