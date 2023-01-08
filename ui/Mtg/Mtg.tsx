export default async function Mtg() {
  const response = await fetch(
    `${
      process.env.NEXT_IS_DEV ? "http://localhost:3000" : "https://asgb.me"
    }/api/vault/mtg`
  );
  const data = await response.json();
  const { csvs, deckNames } = data;
  // @ts-expect-error
  const deckSetsArr = [];
  let computedTotal = 0;

  // @ts-expect-error
  csvs.forEach((csv) => {
    deckSetsArr.push(csv[1][6]);
    // @ts-expect-error
    csv.forEach((row, i) => {
      if (i !== 0) {
        computedTotal += row.length > 0 && row[12] ? parseFloat(row[12]) : 0;
      }
    });
  });

  const organizedDecks = {};

  // @ts-expect-error
  deckNames.forEach((deckName, i) => {
    // @ts-expect-error
    if (organizedDecks[deckName]) {
      // @ts-expect-error
      organizedDecks[deckName].push(deckSetsArr[i]);
    } else {
      // @ts-expect-error
      organizedDecks[deckName] = [deckSetsArr[i]];
    }
  });

  return (
    <>
      {/* @ts-expect-error */}
      <h1>Total: ${parseFloat(computedTotal).toFixed(2)}</h1>
      <hr />
      {Object.keys(organizedDecks).map((key) => (
        <section key={key}>
          <h2>{key}</h2>
          <ul>
            {/* @ts-expect-error */}
            {[...new Set(organizedDecks[key])].map((set) => {
              // @ts-expect-error
              return <li key={set}>{set}</li>;
            })}
          </ul>
        </section>
      ))}
    </>
  );
}
