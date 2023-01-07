export default async function handler() {
  const racks = [
    "https://www.modulargrid.net/e/racks/view/1683745",
    "https://www.modulargrid.net/e/racks/view/1683740",
    "https://www.modulargrid.net/e/racks/view/1683726",
  ];
  // @ts-expect-error
  const data = [];

  await Promise.all(
    racks.map(async (rack) => {
      const response = await fetch(rack);
      const result = await response.text();

      data.push(result);
    })
  );

  // @ts-expect-error
  return new Response(JSON.stringify(data));
}
