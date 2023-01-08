import { parse } from "papaparse";
import { deckApiUrl, decks } from "../../../constants/mtg.mjs";

export default async function handler() {
  // @ts-expect-error
  const csvs = [];
  // @ts-expect-error
  const deckNames = [];

  await Promise.all(
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

  return new Response(
    JSON.stringify({
      // @ts-expect-error
      csvs,
      // @ts-expect-error
      deckNames,
    })
  );
}
