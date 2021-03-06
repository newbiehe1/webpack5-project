const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const entry = {
    app: path.resolve(__dirname, "../src/main.js"),
};

const rules = [
    {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1000,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            name: "img/[name].[hash:5].[ext]",
                        },
                    },
                },
            },
        ],
    },
    {
        test: /\.m?js$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: {
            loader: "babel-loader",
        },
    },
    { test: /\.tsx?$/, loader: "ts-loader" },
    {
        test: /\.vue$/,
        loader: "vue-loader",
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)(\?\S*)?/i,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: 1000,
                    fallback: {
                        loader: "file-loader",
                        options: {
                            name: "fonts/[name].[hash:5].[ext]",
                        },
                    },
                },
            },
        ],
    },
    {
        test: /\.html$/,
        use: [
            "html-loader",
            {
                loader: "markup-inline-loader",
            },
        ],
    },
];

const plugins = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        minify: false,
        meta: {
            viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
            author: "world-vistor",
            "utf-8": { charset: "utf-8" },
            "X-UA-Compatible": {
                "http-equiv": "X-UA-Compatible",
                content: "IE=edge,chrome=1",
            },
            Pragma: {
                "http-equiv": "Pragma",
                content: "no-cache",
            },
        },
        template: path.resolve(__dirname, "../public/index.html"),
    }),

    new VueLoaderPlugin(),
];

module.exports = {
    entry: entry,
    output: {
        filename: "js/[name]-[chunkhash:5].js",
        publicPath: "./",
        path: path.resolve(__dirname, "../dist"),
    },
    resolve: {
        // mainFields: ["node_modules"],
        extensions: [".ts", ".vue", ".js", ".tsx", ".jsx", ".json"],
        alias: {
            "@": path.join(__dirname, "src"),
        },
    },
    module: {
        rules: rules,
    },
    plugins: plugins,
};
