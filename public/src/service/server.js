var express = require("express");
var app = express();

var bodyParser = require("body-parser");
var multer = require("multer");
app.use(bodyParser.urlencoded({extended: false}));

app.use(multer({dest: 'img/tmp'}).array('image'));

app.get("/api/process_redirect", function (req, res) {
    req.redirect("http://baidu.com");
    res.end();
});
app.get("/api/process_writeHead", function (req, res) {
    res.writeHead(301, {'Location': 'http://baidu.com'});
    res.end();
});
app.get("/api/process_get", function (req, res) {
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
    };
    console.log(response);
    // var url = require("url");
    // //params就是get方法携带的参数
    // var params = url.parse(req.url, true).query;
    res.end(JSON.stringify(response));
});
app.post("/api/process_post", function (req, res) {
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    console.log(response);
    // var postData = ""; 
    // // 数据块接收中
    // req.addListener("data", function (postDataChunk) {
    //     postData += postDataChunk;
    // });
    // // 数据接收完毕，执行回调函数
    // req.addListener("end", function () {
    //     var params = querystring.parse(postData);
    //     console.log(params);
    // });
    res.end(JSON.stringify(response));
});

var server = app.listen('3003', function () {
    // var address = require("os").networkInterfaces();
    // var host = address.en0[1].address;
    // var port = server.address().port;
    // console.log("引用实例，访问地址为 http://%s:%s", host, port);
    console.log("引用实例，访问地址为 http://%s:%s");
});
