import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import { classNames } from "./../../utils/classNames";
import RecommandList from "../recommandList/RecommandList";
import Ranking from "../ranking/Ranking";

/* -------------------------------------------------------------------------- */

export function BaseLayout() {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export function RecommandLayout() {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <RecommandList></RecommandList>
      <Footer></Footer>
    </div>
  );
}

export function RankingLayout() {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Ranking></Ranking>
      <Footer></Footer>
    </div>
  );
}
