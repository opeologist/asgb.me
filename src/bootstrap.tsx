const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom/client");
const { createBrowserRouter, RouterProvider } = await import(
  "react-router-dom"
);
const { paramCase } = await import("param-case");
const { getQueryParameter } = await import("./helpers/getQueryParameter");
const { routeNames } = await import("../constants.mjs");

await import("normalize.css");
await import("./bootstrap.css");

if (getQueryParameter("debug")) {
  await import("@babylonjs/inspector");
}

const routesPromises = routeNames.map(async (RouteName) => {
  const Component = await import(`./components/pages/${RouteName}`);
  const RouteComponent = Component[RouteName];

  return {
    path: RouteName === "Home" ? "/" : `/${paramCase(RouteName)}`,
    element: <RouteComponent />,
  };
});

Promise.all(routesPromises).then((routes) => {
  const router = createBrowserRouter(routes);

  createRoot(document.getElementById("app")).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
});
