"use client";

import type { ChartData } from "chart.js";
import clsx from "clsx";
import Link from "next/link";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import styles from "./Binder.module.css";
import bindersStyles from "./Binders.module.css";
import type { Binder as BinderType, Set } from "./page";

interface BinderProps extends BinderType {
  name: string;
  setSet: Dispatch<SetStateAction<Set | undefined>>;
  setChartData: Dispatch<
    SetStateAction<ChartData<"line", number[], unknown> | undefined>
  >;
}

export const Binder: FC<BinderProps> = ({
  name,
  sets,
  values,
  setSet,
  setChartData,
}) => {
  const [opened, setOpened] = useState(false);

  return (
    <li className={styles.binderWrapper}>
      <div className={styles.binder}>
        <span
          className={styles.binderName}
          title={
            isNaN(Number(values[values.length - 2])) ||
            values[values.length - 1] === values[values.length - 2]
              ? undefined
              : `was ${values[values.length - 2]}`
          }
        >
          <strong>{name}</strong>:{" "}
          <span
            className={clsx(
              isNaN(Number(values[values.length - 2])) ||
                values[values.length - 1] === values[values.length - 2]
                ? null
                : values[values.length - 2] < values[values.length - 1]
                  ? bindersStyles.positive
                  : bindersStyles.negative,
            )}
          >
            ${Number(values[values.length - 1]).toFixed(2)}
          </span>
        </span>
        <button onClick={() => setOpened(!opened)} className={styles.button}>
          {opened ? "-" : "+"}
        </button>
      </div>
      {opened && (
        <ul className={styles.sets}>
          {sets
            .sort(
              (a, b) =>
                Number(b.values[b.values.length - 1]) -
                Number(a.values[a.values.length - 1]),
            )
            .map((set) => {
              const { id, name, values } = set;

              return (
                <li key={id} className={styles.set}>
                  <span className={styles.setInfoContainer}>
                    <Link
                      href={`https://scryfall.com/@opeologist/decks/${id}`}
                      target="_blank"
                    >
                      <strong>{name}</strong>
                    </Link>
                    <span
                      title={
                        isNaN(Number(values[values.length - 2])) ||
                        values[values.length - 1] === values[values.length - 2]
                          ? undefined
                          : `was ${values[values.length - 2]}`
                      }
                    >
                      :{" "}
                      <span
                        className={clsx(
                          isNaN(Number(values[values.length - 2])) ||
                            values[values.length - 1] ===
                              values[values.length - 2]
                            ? null
                            : values[values.length - 2] <
                                values[values.length - 1]
                              ? bindersStyles.positive
                              : bindersStyles.negative,
                        )}
                      >
                        ${Number(values[values.length - 1]).toFixed(2)}
                      </span>
                    </span>
                  </span>
                  <button
                    onClick={() => {
                      setChartData(undefined);
                      setSet(set);
                    }}
                  >
                    cards
                  </button>
                  <button
                    onClick={() => {
                      setSet(undefined);
                      setChartData({
                        datasets: [
                          {
                            data: values.map((value) => Number(value)),
                            label: name,
                          },
                        ],
                        labels: values.map((_, i) => i),
                      });
                    }}
                  >
                    chart
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </li>
  );
};
