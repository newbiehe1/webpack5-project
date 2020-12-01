let config = require("./config.js");
const path = require("path");

const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const webpack = require("webpack");
// console.log("111", isProxy);

// 代理数据
let proxyData = {
    publicPath: "/",
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "../server"),
    compress: true,
    inline: true,
    noInfo: true,
    hot: true,
    port: 8080,
};

module.exports = merge(config, {
    mode: "development",
    devServer: proxyData,
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {},
                },
            }),
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ProgressBarPlugin({
            summary: false,
            clear: true,
        }),
    ],
});
