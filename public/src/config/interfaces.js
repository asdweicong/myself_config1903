/**
 * Created by weicong on 19/3/18.
 */
var config = require('./config');
var $ = require('../lib/jquery')
var object = {
    post: function (interfaceName, data) {
        $.ajax({
            url: config.appHostURL + '/' + interfaceName,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function () {

            },
            error: function () {

            }
        })
    },
    get: function (interfaceName, data) {
        $.ajax({
            url: config.appHostURL + '/' + interfaceName,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function () {

            },
            error: function () {

            }
        })
    }
};

module.exports = object;
