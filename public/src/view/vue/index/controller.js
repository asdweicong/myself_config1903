Vue.filter('capitalize', function (value) {
    if (!value) return '';
    value = value.toString();
    console.log(value.charAt(0), value.slice(1));
    console.log(value.charAt(0), value.charAt(1));
    console.log(value.slice(0,5), value.slice(1));
    return value.charAt(0).toUpperCase() + value.slice(1)
});
var vm = new Vue({
    el: '#app',
    data: {
        message: 'hello Vue.js!'
    }
});

module.exports = vm;

