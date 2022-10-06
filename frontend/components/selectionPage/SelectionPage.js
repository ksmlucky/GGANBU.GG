import Link from "next/link";
import styles from "./SelectionPage.module.css";

export default function SelectionPage() {
  const list = [
    { id: "1", text: "지역 찾기", links: "/plays/ai" },
    { id: "2", text: "스킬 맞추기", links: "/plays/skill" },
    { id: "3", text: "궁 피하기", links: "/plays/keyboard" },
  ];

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.ul}>
          {list.map((item) => {
            return (
              <Link href={`${item.links}`} key={item.id}>
                <li className={styles.li}>{item.text}</li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
