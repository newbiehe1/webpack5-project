let config = require("./config.js");
const path = require("path");
const { merge } = require("webpack-merge");
const webpack = require("webpack");

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
    compress: true,
    clientLogLevel: "none", //将要失效  下个版本
    // quiet: true,
    overlay: true,
    // liveReload: true,
};

module.exports = merge(config, {
    mode: "development",
    devServer: proxyData,
    module: {
        rules: [
            {
                test: /\.(s?css|styl(us|e)?)$/i,
                use: [
                    "vue-style-loader",
                    {
                        loader: "css-loader", // 将 CSS 转化成 CommonJS 模块
                        options: {
                            esModule: false,
                            import: true,
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                    {
                        loader: "sass-loader", // 将 Sass 编译成 CSS
                    },
                ],
            },
        ],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
});
