const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom");
const { App } = await import("./components/App");
const { getQueryParameter } = await import("./helpers/getQueryParameter");

await import("normalize.css");
await import("./bootstrap.css");

if (getQueryParameter("debug")) {
  await import("@babylonjs/inspector");
}

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

export {};
