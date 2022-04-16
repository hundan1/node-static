const os = require("os");
const fs = require("fs");
/**
 * https://www.cnblogs.com/hanshuai/p/12959979.html
 * 
 * 获取当前机器的ip地址
 */
let addrReg = /^((http|https):\/\/(localhost|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))):(\d|[1-9]\d|[1-9]\d\d|[1-9]\d\d\d|[1-5]\d\d\d\d|6[0-4]\d\d\d|65[0-4]\d\d|655[0-2]\d|6553[0-5])\/)/;

let adjustPaths = [
    "./public/remote-assets/",
    // 测试基础版
    "./public/games/tests/1.0.0/", "./public/games/tests/1.0.1/", "./public/games/tests/1.0.2/",
    "./public/games/tests/1.1.0/", "./public/games/tests/1.1.1/", "./public/games/tests/1.1.2/",
    // 剔除无用模块
    "./public/games/tests/1.2.0/",

    // 勾选调试模式(1.3.2 修复帧报错)
    "./public/games/tests/1.3.0/","./public/games/tests/1.3.1/","./public/games/tests/1.3.2/",

    // 不勾选调试模式, 修复 news Label真机为null帧报错 屏闪
    "./public/games/tests/1.4.0/","./public/games/tests/1.4.1/"
];

// 0-255
// 0-9 10-99 100-199 200-249 250-255
// 0-65535
// 0-9 10-99 100-999 1000-9999 10000-59999 60000-64999 65000-65499 65500-65529 65530-65535

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
    forceAdjust: false,// 强制修改manifest，不比对上一次ip+port
};

function autoAdjustMnfst(dir, ip) {

    var path1 = dir + "project.manifest";
    var path2 = dir + "version.manifest";

    var url = "http://" + ip + ":" + config.port + "/";

    // var out1 = "./ttt/project.manifest";
    // var out2 = "./ttt/version.manifest";

    var res1 = fs.readFileSync(path1, { encoding: "utf-8" });
    if (res1) {
        // console.log(res1);
        res1 = JSON.parse(res1);
        res1.packageUrl = res1.packageUrl.replace(addrReg, url);
        res1.remoteManifestUrl = res1.remoteManifestUrl.replace(addrReg, url);
        res1.remoteVersionUrl = res1.remoteVersionUrl.replace(addrReg, url);

        res1 = JSON.stringify(res1);


        var rv = fs.writeFileSync(path1, res1, { encoding: "utf-8" });
        console.log(path1, "adjust success...");
    }

    var res2 = fs.readFileSync(path2, { encoding: "utf-8" });
    if (res2) {
        // console.log(res2);
        res2 = JSON.parse(res2);
        res2.packageUrl = res2.packageUrl.replace(addrReg, url);
        res2.remoteManifestUrl = res2.remoteManifestUrl.replace(addrReg, url);
        res2.remoteVersionUrl = res2.remoteVersionUrl.replace(addrReg, url);
        res2 = JSON.stringify(res2);

        var rv = fs.writeFileSync(path2, res2, { encoding: "utf-8" });
        console.log(path2, "adjust success...");
    }
}
function _autoAdjustMnfst(ip) {

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
        // console.log("adjust project.manifest success...");
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
        // console.log("adjust version.manifest success...");
    }
}

function checkIPSame(ipAddr) {
    let result = {
        isSame: false,
    };
    var path = "./records/config.json";//记录上一次config信息
    var port = config.port;
    var addr = ipAddr + ":" + port;

    var res1 = fs.readFileSync(path, { encoding: "utf-8" });
    if (res1) {
        var cnt = JSON.parse(res1);
        if (addr === cnt.lastAddress) {
            console.log("ip&port未变,无需修改!");
            result.isSame = true;
        } else {
            result.isSame = false;
            cnt.lastIp = ipAddr;
            cnt.lastPort = port;
            cnt.lastAddress = addr;
            cnt = JSON.stringify(cnt);
            result.newCnt = cnt;

            console.log("ip&port变更,开始修改manifest文件!");
            // cb(cnt);
        }
    } else {
        console.log("校验ip&port出错:读取文件异常！！！");
        result.isSame = false;
        result.newCnt = JSON.stringify({
            "lastIp": ipAddr,
            "lastPort": port,
            "lastAddress": addr
        });
    }
    return result;
}

function changeRecCnf(newCnt) {
    var path = "./records/config.json";//记录上一次config信息
    var rv = fs.writeFileSync(path, newCnt, { encoding: "utf-8" });
    console.log(`修改${path}完成!`);
}

let ipAddress = getIpAddress();
if (ipAddress) {
    // autoAdjustMnfst(ipAddress);

    var newCnt = "";
    if (config.forceAdjust) {
        console.log("强制修改manifest,不比对上一次ip和port");
        // var path = "./records/config.json";//记录上一次config信息
        // var res1 = fs.readFileSync(path, { encoding: "utf-8" });
        // if(res1){
        //     let cnt = JSON.parse(res1);
        //     let port = config.port;
        //     let addr = ipAddress + ":" + port;
        //     cnt.lastIp = ipAddress;
        //     cnt.lastPort = port;
        //     cnt.lastAddress = addr;
        //     newCnt = JSON.stringify(cnt);
        // }else{
        //     console.log(`读取文件${path}异常！！！`);
        // }

        // 没必要读取了，直接强制赋值
        newCnt = JSON.stringify({
            "lastIp": ipAddress,
            "lastPort": config.port,
            "lastAddress": ipAddress + ":" + config.port
        });

    } else {
        var result = checkIPSame(ipAddress);
        if(!result.isSame){
            newCnt = result.newCnt;
        }
    }

    if (newCnt) {
        adjustPaths.forEach(function (dir) {
            autoAdjustMnfst(dir, ipAddress);
        });
        console.log("修改manifest文件结束");
        changeRecCnf(newCnt);
    }


    config._ip = ipAddress;

    console.log("\n");
    console.log("ipv4: " + ipAddress);
} else {

    console.log("\n");
    console.log("Error:", "查询本机ipv4失败!!!");
}
// console.error(new Error("查询本机ipv4失败"));// 打印太多了


module.exports = config;