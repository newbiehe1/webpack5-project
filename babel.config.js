module.exports = function (api) {
    api.cache(true);
    const presets = [
        [
            "@babel/env",
            {
                targets: {
                    edge: "13",
                    firefox: "45",
                    chrome: "46",
                    safari: "10",
                },
                corejs: "2",
                useBuiltIns: "usage",
            },
        ],
    ];
    return {
        presets,
    };
};
