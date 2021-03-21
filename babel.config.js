module.exports = (api) => {
  api.cache(false);

  const plugins = [];

  if (process.env.AGB_ENV === "web") {
    plugins.push(["react-native-web", { commonjs: true }]);
  }

  return {
    presets: [
      process.env.AGB_ENV === "web"
        ? "next/babel"
        : "module:metro-react-native-babel-preset",
    ],
    plugins,
  };
};
