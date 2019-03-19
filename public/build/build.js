var path = require("path");
var config = require("./webpack.config");
var webpack = require("webpack");
config.output.path = path.join(__dirname, '../dist/');
module.exports = config;
