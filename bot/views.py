from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from .customsearch import fetchResponse
import json

NAME = ''


def index(request):
    return render(request, 'chat.html')


def setname(request):
    global NAME
    data = json.loads(request.read())
    NAME = data['name'].upper()
    return HttpResponse(status=200)


def chat(request):
    context = {'name': NAME}
    return render(request, 'main.html', context)


def answer(request):
    data = json.loads(request.read())
    answer = fetchResponse(data['question'])
    return JsonResponse(answer)


def createLog(request):
    global NAME
    data = json.loads(request.read())
    content = ''
    for items in data:
        if items['user']:
            content += NAME + ' : ' + (items['text']) + '\n'
        elif not items['options']:
            if not items['isAnswer']:
                content += 'BOT : ' + str(items['text']) + '\n'
            else:
                content += 'BOT : ' + str(items['title']) + '\n'
                content += 'BOT : ' + str(items['body']) + '\n'
                content += 'BOT : ' + str(items['link']) + '\n'
    filename = NAME + '-chat.txt'
    response = HttpResponse(content, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(filename)
    return response


def thankyou(request):
    context = {'name': NAME}
    return render(request, 'thankyou.html', context)
