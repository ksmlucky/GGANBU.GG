import Image from "next/image";
import Input from "../../inputs/Input";
import styles from "./Logo.module.css";

export default function Logo() {
  return (
    <>
      <div className={styles.container}>
        <Image src="/images/logo.png" layout="fill" />
      </div>
      <Input />
    </>
  );
}
