from googleapiclient.discovery import build
import os

API_KEY = os.environ['API_KEY']
CSE_ID = os.environ['CSE_ID']


def main():
    service = build("customsearch", "v1", developerKey=API_KEY)
    res = service.cse().list(
        q='prime minister+india',
        cx=CSE_ID,
        num=5
    ).execute()
    res = res['items']
    print(res[0])


if __name__ == '__main__':
    main()
