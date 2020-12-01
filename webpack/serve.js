const { Worker } = require("worker_threads");
const { merge } = require("webpack-merge");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const path = require("path");
let config = require("./dev-config.js");

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

const worker = new Worker(path.join(__dirname, "./get-port.js"));
worker.on("message", (e) => {
    config = merge(config, {
        devServer: {
            port: e,
        },
    });
    const compiler = webpack(config);

    const server = new WebpackDevServer(compiler, {
        stats: "errors-only",
    });
    server.listen(e, "0.0.0.0");

    compiler.hooks.done.tap("MyPlugin", () => {
        console.clear();
        console.log(`\x1B[42m DONE \x1B[0m  \x1B[32mCompiled successfully in ${stats.toJson().time}ms \x1B[0m`);
        console.log('');
        console.log('');
        console.log('   App running at:')
        console.log(`   - Local:   \x1B[36mhttp://localhost:${e}\x1B[0m`);
        console.log(`   - Network: \x1B[36mhttp://${IP}:${e}\x1B[0m`);
        console.log(" ");
        console.log('Note that the development build is not optimized.')
        console.log('To create a production build, run \x1B[36mnpm run build.\x1B[0m')
    });
});
