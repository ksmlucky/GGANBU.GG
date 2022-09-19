import Link from "next/link";
import styles from "./Navigation.module.css";

/* -------------------------------------------------------------------------- */

export default function Navigation() {
  const list = [
    { id: "1", text: "HOME", links: "/" },
    { id: "2", text: "CHAMPION RECOMMAND", links: "/recommand" },
    { id: "3", text: "RANKING", links: "/ranking" },
    { id: "4", text: "CHAMPION DETAIL", links: "/detail" },
    { id: "5", text: "SKIN", links: "/skin" },
    { id: "6", text: "MULTI SEARCH", links: "/multi" },
  ];

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={item.links}>
                  {/* <a className={styles.a}> */}
                  <li className={styles.li}>{item.text}</li>
                  {/* </a> */}
                </Link>
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
