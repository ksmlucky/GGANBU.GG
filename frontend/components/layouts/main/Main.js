import styles from "./Main.module.css";
import Logo from "../../logo/main/Logo";
export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <Logo></Logo>
      </main>
    </>
  );
}
