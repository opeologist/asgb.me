"use client";

import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import styles from "./Cards.module.css";
import { Card } from "./page";

interface CardsProps {
  cards: Card[];
}

export const Cards: FC<CardsProps> = ({ cards }) => {
  const [isGridVisible, setIsGridVisible] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsGridVisible(!isGridVisible)}
        className={styles.button}
      >
        {isGridVisible ? "hide" : "show"}
      </button>
      {isGridVisible && (
        <ul className={styles.cards}>
          {cards
            .sort((a, b) => b.value - a.value)
            .map(({ id, name, url, value }, i) => (
              <li key={`${id}${i}`} className={styles.card}>
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={`https://cards.scryfall.io/large/front/${id.substring(0, 1)}/${id.substring(1, 2)}/${id}.jpg`}
                    alt={name}
                    width={336}
                    height={468}
                    unoptimized
                  />
                </Link>
                <div className={styles.textContainer}>
                  <span>{name}</span> <span>${value.toFixed(2)}</span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
