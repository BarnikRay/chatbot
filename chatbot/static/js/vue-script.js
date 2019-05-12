window.addEventListener('load', function () {
    $.ajax({
        type: 'json',
        url: '/static/json/queries.json',
        success: function (data) {
            var vm = new Vue({
                delimiters: ['[[', ']]'],
                el: '#app',
                data: {query: data}
            });
        }
    });
});
