import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Search from "../search/Search";
import { classNames } from "./../../utils/classNames";
import ChooseChampion from "./../chooseChampion/CChampion";
import RecommandResultList from "../recommandResultList/RecommandResultList";
import Ranking from "../ranking/Ranking";
import ClickChooseChampion from "../clickChooseChampion/CCChampion";
import DetailChampion from "../detailChampion/Detailchampion";
import SelectionPage from "../selectionPage/SelectionPage";

import Multi from "../multi/Multi";

import Music from "../music/Music";

import Ai from "../ai/Ai";

import Skin3d from "../skin3d/Skin3d";

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

export function ChooseChampionLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <ChooseChampion></ChooseChampion>
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
export function MultiLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Multi></Multi>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function RecommandResultLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <RecommandResultList></RecommandResultList>
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

export function DetailLayout({ setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <ClickChooseChampion></ClickChooseChampion>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function DetailResultLayout({ setMode, mode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <DetailChampion mode={mode}></DetailChampion>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function SelectionLayout({ setMode, mode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <SelectionPage mode={mode}></SelectionPage>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function MusicLayout({ setMode, mode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Music mode={mode}></Music>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function AiLayout({ setMode, mode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Ai mode={mode}></Ai>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}

export function SkinLayout({ setMode, mode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Skin3d mode={mode}></Skin3d>
      <Footer setMode={setMode}></Footer>
    </div>
  );
}
