import SearchTop from "./SearchTop";
import SearchBody from "./SearchBody";
import styles from "./Search.module.css";
import Input from "../../inputs/Input";

export default function Search() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.searchTop}>
          <div>
            <SearchTop></SearchTop>
          </div>
          <div className={styles.input}>
            <Input></Input>
          </div>
        </div>
        <div className={styles.searchBody}>
            <SearchBody></SearchBody>
        </div>
      </main>
    </>
  );
}