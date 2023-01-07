import Link from "next/link";
import styles from "./styles.module.css";

export default function LayoutHeader() {
  const { link } = styles;

  return (
    <>
      <header>
        <h1>Vault</h1>
        <nav>
          <ul>
            <li>
              <Link href="/vault/modular" className={link}>
                Modular
              </Link>
            </li>
            <li>
              <Link href="/vault/mtg" className={link}>
                Mtg
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <hr />
    </>
  );
}
