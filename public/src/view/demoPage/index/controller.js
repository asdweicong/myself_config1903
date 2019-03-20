var interfaces = require('../../../config/interfaces');

var vm = avalon.define({
    $id: "vm",
    detail:'154543534',
    process_post: function () {
        var process_post_data = {
            first_name: 'first_name',
            last_name: 'last_name',
        };
        interfaces.post('process_post', process_post_data);
    },
    process_get: function () {
        var process_post_data = {
            first_name: 'first_name',
            last_name: 'last_name',
        };
        interfaces.get('process_get', process_post_data);
    }
});
vm.process_get();
vm.process_post();

module.exports = vm;

