const webpack = require("webpack");
let config = require("./config.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");

config = merge(config, {
    mode: "production",
    devtool: "inline-cheap-source-map",

    optimization: {
        moduleIds: "named",
        mergeDuplicateChunks: true,
        splitChunks: {
            chunks: "all",
            automaticNameDelimiter: ".",
        },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
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
    // module: {
    //     rules: [
    //         {
    //             test: /\.(s?css|styl(us|e)?)$/i,
    //             use: [
    //                 {
    //                     loader: MiniCssExtractPlugin.loader,
    //                     options: {
    //                         publicPath: (resourcePath, context) => {
    //                             return (
    //                                 path.relative(
    //                                     path.dirname(resourcePath),
    //                                     context
    //                                 ) + "/css/"
    //                             );
    //                         },
    //                     },
    //                 },
    //                 {
    //                     loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
    //                     options: {
    //                         import: true,
    //                     },
    //                 },
    //                 {
    //                     loader: "postcss-loader",
    //                 },
    //                 {
    //                     loader: "sass-loader", // 将 Sass 编译成 CSS
    //                 },
    //             ],
    //         },
    //     ],
    // },
    plugins: [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false,
        }),
        new webpack.ProgressPlugin({
            handler(val, msg, module) {
                console.clear();
                console.log(`${msg} ${(val * 100).toFixed(2)}% ${module}`);
            },
        }),
    ],
});

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
