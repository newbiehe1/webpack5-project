let config = require("./config.js");
const path = require("path");

const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

// 代理数据
let proxyData = {
    publicPath: "/",
    host: "0.0.0.0",
    inline: true,
    stats: "errors-only",
    contentBase: path.join(__dirname, "../server"),
    compress: true,
    noInfo: true,
    hot: true,
    port: 8080,
    progress: true,
};

module.exports = merge(config, {
    mode: "development",
    devServer: proxyData,
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             extractComments: false,
    //             terserOptions: {
    //                 compress: {},
    //             },
    //         }),
    //     ],
    // },
    // plugins: [new webpack.HotModuleReplacementPlugin()],
});
