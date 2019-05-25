from django.http import HttpResponse
from django.http import JsonResponse
from django.shortcuts import render
from .customsearch import fetchResponse
import json


def index(request):
    if request.session.has_key('username'):
        return chat(request)
    return render(request, 'chat.html')


def setname(request):
    data = json.loads(request.read())
    request.session['username'] = data['name'].upper()
    return HttpResponse(status=200)


def chat(request):
    if request.session.has_key('username'):
        context = {'name': request.session['username']}
        return render(request, 'main.html', context)
    else:
        return index(request)


def answer(request):
    data = json.loads(request.read())
    answer = fetchResponse(data['question'])
    return JsonResponse(answer)


def createLog(request):
    name = request.session['username']
    data = json.loads(request.read())
    content = ''
    for items in data:
        if items['user']:
            content += name + ' : ' + (items['text']) + '\n'
        elif not items['options']:
            if not items['isAnswer']:
                content += 'BOT : ' + str(items['text']) + '\n'
            else:
                content += 'BOT : ' + str(items['title']) + '\n'
                content += 'BOT : ' + str(items['body']) + '\n'
                content += 'BOT : ' + str(items['link']) + '\n'
    filename = name + '-chat.txt'
    response = HttpResponse(content, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(filename)
    return response


def thankyou(request):
    try:
        context = {'name': request.session['username']}
        del request.session['username']
        return render(request, 'thankyou.html', context)
    except:
        return HttpResponse(
            """You are logged out. Please login to continue. 
            <a href='https://faq-bot-django.herokuapp.com'>Please login..</a>""")
