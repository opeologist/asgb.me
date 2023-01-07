import { parse } from "papaparse";
import { deckApiUrl, decks } from "../constants/mtg.mjs";

export const getMtgData = async () => {
  // @ts-expect-error
  const csvs = [];
  // @ts-expect-error
  const deckNames = [];

  const decksPromises = Promise.all(
    decks.map(async ({ name, id }) => {
      deckNames.push(name);

      const response = await fetch(deckApiUrl`${id}`);
      const result = await response.text();

      parse(result, {
        complete({ data }) {
          csvs.push(data);
        },
      });
    })
  );

  return decksPromises.then(() => {
    return {
      // @ts-expect-error
      csvs,
      // @ts-expect-error
      deckNames,
    };
  });
};
