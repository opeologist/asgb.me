"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState, type FC } from "react";
import styles from "./Binders.module.css";
import { Cards } from "./Cards";
import type { Binder, Binders as BindersType } from "./page";

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
          {totals.length > 1 && ` (prev: $${totals[totals.length - 2]})`}
        </h2>
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
                        prevValues?.[prevValues.length - 2] === value
                        ? null
                        : (prevValues?.[prevValues.length - 2] ?? "0") < value
                          ? styles.positive
                          : styles.negative,
                    )}
                  >
                    ${value}
                  </span>
                  {prevValues &&
                    prevValues.length > 1 &&
                    prevValues[prevValues.length - 2] !== "0" &&
                    ` (prev: $${prevValues[prevValues.length - 2]})`}
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
                              prevValues?.[prevValues.length - 2] === value
                              ? null
                              : (prevValues?.[prevValues.length - 2] ?? "0") <
                                  value
                                ? styles.positive
                                : styles.negative,
                          )}
                        >
                          ${value}
                        </span>
                        {prevValues &&
                          prevValues.length > 1 &&
                          prevValues[prevValues.length - 2] !== "0" &&
                          ` (prev: $${prevValues[prevValues.length - 2]})`}
                        <Cards cards={cards} />
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
