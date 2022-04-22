const express = require('express');
const router = express.Router();
const $fs = require('fs');
const $path = require('path');
// let indexRouter = {};

// router.get('/', async (ctx, next) => {
//   //let rv = await $knexPool.select('index', 'permission', 'description', 'logicdel', 'logicdeltime').from('permission').limit(10).offset(0);
//   ctx.response.body = '<h1>api/v1/index</h1>';
// });

let files = $fs.readdirSync(__dirname);
console.log("\nimport routes files start...");

let apisFilesCount = 0;
files.forEach(function (file) {
    if (!''.startsWith(file, '.') && file !== 'index.js' && file !== 'apidoc.json') {
        try {
            apisFilesCount++;
            console.log(apisFilesCount, file);
            // router.use('/' + file.replace('.js', ''), require('./' + file).router.routes());
            router.use('/' + file.replace('.js', ''), require('./' + file));
        } catch (ex) {
            console.error('路由加载错误[' + $path.join(__dirname, file) + ']：' + ex.stack);
        }
    }
});
console.log("import routes files end...\n");

module.exports = router;

// indexRouter.router = router;
// module.exports = indexRouter;
// router.use('/helloworld',  require('./helloworld.js').router.routes());
