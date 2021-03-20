module.exports = (api) => {
  api.cache(true);

  const plugins = [];

  if (process.env.AGB_ENV !== "app") {
    plugins.push(["react-native-web", { commonjs: true }]);
  }

  return {
    presets: [
      process.env.AGB_ENV === "app"
        ? "module:metro-react-native-babel-preset"
        : "next/babel",
    ],
    plugins,
  };
};
