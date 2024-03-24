"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
} from "chart.js";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import { Line } from "react-chartjs-2";
import styles from "./Binders.module.css";
import { Cards } from "./Cards";
import type { Binder, Binders as BindersType } from "./page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface BindersProps {
  binders: BindersType;
  total: string;
}

export const Binders: FC<BindersProps> = ({
  binders: latestBinders,
  total,
}) => {
  const [binders, setBinders] = useState<BindersType>();
  const [totals, setTotals] = useState<string[]>();
  const [chartData, setChartData] =
    useState<ChartData<"line", number[], unknown>>();

  useEffect(() => {
    const prevBinders = JSON.parse(localStorage.getItem("binders") || "{}");
    const prevTotals = JSON.parse(localStorage.getItem("totals") || "[]");
    const prevDay = Object.keys(prevBinders)[0];
    const today = new Date().toISOString().split("T")[0];
    let updatedBinders;
    let updatedTotals;

    if (prevDay !== today) {
      updatedBinders = Object.entries(latestBinders).reduce(
        (acc, [name, { sets, value }]) => {
          const oldBinder: Binder = prevBinders[prevDay]?.[name];
          const updatedSets = sets.map((set) => {
            const oldSet = oldBinder?.sets.find(({ id }) => id === set.id);
            const cards = set.cards.map((card) => {
              const oldCard = oldSet?.cards.find(({ id }) => id === card.id);

              return {
                ...card,
                prevValues: [
                  ...(oldCard?.prevValues || []),
                  oldCard?.value ?? "0",
                ],
              };
            });

            return {
              ...set,
              cards,
              prevValues: [...(oldSet?.prevValues || []), oldSet?.value ?? "0"],
            };
          });

          return {
            ...acc,
            [name]: {
              sets: updatedSets,
              value,
              prevValues: [
                ...(oldBinder?.prevValues || []),
                oldBinder?.value ?? "0",
              ],
            },
          };
        },
        {},
      );

      localStorage.setItem(
        "binders",
        JSON.stringify({ [today]: updatedBinders }),
      );

      updatedTotals = [...prevTotals, total];

      localStorage.setItem("totals", JSON.stringify(updatedTotals));
    }

    setBinders(updatedBinders ?? prevBinders[prevDay]);
    setTotals(updatedTotals ?? prevTotals);
  }, [latestBinders, total]);

  return (
    binders &&
    totals && (
      <>
        <h2>
          Total:{" "}
          <span
            className={clsx(
              totals.length === 1 || totals[totals.length - 2] === total
                ? null
                : totals[totals.length - 2] < total
                  ? styles.positive
                  : styles.negative,
            )}
          >
            ${total}
          </span>
          {totals.length > 1 && (
            <>
              {" "}
              (prev: ${totals[totals.length - 2]}){" "}
              <button
                onClick={() => {
                  if (!chartData) {
                    setChartData({
                      labels: totals.map((_, i) => i).map((i) => i.toString()),
                      datasets: [
                        {
                          label: "Total",
                          data: totals.map((t) => Number(t)),
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
        </h2>
        {chartData && <Line data={chartData} />}
        <ul>
          {Object.entries(binders)
            .sort(
              ([, { value }], [, { value: bValue }]) =>
                Number(bValue) - Number(value),
            )
            .map(([name, { sets, value, prevValues }]) => (
              <li key={name}>
                <h3>
                  {name}:{" "}
                  <span
                    className={clsx(
                      prevValues?.length === 1 ||
                        prevValues?.[prevValues.length - 1] === "0" ||
                        prevValues?.[prevValues.length - 1] === value
                        ? null
                        : (prevValues?.[prevValues.length - 1] ?? "0") < value
                          ? styles.positive
                          : styles.negative,
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
                        (prev: ${prevValues[prevValues.length - 1]}){" "}
                        <button
                          onClick={() => {
                            if (!chartData) {
                              setChartData({
                                labels: [
                                  ...prevValues
                                    .filter((v) => v === "0")
                                    .map((_, i) => i)
                                    .map((i) => i.toString()),
                                  "latest",
                                ],
                                datasets: [
                                  {
                                    label: "Value",
                                    data: [
                                      ...prevValues.map((v) => Number(v)),
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
                </h3>
                <ul>
                  {sets
                    .sort((a, b) => Number(b.value) - Number(a.value))
                    .map(({ cards, id, name, value, prevValues }, i) => (
                      <li key={`${name}${i}`}>
                        <strong>
                          <Link
                            href={`https://scryfall.com/@opeologist/decks/${id}`}
                          >
                            {name}
                          </Link>
                        </strong>{" "}
                        ({cards.length}):{" "}
                        <span
                          className={clsx(
                            prevValues?.length === 1 ||
                              prevValues?.[prevValues.length - 1] === "0" ||
                              prevValues?.[prevValues.length - 1] === value
                              ? null
                              : (prevValues?.[prevValues.length - 1] ?? "0") <
                                  value
                                ? styles.positive
                                : styles.negative,
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
                              (prev: ${prevValues[prevValues.length - 1]}){" "}
                              <button
                                onClick={() => {
                                  if (!chartData) {
                                    setChartData({
                                      labels: [
                                        ...prevValues
                                          .filter((v) => v === "0")
                                          .map((_, i) => i)
                                          .map((i) => i.toString()),
                                        "latest",
                                      ],
                                      datasets: [
                                        {
                                          label: "Value",
                                          data: [
                                            ...prevValues.map((v) => Number(v)),
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
                        <Cards
                          cards={cards}
                          chartData={chartData}
                          setChartData={setChartData}
                        />
                      </li>
                    ))}
                </ul>
              </li>
            ))}
        </ul>
      </>
    )
  );
};
