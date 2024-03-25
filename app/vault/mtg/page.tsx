import { parse } from "papaparse";
import { Binders } from "./Binders";
import "./MtgPage.css";
import { decks } from "./decks";

export interface Binders {
  [name: string]: Binder;
}

export interface Binder {
  sets: Set[];
  values: string[];
}

export interface Set {
  cards: Card[];
  id: string;
  name: string;
  values: string[];
}

export interface Card {
  id: string;
  name: string;
  url: string;
  values: string[];
}

const deckApiUrl = (_: TemplateStringsArray, id: string) =>
  `https://api.scryfall.com/decks/${id}/export/csv`;

export default async function Mtg2Page() {
  const binders: Binders = {};

  await Promise.all(
    decks.map(async ({ id, name, set }) => {
      const response = await fetch(deckApiUrl`${id}`, {
        cache: "no-store",
      });
      const result = await response.text();

      parse(result, {
        complete({ data: cards }: { data: string[][] }) {
          if (binders[name]) {
            binders[name].sets.push({
              cards: [],
              id,
              name: set,
              values: ["0"],
            });
          } else {
            binders[name] = {
              sets: [
                {
                  cards: [],
                  id,
                  name: set,
                  values: ["0"],
                },
              ],
              values: ["0"],
            };
          }

          cards.forEach(
            ([, , cardName, , , , , , , , , , value, , , url, cardId], i) => {
              if (i !== 0 && i !== cards.length - 1) {
                binders[name].sets[binders[name].sets.length - 1].cards.push({
                  id: cardId,
                  name: cardName,
                  url,
                  values: [value],
                });

                binders[name].sets[binders[name].sets.length - 1].values[0] =
                  Number(
                    Number(
                      binders[name].sets[binders[name].sets.length - 1]
                        .values[0],
                    ) + Number(value),
                  ).toFixed(2);
                binders[name].values[0] = Number(
                  Number(Number(binders[name].values[0])) + Number(value),
                ).toFixed(2);
              }
            },
          );
        },
      });
    }),
  );

  return <Binders binders={binders} />;
}
