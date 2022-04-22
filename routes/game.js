const express = require('express')
const router = express.Router()
const path = require("path");

let gameController = require('../controllers/game');
/**
* @apiDefine game 游戏
*/

// router.get('/', (req, res) => {
//   $logger.log(req.query);

//   res.send({
//     msg: '[get]games/',
//     data: req.query,
//   });
// });


/**
 * 用于动态热更新
 * 获取最新版本号和热更新地址
 */
router.get('/ll/version', (req, res) => {
    // $logger.log(req.query);
    // let urlStr = $conf.url + "/games/ll/1.1.5/"; // 模拟小版本更新 1.1.5
    let urlStr = $conf.url + "/games/ll/1.1.2/"; // 模拟小版本回退
    // let urlStr =  $conf.url + "/games/ll/2.0.0/"; // 模拟大版本更新
    let apkUrl = $conf.url + "/games/tests/1.4.0/tests_v1.4.0.apk";
    res.send({
        msg: '[get]games/version/',
        url: urlStr,
        version: "1.4.0",
        apkUrl
        // data: {
        //     val: urlStr
        // },
    });
});

/**
 * 用于动态热更新
 * 获取最新版本号和热更新地址
 */
router.get('/tests/version', (req, res) => {
    // $logger.log(req.query);
    // const urlStr = $conf.url + "/games/tests/1.4.3/"; // 模拟小版本更新 1.1.5
    // const urlStr = $conf.url + "/games/tests/1.4.2/"; // 模拟小版本回退
    const urlStr = $conf.url + "/games/tests/2.0.1/"; // 模拟小版本更新
    // const urlStr = $conf.url + "/games/tests/2.0.0/"; // 模拟大版本更新
    let apkUrl = $conf.url + "/games/tests/1.4.0/tests_v1.4.0.apk";
    res.send({
        msg: '[get]games/version/',
        url: urlStr,
        version: "2.0.1",
        apkUrl
        // data: {
        //     val: urlStr
        // },
    });
});

/**
 * 
 * @api {get} /api/game/version 获取最新版本号和hash值
 * @apiDescription 获取最新版本号和hash值
 * @apiName fetchVersion
 * @apiGroup game 
 * @apiParam {String} name 游戏名称 必填
 * 
 * 
 * @apiSuccess {number} code
 * @apiSuccess {string} version 版本号
 * @apiSuccess {string} hash    版本号
 * @apiSuccess {object} hashs   版本号
 * @apiSuccess {string} msg 错误提示信息
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
    "version": "1.0.1",
    "hash": "e2f03",
 */
router.get('/version', gameController.fetchVersion);

module.exports = router;