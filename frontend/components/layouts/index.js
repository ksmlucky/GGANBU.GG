import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { classNames } from "./../../utils/classNames";
import Detail from "./../chooseChampion/CChampion";

/* -------------------------------------------------------------------------- */

export function BaseLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Main></Main>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function DetailLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Detail></Detail>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}
