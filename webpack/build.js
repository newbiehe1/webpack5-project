const webpack = require("webpack");
let config = require("./config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

config = merge(config, {
    mode: "production",
    devtool: "inline-cheap-source-map",

    optimization: {
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    ie8: true,
                    safari10: true,
                    toplevel: true,
                },
            }),
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new ProgressBarPlugin({
            summary: false,
        }),
    ],
});

process.stderr.write(` build start ..... \n\n`);

// module.exports = config;

webpack(config, (err, stats) => {
    // console.log("##########################################################");
    // console.log(state);
    console.log(
        stats.toString({
            chunks: false, // 使构建过程更静默无输出
            colors: true, // 在控制台展示颜色
        })
    );
});
