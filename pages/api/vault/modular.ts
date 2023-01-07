export default async function handler() {
  const racks = [
    {
      name: "monitor stand 2",
      url: "https://www.modulargrid.net/e/racks/view/1683745",
    },
    {
      name: "monitor stand 1",
      url: "https://www.modulargrid.net/e/racks/view/1683740",
    },
    {
      name: "desk",
      url: "https://www.modulargrid.net/e/racks/view/1683726",
    },
  ];
  // @ts-expect-error
  const htmls = [];
  // @ts-expect-error
  const rackNames = [];

  await Promise.all(
    racks.map(async ({ name, url }) => {
      const response = await fetch(url);
      const result = await response.text();

      htmls.push(result);
      rackNames.push(name);
    })
  );

  return new Response(
    JSON.stringify({
      // @ts-expect-error
      htmls,
      // @ts-expect-error
      rackNames,
    })
  );
}
