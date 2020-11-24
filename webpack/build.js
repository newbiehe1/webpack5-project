const webpack = require("webpack");
let config = require("./config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

config = merge(config, {
    mode: "production",
    // devtool: "inline-cheap-source-map",
    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new ProgressBarPlugin({
            format: "",
            clear: true,
            summary: false,
        }),
    ],
    cache: false,
});

process.stderr.write(` build start ..... \n\n`);
// module.exports = config;

webpack(config, (err, state) => {
    // console.log("##########################################################");
    // console.log(state);
    // console.log(state);
});
