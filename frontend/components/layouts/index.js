import styles from "./Layout.module.css";
import Header from "./header/Header";
import Navigation from "./navigation/Navigation";

import Footer from "./footer/Footer";

import { classNames } from "./../../utils/classNames";

/* -------------------------------------------------------------------------- */

export function BaseLayout({ children, setMode }) {
  return (
    <div className={styles.container}>
      <Header>
        <Navigation />
      </Header>
      {children}
      <Footer setMode={setMode}></Footer>
    </div>
  );
}
