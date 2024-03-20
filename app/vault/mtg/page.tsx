import Link from "next/link";
import { parse } from "papaparse";
import { Cards } from "./Cards";
import { decks } from "./decks";

interface Binders {
  [key: string]: Binder;
}

interface Binder {
  sets: Set[];
  value: number;
}

interface Set {
  cards: Card[];
  id: string;
  name: string;
  value: number;
}

export interface Card {
  id: string;
  name: string;
  url: string;
  value: number;
}

const deckApiUrl = (_: TemplateStringsArray, id: string) =>
  `https://api.scryfall.com/decks/${id}/export/csv`;

export default async function MtgPage() {
  const binders: Binders = {};
  let total = 0;

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
              value: 0,
            });
          } else {
            binders[name] = {
              sets: [
                {
                  cards: [],
                  id,
                  name: set,
                  value: 0,
                },
              ],
              value: 0,
            };
          }

          cards.forEach(
            ([, , cardName, , , , , , , , , , value, , , url, id], i) => {
              if (i !== 0 && i !== cards.length - 1) {
                binders[name].sets[binders[name].sets.length - 1].cards.push({
                  id,
                  name: cardName,
                  url,
                  value: Number(value),
                });
                binders[name].sets[binders[name].sets.length - 1].value +=
                  Number(value);
                binders[name].value += Number(value);
                total += Number(value);
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
      <h2>Total: ${total.toFixed(2)}</h2>
      <ul>
        {Object.entries(binders)
          .sort(([, { value }], [, { value: bValue }]) => bValue - value)
          .map(([name, { sets, value }]) => (
            <li key={name}>
              <h3>
                {name}: ${value.toFixed(2)}
              </h3>
              <ul>
                {sets
                  .sort((a, b) => b.value - a.value)
                  .map(({ cards, id, name, value }, i) => (
                    <li key={`${name}${i}`}>
                      <strong>
                        <Link
                          href={`https://scryfall.com/@opeologist/decks/${id}`}
                        >
                          {name}
                        </Link>
                      </strong>{" "}
                      ({cards.length}): ${value.toFixed(2)}
                      <Cards cards={cards} />
                    </li>
                  ))}
              </ul>
            </li>
          ))}
      </ul>
    </main>
  );
}
