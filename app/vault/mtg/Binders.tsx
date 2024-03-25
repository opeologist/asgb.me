"use client";

import type { ChartData } from "chart.js";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { Line } from "react-chartjs-2";
import { Binder } from "./Binder";
import styles from "./Binders.module.css";
import type { Binder as BinderType, Binders as BindersType, Set } from "./page";

interface BindersProps {
  binders: BindersType;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const Binders: FC<BindersProps> = ({ binders: latestBinders }) => {
  const [binders, setBinders] = useState<BindersType>();
  const [set, setSet] = useState<Set | undefined>();
  const [chartData, setChartData] = useState<
    ChartData<"line", number[], unknown> | undefined
  >();

  useEffect(() => {
    const prevBinders = JSON.parse(localStorage.getItem("binders") || "{}");
    const prevDay = Object.keys(prevBinders)[0];
    const today = new Date().toISOString().split("T")[0];
    let updatedBinders;

    if (prevDay !== today) {
      updatedBinders = Object.entries(latestBinders).reduce(
        (acc, [name, { sets, values }]) => {
          const oldBinder: BinderType = prevBinders[name];
          const updatedSets = sets.map((set) => {
            const oldSet = oldBinder?.sets.find(({ id }) => id === set.id);
            const cards = set.cards.map((card) => {
              const oldCard = oldSet?.cards.find(({ id }) => id === card.id);

              return {
                ...card,
                values: [
                  ...(oldCard?.values || []),
                  card.values[card.values.length - 1],
                ],
              };
            });

            return {
              ...set,
              cards,
              values: [
                ...(oldSet?.values || []),
                set.values[set.values.length - 1],
              ],
            };
          });

          return {
            ...acc,
            [name]: {
              sets: updatedSets,
              values: [...(oldBinder?.values || []), values[values.length - 1]],
            },
          };
        },
        {},
      );

      localStorage.setItem(
        "binders",
        JSON.stringify({ [today]: updatedBinders }),
      );
    }

    setBinders(updatedBinders || prevBinders[prevDay]);
  }, [latestBinders]);

  return (
    binders &&
    (() => {
      const total = Object.values(binders)
        .reduce((acc, { values }) => acc + Number(values[values.length - 1]), 0)
        .toFixed(2);
      const prevTotal = Object.values(binders)
        .reduce((acc, { values }) => acc + Number(values[values.length - 2]), 0)
        .toFixed(2);

      return (
        <div className={styles.container}>
          <aside className={styles.aside}>
            <h1 className={styles.heading}>
              Total:{" "}
              <span
                className={clsx(
                  isNaN(Number(prevTotal)) || total === prevTotal
                    ? null
                    : total < prevTotal
                      ? styles.positive
                      : styles.negative,
                )}
                title={
                  isNaN(Number(prevTotal)) || total === prevTotal
                    ? undefined
                    : `was ${prevTotal}`
                }
              >
                ${total}
              </span>
            </h1>
            <nav>
              <ul className={styles.binders}>
                {Object.entries(binders)
                  .sort(
                    ([, { values }], [, { values: bValues }]) =>
                      Number(bValues[bValues.length - 1]) -
                      Number(values[values.length - 1]),
                  )
                  .map(([name]) => (
                    <Binder
                      key={name}
                      name={name}
                      sets={binders[name].sets}
                      values={binders[name].values}
                      setSet={setSet}
                      setChartData={setChartData}
                    />
                  ))}
              </ul>
            </nav>
          </aside>
          <main className={styles.main}>
            {set && (
              <div>
                <h1 className={styles.setName}>{set.name}</h1>
                <ul className={styles.cards}>
                  {set.cards
                    .sort(
                      (a, b) =>
                        Number(b.values[b.values.length - 1]) -
                        Number(a.values[a.values.length - 1]),
                    )
                    .map(({ id, name, url, values }, i) => (
                      <li key={`${id}${i}`} className={styles.card}>
                        <Image
                          src={`https://cards.scryfall.io/large/front/${id.substring(0, 1)}/${id.substring(1, 2)}/${id}.jpg`}
                          alt={name}
                          width={336}
                          height={468}
                          unoptimized
                          className={styles.cardImage}
                        />
                        <div className={styles.cardInfoContainer}>
                          <Link href={url} target="_blank">
                            {name}
                          </Link>
                          <span
                            title={
                              isNaN(Number(values[values.length - 2])) ||
                              values[values.length - 1] ===
                                values[values.length - 2]
                                ? undefined
                                : `was ${values[values.length - 2]}`
                            }
                          >
                            ${Number(values[values.length - 1]).toFixed(2)}
                          </span>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}
            {chartData && <Line data={chartData} />}
          </main>
        </div>
      );
    })()
  );
};
