import { useState, useEffect } from "react";
import styles from "./RecommandList.module.css";
import WinningComponent from "./WinningComponent";
import Image from "next/image";

export default function RecommandList() {
  const [winning, setWinning] = useState(["Aatrox", "Ahri", "Akali"]);
  const [line, setLine] = useState(["Alistar", "Amumu", "Anivia"]);
  return (
    <main className={styles.main}>
      <WinningComponent winning={winning} line={line}></WinningComponent>
    </main>
  );
}
