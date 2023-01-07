const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom/client");
const { createBrowserRouter, RouterProvider } = await import(
  "react-router-dom"
);
const { Home } = await import("./components/pages/Home");
const { MtgVault } = await import("./components/pages/MtgVault");
const { getQueryParameter } = await import("./helpers/getQueryParameter");

await import("normalize.css");
await import("./bootstrap.css");

if (getQueryParameter("debug")) {
  await import("@babylonjs/inspector");
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/mtg-vault",
    element: <MtgVault />,
  },
]);

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
