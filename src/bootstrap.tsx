const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom");
const { App } = await import("./components/App");

await import("normalize.css");
await import("./bootstrap.css");

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export {};
