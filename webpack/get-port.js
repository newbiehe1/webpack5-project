// 获取端口
const net = require("net");
const { Worker, isMainThread, parentPort } = require("worker_threads");

function getPort(Port) {
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ port: Port }, () => {
            client.end();
            getPort(++Port).then((res) => {
                resolve(res);
            });
        });
        client.on("error", () => {
            resolve(Port);
        });
    });
}
getPort(8080).then((res) => {
    parentPort.postMessage(res);
});
if (isMainThread) {
    new Worker(__filename);
}
