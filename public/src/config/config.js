/**
 * Created by weicong on 19/3/18.
 */
var urlUtil = function (url) {
    var splitedUrl = url.split("?");
    var object = {};
    if (splitedUrl[1]) {
        var splitedParams = splitedUrl[1].split("&");
        for (var i = 0; i < splitedParams.length; i++) {
            var param = splitedParams[i].split("=");
            if (param[0]) {
                object[param[0]] = param[1];
            }
        }
    }
    return object;
};
var urlParams = urlUtil(window.location.href);

// var urlParams = window.urlParams

var object = {
    urlParams: urlParams,
    project: 'demoPage',
    appHostURL: 'http://192.168.199.149:3003',
    appHost: '192.168.199.149',

};

module.exports = object;
