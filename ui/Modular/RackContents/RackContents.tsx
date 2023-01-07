"use client";

// @ts-expect-error
export default function RackContents({ htmls, rackNames }) {
  const racks = {};

  // @ts-expect-error
  htmls.forEach((rack) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rack, "text/html");
    const {
      rack: {
        Module,
        Rack: { name },
      },
    } = JSON.parse(doc.querySelector('[data-mg-json="rtd"]')!.innerHTML);

    // @ts-expect-error
    racks[name] = Module;
  });

  return (
    <>
      {Object.keys(racks).map((key) => (
        <section key={key}>
          <h2>{key}</h2>
          <ul>
            {/* @ts-expect-error */}
            {racks[key].map(({ name }) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
