var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

app.get("/process_redirect", function (req, res) {
    req.redirect("http://baidu.com");
    res.end();
});
app.get("/process_writeHead", function (req, res) {
    res.writeHead(301, {'Location': 'http://baidu.com'});
    res.end();
});
app.get("/process_get", function (req, res) {
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
    };
    console.log(response);
    res.end(JSON.stringify(response));
});
app.post("/process_post", function (req, res) {
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    };
    console.log(response);
    res.end(JSON.stringify(response));
});


module.exports = router;
