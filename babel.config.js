const presets = [
    // [
    //     "@babel/env",
    //     {
    //         targets: {
    //             edge: "17",
    //             firefox: "60",
    //             chrome: "67",
    //             safari: "11.1",
    //             ie: ">8",
    //         },
    //         useBuiltIns: "usage",
    //     },
    // ],
];
const plugins = [
    "@babel/plugins-external-helpers",
    [
        "@babel/plugins-transform-runtime",
        {
            corejs: 2,
        },
    ],
    "@babel/plugin-transform-flow-strip-types",
    "@babel/plugin-transform-object-assign",
    "@babel/plugin-transform-async-to-generator",
    "@babel/plugin-transform-modules-umd",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-transform-regenerator",
    "transform-inline-environment-variables",
    "transform-inline-consecutive-adds",
    "minify-builtins",
    "@babel/plugin-transform-strict-mode",
];

module.exports = {
    presets: presets,
    plugins: plugins,
};
