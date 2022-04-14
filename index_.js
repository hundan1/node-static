const Express = require('express');
const $path = require('path');
const $fs = require('fs');

const app = new Express();
// app.set("views", "./views"); // 告诉服务模板文件放在哪个文件夹下
// app.set("view engine", "ejs"); // 告诉服务是哪种模板语法

// 127.0.0.1:5151?_t=1234
app.listen(5151, "172.22.91.1", () => {
  console.log('app is runing');
});

// 注意浏览器地址栏是get请求 会有缓存 带个参数 _t=xxxx
// app.use('/', async (req, res) => {
//   let rv = null;
//   try {
//     // 响应渲染方法,返回一个解析好的html页面
//     // res.render('index',{a: 1,b: 2});
//     // res.send('hello');
//     // let rv = await test();
//     let rv = await readFile();
//     if (rv) {
//       console.log('rv:', rv);
//       console.log('rv.name:', rv.name);
//       res.statusCode = 200;
//       res.setHeader('Content-Type', 'application/zip');
//       // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
//       // attachment 以附件形式下载
//       res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(rv.name)}`);
//       // 返回数据
//       res.end(rv.buffer);
//     } else {
//       res.send('error');
//     }

//   } catch (err) {
//     console.log("error:", err);
//     console.log("rv:", rv);
//     res.send(err);
//   }
// });

// 有问题。。直接用静态资源托管
app.use('/download', async (req, res) => {
  let rv = null;
  try {
    // 流式读取
    let path = $path.resolve('e:', 'pro_doc.eg', 'mis', '富士康定制客户端', '20210802', '测试.zip');
    let file = null;

    let readStream = $fs.createReadStream(path, {
      encoding: 'utf8',
      // autoClose: true
    });
    //console.log(readStream);

    //读取文件发生错误事件
    readStream.on('error', (err) => {
      console.log('发生异常:', err);
    });
    //已打开要读取的文件事件
    // readStream.on('open', (fd) => {
    //   console.log('文件已打开:', fd);
    // });
    //文件已经就位，可用于读取事件
    // readStream.on('ready', () => {
    //   console.log('文件已准备好..');
    // });

    //文件读取中事件·····
    let arr=[];
    readStream.on('data', (chunk) => {
      // console.log('读取文件数据:', chunk);
      if (file) {
        file += chunk;
      } else {
        file = chunk;
      }
      // if(Buffer.isBuffer(chunk)){
      //   console.log(1);
      //   arr.push(chunk);
      // }else{
      //   console.log(0);
      //   arr.push(new Buffer(chunk));
      // }
      
    });

    //文件读取完成事件
    readStream.on('end', () => {
      // console.log('读取已完成..',file);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/zip');
      // Content-disposition 是 MIME 协议的扩展，MIME 协议指示 MIME 用户代理如何显示附加的文件
      // attachment 以附件形式下载
      res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent('测试.zip')}`);
      // 返回数据
      // file = Buffer.concat(arr).toString();
      res.end(file);
    });


  } catch (err) {
    console.log("error:", err);
    console.log("rv:", rv);
    res.send(err);
  }
});

async function readFile() {
  let result = null;
  try {
    let file = null;
    let path = $path.resolve('e:', 'pro_doc.eg', 'mis', '富士康定制客户端', '20210802', '测试.zip');
    // let file = $fs.readFileSync(path, 'utf-8');

    // 流式读取
    let readStream = $fs.createReadStream(path, {
      encoding: 'utf8',
      // autoClose: true
    });
    //console.log(readStream);

    //读取文件发生错误事件
    readStream.on('error', (err) => {
      console.log('发生异常:', err);
    });
    //已打开要读取的文件事件
    readStream.on('open', (fd) => {
      console.log('文件已打开:', fd);
    });
    //文件已经就位，可用于读取事件
    readStream.on('ready', () => {
      console.log('文件已准备好..');
    });

    //文件读取中事件·····
    readStream.on('data', (chunk) => {
      // console.log('读取文件数据:', chunk);
      file += chunk;
    });

    //文件读取完成事件
    readStream.on('end', () => {
      console.log('读取已完成..');
    });


    // await new Promise ((resolve,reject)=>{

    // }).then(res=>{

    // }).catch(err=>{
    //   throw err;
    // }); 

    //文件已关闭事件
    readStream.on('close', () => {
      console.log('文件已关闭！');
    });

    if (file) {
      console.log('read file success');
      // result = file;
      result = {
        name: '测试' + ".zip",
        // buffer: Buffer.from(file),
        buffer: file
      };
    }
  } catch (ex) {
    console.log('error:', ex)
  } finally {
    return result;
  }
}