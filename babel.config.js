module.exports = {
  env: {
    app: {
      presets: ["module:metro-react-native-babel-preset"],
    },
    web: {
      presets: ["next/babel"],
      plugins: [["react-native-web", { commonjs: true }]],
    },
  },
};
