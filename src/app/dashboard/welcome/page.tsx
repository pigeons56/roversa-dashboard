import styles from "./page.module.css";
import Image from "next/image";

export default function Welcome() {
  return (
    <div className={styles.page}>
      <div className={styles.sidebar}>
        <div>
          <Image
            src="/images/roversalogowithwords-transparent.png"
            width={243}
            height={100}
            className={styles.img}
            alt="Roversa logo"
          />
        </div>
        <div>
          <a className={styles.button_purple}>My Students</a>
        </div>
      </div>
    </div>
  );
}
