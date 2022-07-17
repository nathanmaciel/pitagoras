import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
import math 

# Create your views here.

@api_view(['POST'])
def pitagoras(request):
    sides = json.loads(request.body)
    try:
        cat1 = float (sides['cat1'])
    except: 
        cat1 = 0
    
    try:
     cat2 = float (sides['cat2'])
    except: 
        cat2 = 0
        
    try:
        hip = float (sides['hip'])
    except:
        hip = 0
    
    if cat1 == 0:
        cat1 = round(math.sqrt(hip ** 2 - cat2 ** 2), 2)
    if cat2 == 0:
        cat2 = round(math.sqrt(hip ** 2 - cat1 ** 2), 2)
    if hip == 0:
        hip = round(math.sqrt(cat1 ** 2 + cat2 ** 2), 2)
    
    return JsonResponse({
        "cat1": cat1,
        "cat2": cat2,
        "hip": hip
    })


def index():
    return HttpResponse("It's working!")