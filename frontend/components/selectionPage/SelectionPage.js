import Link from "next/link";
import styles from "./SelectionPage.module.css";

export default function SelectionPage() {
  const list = [
    { id: "1", text: "LOL", links: "/lol" },
    { id: "2", text: "GAME", links: "/game" },
    { id: "3", text: "MUSIC", links: "/music" },
    { id: "4", text: "CALC", links: "/calc" },
    { id: "5", text: "FACE", links: "/ai" },
    { id: "6", text: "CHAMp", links: "/champ" },
  ];

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ul}>
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={`${item.links}`}>
                  <li className={styles.li}>{item.text}</li>
                </Link>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}
