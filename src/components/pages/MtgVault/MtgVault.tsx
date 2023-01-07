const { useEffect, useState } = await import("react");
const { getCsvs } = await import("../../../helpers/getCsvs");

export const MtgVault = () => {
  const [csvsArr, setCsvsArr] = useState(null);
  const [deckNames, setDeckNames] = useState(null);
  const [deckSets, setDeckSets] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const asyncGetCsv = async () => {
      await getCsvs({ setCsvsArr, setDeckNames });
    };

    asyncGetCsv();
  }, []);

  useEffect(() => {
    if (csvsArr !== null) {
      const deckSetsArr = [];
      let computedTotal = 0;

      csvsArr.forEach((csv) => {
        deckSetsArr.push(csv[1][6]);

        csv.forEach((row, i) => {
          if (i !== 0) {
            computedTotal +=
              row.length > 0 && row[12] ? parseFloat(row[12]) : 0;
          }
        });
      });

      setDeckSets(deckSetsArr);
      setTotal(computedTotal.toFixed(2));
    }
  }, [csvsArr]);

  return (
    <main>
      {<h1>Total: ${total}</h1>}
      <hr />
      {deckNames &&
        deckSets &&
        deckNames.map((deckName, i) => (
          <section key={i}>
            <h2 key={`${deckName}${i}`}>
              {deckName} ({deckSets[i].toUpperCase()})
            </h2>
            <h3>{csvsArr[i][1][5]}</h3>
          </section>
        ))}
    </main>
  );
};
