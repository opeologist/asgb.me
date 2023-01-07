const { StrictMode } = await import("react");
const { createRoot } = await import("react-dom/client");
const { createBrowserRouter, RouterProvider } = await import(
  "react-router-dom"
);
const { pathCase } = await import("path-case");
const { getQueryParameter } = await import("./helpers/getQueryParameter");
const { routeNames } = await import("../constants/index.mjs");

await import("normalize.css");
await import("./bootstrap.css");

if (getQueryParameter("debug")) {
  await import("@babylonjs/inspector");
}

const routesPromises = routeNames.map(async ({ name }) => {
  const Component = await import(`./components/pages/${name}`);
  const Element = Component[name];

  return {
    path: `${name === "Home" ? "/" : `/${pathCase(name)}`}`,
    element: <Element />,
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
