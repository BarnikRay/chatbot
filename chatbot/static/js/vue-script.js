let json = null;
window.addEventListener('load', function () {
    $.ajax({
        type: 'json',
        url: '/static/json/queries.json',
        success: function (data) {
            json = data;
            vm.addMessage(false, false, 'Hello!');
            vm.addMessage(false, true);
        }
    });
    var vm = new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        data: {
            messages: [],
            category: null,
            level: 0,
            subcategory: null,
            question: null,
        },
        methods: {
            addMessage: function (isUser, isOptions, message) {
                let path = [this.category, this.subcategory, this.question];
                if (isUser) {
                    let message = {
                        "user": true,
                        "bot": false,
                        "text": message,
                        "options": false
                    };
                    this.messages.push(message);
                } else {
                    if (isOptions) {
                        let message = [];
                        let jsonVal = json['categories'];
                        console.log(jsonVal);

                        for (let i = 0; i < this.level; i++) {
                            jsonVal = jsonVal[path[i]];
                        }
                        for (keys in jsonVal) {
                            message.push(keys);
                        }
                        let message1 = {
                            "user": false,
                            "bot": true,
                            "text": message,
                            "options": true
                        };
                        this.messages.push(message1);
                    } else {
                        var message1 = {
                            "user": false,
                            "bot": true,
                            "text": message,
                            "options": false
                        }
                        this.messages.push(message1);
                    }
                }
            },
            setCategory: function (category) {
                this.messages.pop();
                this.addMessage(true, false, category);
                if (category !== 'Others') {
                    switch (this.level) {
                        case 0:
                            this.category = category;
                            break;
                        case 1:
                            this.subcategory = category;
                            break;
                        case 2:
                            this.question = category;
                    }
                    this.level++;
                    // this.isOptions = true;
                } else {
                    this.level = 0;
                }
                this.addMessage(false, true);

            }
        },
        created: function () {
            // this.addMessage(false,true);
        }
    });
});
