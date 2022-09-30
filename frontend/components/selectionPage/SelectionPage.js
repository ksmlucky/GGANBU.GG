import Link from "next/link";
import styles from "./SelectionPage.module.css";

export default function SelectionPage() {
  const list = [
    { id: "1", text: "FACE", links: "/ai" },
    { id: "2", text: "SKILL", links: "/game" },
    { id: "3", text: "KEYBOARD", links: "/keyboardgame" },
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
