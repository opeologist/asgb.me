import { parse } from "papaparse";
import { Binders } from "./Binders";
import { decks } from "./decks";

export interface Binders {
  [key: string]: Binder;
}

export interface Binder {
  sets: Set[];
  value: string;
  prevValues?: string[];
}

interface Set {
  cards: Card[];
  id: string;
  name: string;
  value: string;
  prevValues?: string[];
}

export interface Card {
  id: string;
  name: string;
  url: string;
  value: string;
  prevValues?: string[];
}

const deckApiUrl = (_: TemplateStringsArray, id: string) =>
  `https://api.scryfall.com/decks/${id}/export/csv`;

export default async function MtgPage() {
  const binders: Binders = {};
  let total = "0";

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
              value: "0",
            });
          } else {
            binders[name] = {
              sets: [
                {
                  cards: [],
                  id,
                  name: set,
                  value: "0",
                },
              ],
              value: "0",
            };
          }

          cards.forEach(
            ([, , cardName, , , , , , , , , , value, , , url, id], i) => {
              if (i !== 0 && i !== cards.length - 1) {
                binders[name].sets[binders[name].sets.length - 1].cards.push({
                  id,
                  name: cardName,
                  url,
                  value: Number(value).toFixed(2),
                });
                binders[name].sets[binders[name].sets.length - 1].value =
                  Number(
                    Number(
                      binders[name].sets[binders[name].sets.length - 1].value,
                    ) + Number(value),
                  ).toFixed(2);
                binders[name].value = Number(
                  Number(Number(binders[name].value)) + Number(value),
                ).toFixed(2);
                total = Number(Number(total) + Number(value)).toFixed(2);
              }
            },
          );
        },
      });
    }),
  );

  return (
    <main>
      <h1>MTG</h1>
      <Binders binders={binders} total={total} />
    </main>
  );
}
