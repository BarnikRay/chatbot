let json = null;
window.addEventListener('load', function () {
    $.ajax({
        type: 'json',
        url: '/static/json/queries.json',
        success: function (data) {
            json = data;
        }
    });
    var vm = new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        data: {messages: []},
        methods: {
            addMessage: function () {
                var message = {
                    "user": true,
                    "bot": false,
                    "text": 'Hey!'
                }
                this.messages.push(message);
                var message1 = {
                    "user": false,
                    "bot": true,
                    "text": 'Hello!'
                }
                this.messages.push(message1);
            }
        }
    });
});
