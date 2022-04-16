const Express = require('express');
const $path = require('path');
const $fs = require('fs');
const app = new Express();

let visitNum = 0;

const conf = require("./config");
// console.log(conf.test);
// 172.22.91.1:5151?_t=1234
// app.listen(5151, "172.22.91.1", () => {
//   console.log('app is runing');
// });
const urlStr = "http://" + conf._ip + ":" + conf.port;
app.listen(conf.port, conf.ip, () => {
    // let url = "http://" + conf._ip + ":" + conf.port;
    console.log("app is run at \t\t\t" + urlStr);
    console.log("you can try load file:\t\t" + urlStr + "/test.txt");
    console.log("you can try request[get]:\t" + urlStr + "/api/test?a=1&b=2");
    console.log("you can try request[post]:\t" + urlStr + "/api/test/add", "data: {\"c\": 3}");
});

/**
 * @example http://127.0.0.1:5151/test.txt
 * @example http://127.0.0.1:5151/images/fun_dog.jpg
 * @example http://127.0.0.1:5151/audios/sigh.mp3
 * @example http://127.0.0.1:5151/videos/原神MMD.mp4
 * 
 * 
 * @example http://127.0.0.1:5151/remote-assets/project.manifest
 * @example http://127.0.0.1:5151/remote-assets/assets/internal/import/09/0967b326a.json
 */

// let path = $path.resolve('e:', 'pro_doc.eg', 'mis', '富士康定制客户端','测试');
// , '20210802', '测试.zip'

// 富士康定制客户端
// 172.22.91.1:5151/20210802/测试.zip
// 172.22.91.1:5151/20210804/测试.zip
// 172.22.91.1:5151/20210818/测试.zip
// 172.22.91.1:5151/20210823/测试.zip


// let path = $path.resolve('e:', 'pro_doc.eg', 'mis', '定制模块(如访客、会议室预约、印章管理)','访客系统','测试');
// let path = $path.join(conf.staticPath);
// 访客
// 172.22.91.1:5151/210903/测试.zip

// 允许跨域
app.all('*', (req, res, next) => {
    // res.header("Access-Control-Allow-Origin", "*");// error:he value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    // console.log(req);
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

/**
// 请求资源类型判断
app.all('*', (req, res, next) => {
  //  'text/plain; charset=utf-8'
  // 'text/html; charset=utf-8'
  // 'Content-Type', 'image/jpeg'
  if (req.url.indexOf('.jpg') !== -1) {
    // console.log(req.url);
    res.header("Content-Type", "image/jpeg");
  } else if (req.url.indexOf('.html') !== -1) {
    res.header("Content-Type", "text/html; charset=utf-8");
  } else if (/\.(tgz|zip|tar\.gz)/.test(req.url)) {
    // console.log(req.url);
    // 直接下载
  } else {
    res.header("Content-Type", "application/json;charset=utf-8");
  }
  next();
});
 */

let lastReqTime = Date.now();
app.use('/', (req, res, next) => {
    visitNum++;
    // console.log('有人来了,当前访问次数:', visitNum);
    // let url = "http://" + conf._ip + ":" + conf.port;
    let now = Date.now();
    let delta = now - lastReqTime;
    lastReqTime = now;
    // console.log(delta);
    if (delta > 10000) {
        console.log("\n------------split line---------------");// 10s分隔线
    }

    console.log(visitNum, urlStr, req.url);
    next();
});


// app.use(Express.static(path));
app.use(Express.static(conf.staticPath));// 静态资源托管

// 接口配置
const bodyParser = require('body-parser');
// 配置好,可以解析x-www-form-urlencoded的参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置好,可以解析json格式的参数
app.use(bodyParser.json());

const routes = require("./routes/index");
app.use("/api", routes);

// res.render方法使用要配置模板引擎
// app.set("views", "./views");  // 告诉服务模板文件放在哪个文件夹下
// app.set("view engine", "ejs");// 告诉服务是哪种模板语法


// websocket server
let wss = require("nodejs-websocket");
// 执行websocket处理连接方法
wss.createServer(connection => {
    console.log('ws new connection...')
    //处理客户端发送过来的消息	
    connection.on("text", function (data) {
        console.log("接收到的客户端消息:" + data);
        connection.sendText("服务器端返回数据:" + data)

        //监听关闭
        connection.on("close", function (code, reason) {
            console.log("Connection closed")
        })
        //监听异常
        connection.on("error", () => {
            console.log('ws服务异常关闭...')
        })
    })
}).listen(3000);



