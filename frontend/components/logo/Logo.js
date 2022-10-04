import Image from "next/image";
import styles from "./Logo.module.css";
import { useEffect, useState } from "react";

export default function Logo() {
  const defaulttext = "GGanbu.gg";
  let logotext = "";
  const [showtext, Setshowtext] = useState("");

  // Printing effect
  function printChar(word) {
    let i = 0;
    let id = setInterval(() => {
      if (i >= word.length) {
        deleteChar();
        clearInterval(id);
      } else {
        logotext += word[i];
        Setshowtext(logotext);
        i++;
      }
    }, 600);
  }

  // Deleting effect
  function deleteChar() {
    let word = logotext;
    let i = word.length - 1;
    let id = setInterval(() => {
      if (i >= 0) {
        logotext = logotext.substring(0, logotext.length - 1);
        Setshowtext(logotext);
        i--;
      } else {
        printChar(defaulttext);
        clearInterval(id);
      }
    }, 200);
  }

  useEffect(() => {
    printChar(defaulttext);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <span className={styles.logo}>{showtext}</span>
        <span className={styles.texts}> for everyone</span>
      </div>
    </>
  );
}
