import Canvas from "./Canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.h1}>Aaron S. Giordano-Barry</h1>
      <h2>Sr. Software Engineer @ Wizards</h2>
      <Canvas />
    </main>
  );
}
