"use client";

// @ts-expect-error
export default function Total({ htmls }) {
  let computedTotal = 0;

  // @ts-expect-error
  htmls.forEach((rack) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(rack, "text/html");
    computedTotal += parseInt(
      // @ts-expect-error
      doc.getElementById("totalprice").innerText.replace(/[$,]+/g, "")
    );
  });

  const total = computedTotal;

  return <h1>Total: ${total}</h1>;
}
