from django import views
from django.urls import path
from . import views

urlpatterns = [
    path('pitagoras', views.pitagoras),
    path('', views.index)
]