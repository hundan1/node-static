const Express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require("./routes/index");

global.$app = new Express();
global.$moment = require("moment");
global.$ErrorCode = require('./utils/error');
global.$Regexs = require("./utils/regexs");
global.$conf = require("./config");
global.$logger = console;

$moment.locale();         // zh-cn



// res.render方法使用要配置模板引擎
// $app.set("views", "./views");  // 告诉服务模板文件放在哪个文件夹下
// $app.set("view engine", "ejs");// 告诉服务是哪种模板语法


// $logger.log($conf.test);



// let urlStr = "http://" + $conf._ip;
// if ($conf.port !== 80) {
//     urlStr += (":" + $conf.port);// 80端口浏览器访问可省写端口
// }
const urlStr = $conf.url;
$app.listen($conf.port, $conf.ip, () => {
    // let url = "http://" + $conf._ip + ":" + $conf.port;
    $logger.log("service is run at \t\t" + urlStr);
    $logger.log("you can try load file1:\t\t" + urlStr + "/test.txt");
    $logger.log("you can try load file2:\t\t" + urlStr + "/videos/原神MMD.mp4");
    $logger.log("you can try request[get]:\t" + urlStr + "/api/test?a=1&b=2");
    $logger.log("you can try request[post]:\t" + urlStr + "/api/test/add", " {\"a\": 1, \"b\": 2}");
});

// 允许跨域
$app.all('*', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");// error:he value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    // $logger.log(req);
    // res.headers['Access-Control-Allow-Origin'] = req.environ['HTTP_ORIGIN'];// 设置动态的origin
    res.header('Access-Control-Allow-Origin', req.headers['origin']);// 设置动态的origin
    res.header("Access-Control-Allow-Credentials", true);// The value of the 'Access-Control-Allow-Credentials' header in the response is '' which must be 'true' when the request's credentials mode is 'include'.


    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,application/json");
    // res.header("Access-Control-Allow-Headers", "Content-Type");
    // res.header("Access-Control-Allow-Headers", "application/json");
    // res.header("Access-Control-Allow-Headers", "*");



    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Access-Control-Allow-Methods", "*");


    res.header("X-Powered-By", ' 3.2.1')
    next();
});

$app.use(bodyParser.urlencoded({ extended: false }));// 使用该中间件 可以解析x-www-form-urlencoded的参数
$app.use(bodyParser.json());//使用该中间件 可以解析json格式的参数

// 请求信息logger显示 
let lastReqTime = Date.now();
let visitNum = 0;
$app.use('/', (req, res, next) => {
    visitNum++;
    // $logger.log('有人来了,当前访问次数:', visitNum);
    // let url = "http://" + $conf._ip + ":" + $conf.port;
    // if (visitNum > 3) return;// 模拟错误用
    let now = Date.now();
    let delta = now - lastReqTime;
    lastReqTime = now;
    // $logger.log(delta);
    if (delta > 10000) {
        $logger.log("\n------------split line---------------");// 10s分隔线
    }
    // $logger.log(req);
    $logger.log(visitNum, $moment().format('LTS'), `[${req.method}]`, urlStr, req.url, req.body ? JSON.stringify(req.body) : "{}");
    next();
});


$app.use(Express.static($conf.staticPath));// 静态资源托管




$app.use("/api", routes);


/**
// 请求资源类型判断, 自带的静态资源托管，不需要我来搞 Express.static
$app.all('*', (req, res, next) => {
  //  'text/plain; charset=utf-8'
  // 'text/html; charset=utf-8'
  // 'Content-Type', 'image/jpeg'
  if (req.url.indexOf('.jpg') !== -1) {
    // $logger.log(req.url);
    res.header("Content-Type", "image/jpeg");
  } else if (req.url.indexOf('.html') !== -1) {
    res.header("Content-Type", "text/html; charset=utf-8");
  } else if (/\.(tgz|zip|tar\.gz)/.test(req.url)) {
    // $logger.log(req.url);
    // 直接下载
  } else {
    res.header("Content-Type", "$application/json;charset=utf-8");
  }
  next();
});
 */










// websocket server
let wss = require("nodejs-websocket");
// 执行websocket处理连接方法
wss.createServer(connection => {
    $logger.log('ws new connection...')
    //处理客户端发送过来的消息	
    connection.on("text", function (data) {
        $logger.log("接收到的客户端消息:" + data);
        connection.sendText("服务器端返回数据:" + data)

        //监听关闭
        connection.on("close", function (code, reason) {
            $logger.log("Connection closed")
        })
        //监听异常
        connection.on("error", () => {
            $logger.log('ws服务异常关闭...')
        })
    })
}).listen(3000);



