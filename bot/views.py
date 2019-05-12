from django.http import HttpResponse
from django.shortcuts import render
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
