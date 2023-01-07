export const getModularData = async () => {
  const response = await fetch(
    "https://vcmvosg5ki7sltkplknbv4fewi0ygsao.lambda-url.us-east-1.on.aws/"
  );
  const data = await response.json();

  return data;
};
