import styles from "./SearchBody.module.css";
import Image from "next/image";
export default function SearchBody() {
  return (
    <>
        <div className={styles.icon}>
            <Image src={icon} layout="intrinsic" width={100} height={100}></Image>
            <label className={styles.label}> summonerId </label>
        </div>
    </>
  );
}