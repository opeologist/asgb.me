"use client";

import type { ChartData } from "chart.js";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import bindersStyles from "./Binders.module.css";
import styles from "./Cards.module.css";
import type { Card } from "./page";

interface CardsProps {
  cards: Card[];
  chartData?: ChartData<"line", number[], unknown>;
  setChartData: Dispatch<
    SetStateAction<ChartData<"line", number[], unknown> | undefined>
  >;
}

export const Cards: FC<CardsProps> = ({ cards, chartData, setChartData }) => {
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
            .sort((a, b) => Number(b.value) - Number(a.value))
            .map(({ id, name, url, value, prevValues }, i) => (
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
                  <span>{name}</span>{" "}
                  <span
                    className={clsx(
                      prevValues?.length === 1 ||
                        prevValues?.[prevValues.length - 1] === "0" ||
                        prevValues?.[prevValues.length - 1] === value
                        ? null
                        : (prevValues?.[prevValues.length - 1] ?? "0") < value
                          ? bindersStyles.positive
                          : bindersStyles.negative,
                    )}
                  >
                    ${value}
                  </span>
                  {prevValues &&
                    prevValues.length > 1 &&
                    prevValues[prevValues.length - 1] !== "0" &&
                    prevValues[prevValues.length - 1] !== value && (
                      <>
                        {" "}
                        (prev: $${prevValues[prevValues.length - 1]}){" "}
                        <button
                          onClick={() => {
                            if (!chartData) {
                              setChartData({
                                labels: [
                                  ...prevValues
                                    .filter((v) => v !== "0")
                                    .map((_, i) => i)
                                    .map((i) => i.toString()),
                                  "latest",
                                ],
                                datasets: [
                                  {
                                    label: "Value",
                                    data: [
                                      ...prevValues
                                        .filter((v) => v !== "0")
                                        .map((v) => Number(v)),
                                      Number(value),
                                    ],
                                  },
                                ],
                              });
                            } else {
                              setChartData(undefined);
                            }
                          }}
                        >
                          chart
                        </button>
                      </>
                    )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};
