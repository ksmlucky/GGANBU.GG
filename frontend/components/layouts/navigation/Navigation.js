import Link from "next/link";
import styles from "./Navigation.module.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
/* -------------------------------------------------------------------------- */

export default function Navigation() {
  const list = [
    { id: "1", text: "PLAYS", links: "/plays" },
    { id: "2", text: "CHAMPION RECOMMAND", links: "/recommand" },
    { id: "3", text: "WORLDCUP", links: "/champ" },
    { id: "4", text: "CHAMPION DETAIL", links: "/detail" },
    { id: "5", text: "MUSIC", links: "/music" },
    { id: "6", text: "MULTI SEARCH", links: "/multi" },
  ];

  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
  }, [router]);

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.ul}>
          {list.map((item) => {
            return (
              <div key={item.id}>
                <Link href={item.links}>
                  <li
                    className={styles.li}
                    style={{
                      boxShadow:
                        item.links === router.pathname || (router.pathname !== "/" && router.pathname.includes(item.links))
                          ? "inset 3px 3px 10px var(--btn-off-s), inset -3px -3px 10px var(--btn-off-l)"
                          : "3px 3px 10px var(--btn-on-s), -3px -3px 10px var(--btn-on-l)",

                      color:
                        item.links === router.pathname
                          ? "var(--select)"
                          : "var(--text)",
                    }}
                  >
                    {item.text}
                  </li>
                </Link>
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
