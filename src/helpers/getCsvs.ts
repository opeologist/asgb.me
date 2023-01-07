const { parse } = await import("papaparse");
const { decks, apiUrlDeck } = await import("../../constants.mjs");

export const getCsvs = async ({ setCsvsArr, setDeckNames }) => {
  const csvsArr = [];
  const deckNamesArr = [];

  Promise.all(
    decks.map(async ({ name, id }) => {
      deckNamesArr.push(name);

      try {
        const response = await fetch(apiUrlDeck`${id}`);
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
