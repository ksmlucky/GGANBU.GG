import styles from "./Main.module.css";
import Logo from "../../logo/main/Logo";
import Input from "../../inputs/Input";
export default function Main() {
  return (
    <>
      <main className={styles.main}>
        <Logo></Logo>
        <Input />
      </main>
    </>
  );
}
