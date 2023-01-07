"use client";

import { useEffect, useState } from "react";
import { getModularData } from "../../helpers/getModularData";

export default function Modular() {
  const [modularData, setModularData] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const getModularDataAsync = async () => {
      const data = await getModularData();

      setModularData(data);
    };

    getModularDataAsync();
  }, []);

  useEffect(() => {
    if (modularData !== null) {
      let computedTotal = 0;

      // @ts-expect-error
      modularData.forEach((rack) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rack, "text/html");
        computedTotal += parseInt(
          // @ts-expect-error
          doc.getElementById("totalprice").innerText.replace(/[$,]+/g, "")
        );
      });

      // @ts-expect-error
      setTotal(computedTotal);
    }
  }, [modularData]);

  return (
    total && (
      <main>
        <h1>Total: ${total}</h1>
      </main>
    )
  );
}
