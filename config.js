const os = require("os");
const fs = require("fs");
/**
 * https://www.cnblogs.com/hanshuai/p/12959979.html
 * 
 * 获取当前机器的ip地址
 */
function getIpAddress() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        let iface = ifaces[dev];
        for (let i = 0; i < iface.length; i++) {
            let { family, address, internal } = iface[i];
            if (family === "IPv4" && address !== "127.0.0.1" && !internal) {
                return address;
            }
        }
    }
}

let config = {
    test: "module config is import success!",
    // ip: "localhost",// 局域网用户无法访问
    // ip: "127.0.0.1",// 局域网用户无法访问
    // ip: ipAddress || "0.0.0.0",// 局域网用户可以访问
    ip: "0.0.0.0",// 局域网用户可以访问
    // ip: "192.168.66.66",
    port: 5151,
    // port: 5500,
    staticPath: "./public",// 根目录
    // _ip: ipAddress || "localhost",// 终端提示文字用
    _ip: "localhost",// 终端提示文字用
};

function autoAdjustMnfst(ip) {

    var path1 = "./public/remote-assets/project.manifest";
    var path2 = "./public/remote-assets/version.manifest";

    // var out1 = "./ttt/project.manifest";
    // var out2 = "./ttt/version.manifest";

    var res1 = fs.readFileSync(path1, { encoding: "utf-8" });
    if (res1) {
        // console.log(res1);
        res1 = JSON.parse(res1);
        res1.packageUrl = "http://" + ip + ":" + config.port + "/remote-assets/";
        res1.remoteManifestUrl = "http://" + ip + ":" + config.port + "/remote-assets/project.manifest";
        res1.remoteVersionUrl = "http://" + ip + ":" + config.port + "/remote-assets/version.manifest";
        res1 = JSON.stringify(res1);


        var rv = fs.writeFileSync(path1, res1, { encoding: "utf-8" });
        console.log("adjust project.manifest success...");
    }

    var res2 = fs.readFileSync(path2, { encoding: "utf-8" });
    if (res2) {
        // console.log(res2);
        res2 = JSON.parse(res2);
        res2.packageUrl = "http://" + ip + ":" + config.port + "/remote-assets/";
        res2.remoteManifestUrl = "http://" + ip + ":" + config.port + "/remote-assets/project.manifest";
        res2.remoteVersionUrl = "http://" + ip + ":" + config.port + "/remote-assets/version.manifest";
        res2 = JSON.stringify(res2);

        var rv = fs.writeFileSync(path2, res2, { encoding: "utf-8" });
        console.log("adjust version.manifest success...");
    }
}

let ipAddress = getIpAddress();
if (ipAddress) {
    autoAdjustMnfst(ipAddress);
    console.log("\n");

    config._ip = ipAddress;
    console.log("ipv4: " + ipAddress);
} else {
    console.log("Error:", "查询本机ipv4失败!!!");
}
// console.error(new Error("查询本机ipv4失败"));// 打印太多了


module.exports = config;