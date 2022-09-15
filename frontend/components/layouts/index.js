import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Search from "./search/Search"
import { classNames } from "./../../utils/classNames";

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

export function SearchLayout() {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      <Search></Search>
      <Footer></Footer>
    </div>
  );
}