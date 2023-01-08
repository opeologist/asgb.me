"use client";

import { useEffect, useState } from "react";
import { getMtgData } from "../../helpers/getMtgData";

export default function Mtg() {
  const [csvsArr, setCsvsArr] = useState(null);
  const [deckNames, setDeckNames] = useState(null);
  const [deckSets, setDeckSets] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const asyncGetCsv = async () => {
      const { csvs, deckNames } = await getMtgData();

      // @ts-expect-error
      setCsvsArr(csvs);
      // @ts-expect-error
      setDeckNames(deckNames);
    };
    asyncGetCsv();
  }, []);
  useEffect(() => {
    if (csvsArr !== null && csvsArr !== undefined) {
      // @ts-expect-error
      const deckSetsArr = [];
      let computedTotal = 0;
      // @ts-expect-error
      csvsArr.forEach((csv) => {
        deckSetsArr.push(csv[1][6]);
        // @ts-expect-error
        csv.forEach((row, i) => {
          if (i !== 0) {
            computedTotal +=
              row.length > 0 && row[12] ? parseFloat(row[12]) : 0;
          }
        });
      });
      // @ts-expect-error
      setDeckSets(deckSetsArr);
      // @ts-expect-error
      setTotal(computedTotal.toFixed(2));
    }
  }, [csvsArr]);

  return (
    total &&
    deckNames &&
    deckSets && (
      <main>
        <h1>Total: ${total}</h1>
        <hr />
        {/* @ts-expect-error */}
        {deckNames.map((deckName, i) => (
          <section key={i}>
            <h2 key={`${deckName}${i}`}>
              {/* @ts-expect-error */}
              {deckName} ({deckSets[i].toUpperCase()})
            </h2>
            {/* @ts-expect-error */}
            <h3>{csvsArr[i][1][5]}</h3>
          </section>
        ))}
      </main>
    )
  );
}
