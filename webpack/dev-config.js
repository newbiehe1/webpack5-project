let config = require("./config.js");
const path = require("path");
var fs = require("fs");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
// console.log("111", isProxy);

// 代理数据
let proxyData = {
    publicPath: "/",
    hot: true,
    host: "0.0.0.0",
    contentBase: path.join(__dirname, "../server"),
};
const fsPromises = fs.promises;

// 判断代理文件是否存在
fsPromises
    .access(
        path.join(__dirname, "../proxy.js"),
        fs.constants.R_OK | fs.constants.W_OK
    )
    .then(() => {
        let proxy = require("../proxy.js");
        if (Object.keys(proxy).length) {
            proxyData.proxy = require("../proxy.js");
        }
    });

module.exports = merge(config, {
    mode: "development",
    devServer: proxyData,
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    ie8: true,
                    safari10: true,
                    toplevel: true,
                    compress: {},
                },
            }),
        ],
    },
    plugins: [
        new ProgressBarPlugin({
            summary: false,
            clear: true,
        }),
    ],
});
