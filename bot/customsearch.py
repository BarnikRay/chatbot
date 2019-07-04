from googleapiclient.discovery import build
import os
import logging

API_KEY = os.environ['API_KEY']
CSE_ID = os.environ['CSE_ID']

logger=logging.getLogger('chatbot')


def fetchResponse(question):
    service = build("customsearch", "v1", developerKey=API_KEY)
    res = service.cse().list(
        q=question,
        cx=CSE_ID,
        num=5
    ).execute()
    res = res['items'][0]
    response = {'link': res['link'], 'title': res['title'], 'desc': res['snippet']}
    logger.info(question)
    logger.info(response)
    return response


if __name__ == '__main__':
    fetchResponse('who is the president of india')
