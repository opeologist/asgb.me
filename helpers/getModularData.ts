export const getModularData = async () => {
  const response = await fetch("/api/vault/modular");
  const data = await response.json();

  return data;
};
