/**
 * Created by weicong on 19/3/18.
 */
var config = require('./config');
var object = {
    post: function (interfaceName, data) {
        $.ajax({
            url: '',
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
            url: '',
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
