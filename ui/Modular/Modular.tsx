import RackContents from "./RackContents";
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
    <>
      <Total htmls={htmls} />
      <hr />
      <RackContents htmls={htmls} rackNames={rackNames} />
    </>
  );
}
