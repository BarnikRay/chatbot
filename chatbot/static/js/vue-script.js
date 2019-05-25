window.addEventListener('load', function () {
    var vm = new Vue({
        delimiters: ['[[', ']]'],
        el: '#app',
        data: {
            messages: [],
            category: null,
            level: 0,
            subcategory: null,
            question: null,
            json: null,
            custom: false,
            changeLevel: ['Choose a different category', 'Choose a different subcategory', 'Choose a different question'],
            questionHeader: ['Choose a category', 'Choose a subcategory', 'Choose a question']
        },
        methods: {
            addMessage: function (isUser, isOptions, msg, isAnswer) {
                let path = [this.category, this.subcategory, this.question];
                if (isUser) {
                    let message = {
                        "user": true,
                        "bot": false,
                        "text": msg,
                        "options": false
                    };
                    this.messages.push(message);
                } else {
                    if (isAnswer) {
                        this.messages.push(msg);
                    } else if (isOptions) {
                        let message = [];
                        let jsonVal = this.json['categories'];
                        for (let i = 0; i < this.level; i++) {
                            jsonVal = jsonVal[path[i]];
                        }
                        for (keys in jsonVal) {
                            message.push(keys);
                        }
                        for (let i = 0; i < this.level; i++) {
                            message.push(this.changeLevel[i]);
                        }
                        message.push('Ask your own question');
                        let message1 = {
                            "user": false,
                            "bot": true,
                            "text": message,
                            "options": true
                        };
                        this.addMessage(false, false, this.questionHeader[this.level]);
                        this.messages.push(message1);
                    } else {
                        var message1 = {
                            "user": false,
                            "bot": true,
                            "text": msg,
                            "options": false
                        };
                        this.messages.push(message1);
                    }
                }
            },
            setCategory: function (category) {
                this.messages.pop();
                this.addMessage(true, false, category);
                switch (category) {
                    case this.changeLevel[0]:
                        this.level = 0;
                        this.addMessage(false, true);
                        return;
                    case this.changeLevel[1]:
                        this.level = 1;
                        this.addMessage(false, true);
                        return;
                    case this.changeLevel[2]:
                        this.level = 2;
                        this.addMessage(false, true);
                        return;
                }
                if (category !== 'Ask your own question') {
                    switch (this.level) {
                        case 0:
                            this.category = category;
                            break;
                        case 1:
                            this.subcategory = category;
                            break;
                        case 2:
                            this.getAnswer(null, category);
                            return;
                    }
                    this.level++;
                    // this.isOptions = true;
                } else {
                    this.custom = true;
                    return;
                }
                this.addMessage(false, true);
            },
            getAnswer: function (event, input) {
                this.custom = false;
                let question = {};
                if (event)
                    question['question'] = event.question.value;
                else
                    question['question'] = input;
                question = JSON.stringify(question);
                let csrftoken = $('[name=csrfmiddlewaretoken]').val();
                const init = {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': csrftoken
                    },
                    body: question
                };
                fetch('/bot/getAnswer/', init).then(data => data.json()).then(data => {
                    let answer = data;
                    console.log(answer['title']);
                    this.addMessage(false, false, "Here's what I got for you!");
                    let message = {
                        "user": false,
                        "bot": true,
                        "options": false,
                        "isAnswer": true,
                        "title": answer['title'],
                        "body": answer['desc'],
                        "link": answer['link']
                    };
                    this.addMessage(false, false, message, true);
                    this.addMessage(false, true);
                });
            }
        },
        created: function () {
            fetch('/static/json/queries.json').then(data => data.json()).then(data => {
                this.json = data;
                this.addMessage(false, false, 'Hey!');
                this.addMessage(false, true);
            });
        }
    });
});
