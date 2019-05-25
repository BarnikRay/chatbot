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
