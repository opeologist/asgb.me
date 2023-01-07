import HtmlWebpackPlugin from "html-webpack-plugin";
import ReactRefreshPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import { routeNames } from "./constants/index.mjs";
import { paramCase } from "param-case";

export default ({ isDev }) => ({
  devServer: isDev
    ? {
        server: {
          type: "spdy",
        },
        historyApiFallback: true,
      }
    : undefined,
  devtool: isDev ? "source-map" : false,
  experiments: {
    css: true,
    topLevelAwait: true,
  },
  mode: isDev ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
                parser: {
                  syntax: "typescript",
                  topLevelAwait: true,
                  jsx: true,
                },
                target: "es2022",
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: "/",
    chunkFilename: "[name].[contenthash].js",
    clean: true,
    filename: "[name].[contenthash].js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      templateParameters: {
        isDev,
      },
    }),
    // ...routeNames.map(
    //   (routeName) =>
    //     routeName !== "Home" &&
    //     new HtmlWebpackPlugin({
    //       templateParameters: {
    //         isDev,
    //       },
    //       filename: `${paramCase(routeName)}/index.html`,
    //     })
    // ),
    isDev && new ReactRefreshPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".json",
      ".css",
      ".module.css",
      ".mjs",
    ],
  },
});
