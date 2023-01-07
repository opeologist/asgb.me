const { parse } = await import("papaparse");
const { decks, deckApiUrl } = await import("../../constants/mtg.mjs");

export const getMtgData = ({ setCsvsArr, setDeckNames }) => {
  const csvsArr = [];
  const deckNamesArr = [];

  Promise.all(
    decks.map(async ({ name, id }) => {
      deckNamesArr.push(name);

      try {
        const response = await fetch(deckApiUrl`${id}`);
        const result = await response.text();

        parse(result, {
          complete({ data }) {
            csvsArr.push(data);
          },
        });
      } catch (e) {
        throw e;
      }
    })
  ).then(() => {
    setDeckNames(deckNamesArr);
    setCsvsArr(csvsArr);
  });
};
