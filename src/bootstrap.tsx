const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom/client");
const { createBrowserRouter, RouterProvider } = await import(
  "react-router-dom"
);
const { paramCase } = await import("param-case");
const { Home } = await import("./components/pages/Home");
const { MtgVault } = await import("./components/pages/MtgVault");
const { getQueryParameter } = await import("./helpers/getQueryParameter");
const { routeNames } = await import("../constants.mjs");

await import("normalize.css");
await import("./bootstrap.css");

if (getQueryParameter("debug")) {
  await import("@babylonjs/inspector");
}

const routes = routeNames.map((RouteName) => ({
  path: RouteName === "Home" ? "/" : `/${paramCase(RouteName)}`,
  element: <RouteName />,
}));

const router = createBrowserRouter(routes);

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
