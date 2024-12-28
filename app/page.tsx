import Canvas from "./Canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>ASGB</h1>
      <Canvas />
    </main>
  );
}
