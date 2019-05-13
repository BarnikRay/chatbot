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
                    "text": 'yo yo'
                }
                this.messages.push(message);
                alert('yo');
                var message1 = {
                    "user": false,
                    "bot": true,
                    "text": 'yo yo'
                }
                this.messages.push(message1);
            }
        }
    });
});
