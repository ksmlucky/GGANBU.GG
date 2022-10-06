import Link from "next/link";
import styles from "./Navigation.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
/* -------------------------------------------------------------------------- */

export default function Navigation() {
  const list = [
    { id: "1", text: "챔피언 추천", links: "/recommand" },
    { id: "2", text: "챔피언 보기", links: "/detail" },
    { id: "3", text: "게임", links: "/plays" },
    { id: "4", text: "이상형 월드컵", links: "/worldcup" },
    { id: "5", text: "음악", links: "/music" },
  ];

  const router = useRouter();

  return (
    <>
      <div className={styles.nav}>
        <ul className={styles.ul}>
          {list.map((item) => {
            return (
              <Link href={item.links} key={item.id}>
                <li
                  className={styles.li}
                  style={{
                    color:
                      item.links === router.pathname ||
                      router.pathname.includes(item.links)
                        ? "var(--logo)"
                        : "var(--text)",
                  }}
                >
                  {item.text}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
}
