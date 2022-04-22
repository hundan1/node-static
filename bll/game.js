// const GameDBI = require('../dbi/game');
const FS = require("fs");
const PATH = require("path");

// FS.existsSync(dir) 路径中有中文时一直返回false
// 检测文件或者文件夹存在 nodeJS
// function fsExistsSync(path) {
//     try{
//         FS.accessSync(path, FS.F_OK);
//     }catch(e){
//         return false;
//     }
//     return true;
// }

class GameClass {
    /**
    * 查询游戏版本信息
    * @param {string} params.name 游戏名称
    * @param {string} params.bundleName 包名称
    */
    async fetchVersion({
        offset = 0,
        limit = 0,
        name = "",
        bundleName = "",
        searchKey = "",
        sort = "",
        order = "",
    } = {}) {
        let result = {
            code: $ErrorCode.SUCCESS,
            msg: ""
        };
        try {

            let searchs = {};
            let sorts = {};
            // let dbi = new GameDBI();
            // let dir = "../public/games/" + name;
            let src = "../public/games/";
            let dir = PATH.join(__dirname, src, name);// 用相对路径是不可靠的，在不同文件夹下启动(node) 服务 相对路径是会变的 __dirname 可以取到当前文件的绝对路径
            let stat;
            try {
                stat = FS.statSync(dir);
                if (!stat.isDirectory()) {
                    throw new Error(dir + "不是文件夹")
                }
            } catch (ex) {
                $logger.error(ex);
                result.code = $ErrorCode.OBJECT_NOEXISTS;
                result.msg = "不存在该游戏";
                return;
            }
            let subpaths = FS.readdirSync(dir);
            for (let i = 0; i < subpaths.length; ++i) {
                if (!stat.isDirectory() || !$Regexs.version.test(subpaths[i])) {
                    subpaths.splice(i, 1);
                    i--;
                }
            }
            if (subpaths.length == 0) {
                result.code = $ErrorCode.OBJECT_NOEXISTS;
                result.msg = "不存在该游戏";
                return;
            }
            subpaths = subpaths.sort((a, b) => {
                let _a = a.split(".");
                let _b = b.split(".");
                if (_a[0] == _b[0]) {
                    if (_a[1] == _b[1]) {
                        return _b[2] - _a[2];
                    } else {
                        return _b[1] - _a[1];
                    }
                } else {
                    return _b[0] - _a[0];
                }
            });
            let latestVersion = subpaths[0];
            let latestPath = PATH.join(dir, latestVersion);// 最新版游戏路径
            // stat = FS.statSync(subpath);
            // if (stat.isDirectory()) {
            //     // readDir(subpath, obj);
            // }
            let is_jsc = false; // 脚本是否加密
            let srcPath = PATH.join(latestPath, "src");
            try {
                let stat = FS.statSync(srcPath);
                if (!stat.isDirectory()) {
                    throw new Error(`${srcPath}不是文件夹`);
                }
                let items = FS.readdirSync(srcPath);
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    if (/^settings\.[0-9a-zA-Z]{5}\.jsc$/.test(item)) {
                        is_jsc = true;
                        break;
                    }
                }
            } catch (ex) {
                $logger.error(ex);
                result.code = $ErrorCode.OBJECT_NOEXISTS;
                result.msg = "该游戏最新版资源目录下无src文件夹";
                return;
            }

            if (!is_jsc) {
                let path1 = PATH.join(latestPath, "src/settings.js");
                let file1Cont;
                try {
                    let res = FS.readFileSync(path1);
                    if (res) {
                        let window = {};
                        eval(`${res}`);
                        file1Cont = JSON.parse(JSON.stringify(window._CCSettings));
                        window = null;
                    }
                } catch (ex) {
                    $logger.error(ex);
                    result.code = $ErrorCode.OBJECT_NOEXISTS;
                    result.msg = "该游戏最新版资源目录下无src/settings.js文件";
                    return;
                }

                // let file2Cont;
                // let path2 = PATH.join(latestPath, "version.manifest");
                // try {
                //     let res = FS.readFileSync(path2);
                //     if (res) {
                //         file2Cont = JSON.parse(res);
                //     }
                // } catch (ex) {
                //     $logger.error(ex);
                //     result.code = $ErrorCode.OBJECT_NOEXISTS;
                //     result.msg = "该游戏最新版资源目录下无version.manifest文件";
                //     return;
                // }

                // if (file1Cont && file2Cont) {
                if (file1Cont) {
                    if (bundleName) {
                        let isExist = file1Cont.remoteBundles.includes(bundleName);
                        if (isExist) {
                            result.code = $ErrorCode.SUCCESS;

                            result.hash = file1Cont.bundleVers[bundleName];
                            // result.version = file2Cont.version;
                            result.version = latestVersion;
                            result.url = `${$conf.url}/games/${name}/${latestVersion}/`;
                            result.apkUrl = `${$conf.url}/games/${name}/${latestVersion}/${name}_v${latestVersion}.apk`;
                        } else {
                            result.code = $ErrorCode.OBJECT_NOEXISTS;
                            result.msg = "该项目下没有该远程AB";
                        }

                    } else {
                        result.code = $ErrorCode.SUCCESS;

                        result.hashs = file1Cont.bundleVers;
                        // result.version = file2Cont.version;
                        result.version = latestVersion;
                        result.url = `${$conf.url}/games/${name}/${latestVersion}/`;
                        result.apkUrl = `${$conf.url}/games/${name}/${latestVersion}/${name}_v${latestVersion}.apk`;
                    }
                } else {
                    result.code = $ErrorCode.FAILED;
                    result.msg = "error";
                }
            } else {
                let remotePath = PATH.join(latestPath, "remote");
                let isRemoteExist = true;
                if (!FS.existsSync(remotePath)) {
                    isRemoteExist = false;
                    // result.code = $ErrorCode.OBJECT_NOEXISTS;
                    // result.msg = "该游戏最新版资源目录下无remote文件夹";
                    // return;
                }

                let bundleVers = {};
                try {
                    if (isRemoteExist) {
                        let items = FS.readdirSync(remotePath);
                        if (bundleName && !items.includes(bundleName)) {
                            result.code = $ErrorCode.OBJECT_NOEXISTS;
                            result.msg = "该项目下没有该远程AB";
                            return;
                        }


                        for (let i = 0; i < items.length; i++) {
                            let item = items[i];
                            let bundlePath = PATH.join(remotePath, item);
                            let stat = FS.statSync(bundlePath);
                            if (stat.isDirectory()) {
                                let _items = FS.readdirSync(bundlePath);
                                for (let j = 0; j < _items.length; j++) {
                                    let _item = _items[j];
                                    if (/^config\.[0-9a-zA-Z]{5}\.json$/.test(_item)) {
                                        bundleVers[item] = _item.substring(7, 12);
                                        break;
                                    }
                                }
                            }
                        }

                        if (bundleName && bundleVers[bundleName] === undefined) {
                            result.code = $ErrorCode.OBJECT_NOEXISTS;
                            result.msg = "该项目下远程AB文件夹内没有config.json文件";
                            return;
                        }
                    }else{
                        if (bundleName) {
                            result.code = $ErrorCode.FAILED;
                            result.msg = "该游戏最新版资源目录下无remote文件夹";
                            return;
                        }
                    }
                    
                    


                    result.code = $ErrorCode.SUCCESS;

                    if (bundleName) {
                        result.hash = bundleVers[bundleName];
                    } else {
                        result.hashs = bundleVers;
                    }
                    result.version = latestVersion;
                    result.url = `${$conf.url}/games/${name}/${latestVersion}/`;
                    result.apkUrl = `${$conf.url}/games/${name}/${latestVersion}/${name}_v${latestVersion}.apk`;
                } catch (ex) {
                    $logger.error(ex);
                    result.code = $ErrorCode.FAILED;
                    // result.msg = "该游戏最新版资源目录下无src文件夹";
                    return;
                }


            }

        } catch (err) {
            $logger.error(err);
        } finally {
            return result;
        }
    }
};
module.exports = GameClass;