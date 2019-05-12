from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('main/', views.chat, name='chat'),
    path('name/', views.setname, name='setname')
]
