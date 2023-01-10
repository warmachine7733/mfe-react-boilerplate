const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const packageJson = require("../package.json")

const devConfig = {
  mode: "development",
  devServer: {
    port: 7070,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:7070/",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        marketing: "marketing@http://localhost:7071/remoteEntry.js",
        auth: "auth@http://localhost:7072/remoteEntry.js",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
