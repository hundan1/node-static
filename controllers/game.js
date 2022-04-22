const gameController = {};
const GameBLL = require('../bll/game');
// const MyRedisStore = require('../dbi/redisstore');
/**
 * 
 */
gameController.fetchVersion = async function (req, res) {
    let result = {
        code: $ErrorCode.FAILED,
        msg: ""
    };
    try {
        let body = req.query;
        // $logger.debug(body);
        let name = body.name || "tests";
        let bundleName = body.bundleName || "";
        let params = {};

        params.name = name;
        params.bundleName = bundleName;

        let bll = new GameBLL();
        result = await bll.fetchVersion(params);
        if (result.code === $ErrorCode.SUCCESS) {

        }

    } catch (ex) {
        $logger.error(ex);
    } finally {
        res.statusCode = 200;
        res.send(result);
        // res.setHeader('Content-Type', 'text/html;charset=utf-8');
        // res.write(`你输入的路径不存在对应的内容`);
        // res.end();
    }
}
module.exports = gameController;