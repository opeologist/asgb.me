const { useEffect, useState } = await import("react");
const { getModularData } = await import("../../../helpers/getModularData");

export const VaultModular = () => {
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

      modularData.forEach((rack) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(rack, "text/html");
        computedTotal += parseInt(
          doc.getElementById("totalprice").innerText.replace(/[$,]+/g, "")
        );
      });

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
};
