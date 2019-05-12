window.addEventListener('load', function () {
    var vm = new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        data: {welcome: {name: false}}
    });
});
