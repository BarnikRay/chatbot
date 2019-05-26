# FAQ Bot built using Django and VueJS

For checking out the production version please visit our [FAQ Bot](https://faq-bot-django.herokuapp.com).

## Steps to set up the environment for running locally

You can run this bot locally by creating your own Google Custom Search Engine and test it with the same.

We assume that Python 3 and pip are installed and are accessible from path.  
If not please install [Python 3 and pip](https://www.python.org/downloads/) and then proceed to the steps below:  

- Downlaod the repository to your local machine.
- Run `pip install -r requirements.txt` in the root directory of the repository.
- Get your [Google API key](https://developers.google.com/custom-search/v1/introduction#identify_your_application_to_google_with_api_key) and set it to the `API_KEY` environment variable.
- Create a [Google Custom Search Engine](https://cse.google.co.in/cse/) and set the Custom Search Engine ID to the `CSE_ID` environment variable.
- Run `python manage.py runserver` to start the Django development server.
- Navigate to [localhost:8000](http://localhost:8000) and start chatting!

Note - If python is not linked to Python 3, `runserver` will throw an error.

## List of important files:

- chatbot
    - bot
        - customsearch.py
        - urls.py
        - views.py
        - ….
    - chatbot
        - static
            - css
                - utilities.css
            - js
                - vue-script.js
            - json
                - queries.json
            - …
        - settings.py
        - urls.py
        - …
    - templates
        - index.html
        - main.html
        - chat.html
        - thankyou.html
    - …
    - README.md
    - requirements.txt

