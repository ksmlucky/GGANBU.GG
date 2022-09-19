import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Search from "../search/Search";
import { classNames } from "./../../utils/classNames";
import Detail from "./../chooseChampion/CChampion";
import RecommandList from "../recommandList/RecommandList";
import Ranking from "../ranking/Ranking";

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

export function SearchLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Search></Search>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function RecommandLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <RecommandList></RecommandList>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function RankingLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Ranking></Ranking>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}
