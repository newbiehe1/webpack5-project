const { Worker } = require("worker_threads");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
let config = require("./dev-config.js");
const fs = require("fs");

const IP = (function () {
    const interfaces = require("os").networkInterfaces();
    for (let a in interfaces) {
        let interface = interfaces[a];
        for (let i = 0; i < interface.length; i++) {
            const ip = interface[i];
            if (
                ip.family === "IPv4" &&
                ip.address !== "127.0.0.1" &&
                !ip.internal
            ) {
                return ip.address;
            }
        }
    }
})();
let proxy = {};
if (fs.existsSync(path.join(__dirname, "../proxy.js"))) {
    Object.assign(proxy, require(path.join(__dirname, "../proxy.js")));
}

const worker = new Worker(path.join(__dirname, "./get-port.js"));
process.stderr.write(` server start ..... \n`);
worker.on("message", (e) => {
    config = merge(config, {
        devServer: {
            port: e,
        },
    });
    if (proxy && Object.keys(proxy).length) {
        config = merge(config, {
            devServer: {
                proxy: proxy,
            },
        });
    }

    const compiler = webpack(config);

    WebpackDevServer.addDevServerEntrypoints(config, config.devServer);

    const server = new WebpackDevServer(
        compiler,
        Object.assign(
            {},
            {
                stats: "errors-only",
            },
            config.devServer
        )
    );
    server.listen(e, "0.0.0.0");

    compiler.hooks.done.tap("MyPlugin", () => {
        console.clear();
        console.log(" ");
        console.log(`server on     http://localhost:${e}`);
        console.log(`server on     http://${IP}:${e}`);
    });
});
