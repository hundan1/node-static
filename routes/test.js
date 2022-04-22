const express = require('express')
const router = express.Router()
const $path = require("path");

router.get('/', (req, res) => {
    // $logger.log(req.query);

    res.send({
        msg: '[get]test/',
        data: req.query,
    });
});
router.get('/face', (req, res) => {
    // $logger.log(req.query);
    // $logger.log(__dirname);
    // $logger.log(__filename);
    res.setHeader("Content-Type", "image/jpeg");
    res.sendFile($path.resolve(__dirname, '..', "public/images/fun_dog.jpg"));
});

router.post('/add', (req, res) => {
    // $logger.log(req.body);
    res.send({
        msg: '[post]test/add',
        data: req.body,
    });
});
router.post('/set', (req, res) => {
    // $logger.log(req.body);
    res.send({
        msg: '[post]test/set',
        data: req.body,
    });
});
router.post('/del', (req, res) => {
    // $logger.log(req.body);
    res.send({
        msg: '[post]test/del',
        data: req.body,
    });
});

module.exports = router;