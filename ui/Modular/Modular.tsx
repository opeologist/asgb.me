import Total from "./Total";

export default async function Modular() {
  const response = await fetch(
    `${
      process.env.NEXT_IS_DEV ? "http://localhost:3000" : "https://asgb.me"
    }/api/vault/modular`
  );
  const data = await response.json();
  const { htmls, rackNames } = data;

  return (
    <main>
      <Total htmls={htmls} />
      <hr />
      {/* @ts-expect-error */}
      {rackNames && rackNames.map((rack) => <h2 key={rack}>{rack}</h2>)}
    </main>
  );
}
