from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status 
from .models import DogWalker
from .serializers import DogWalkerSerializer
from rest_framework.decorators import api_view
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse
import logging
import os

@api_view(['GET', 'POST', 'DELETE'])
def dogWalkers_list(request):

    #get all the dogWalkers
    if request.method == 'GET':
        dogWalkers = DogWalker.objects.all()
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

    #create a new dogWalker
    elif request.method == 'POST':
        dogWalker_data = JSONParser().parse(request)
        dogWalker_serializer = DogWalkerSerializer(data = dogWalker_data)
        if dogWalker_serializer.is_valid():
            dogWalker_serializer.save()
            return JsonResponse(dogWalker_serializer.data, status=status.HTTP_201_CREATED)

    #delete all dogWalkers
    elif  request.method == 'DELETE':
        count = DogWalker.objects.all().delete()
        return JsonResponse({'message':'{} DogWalkers were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def dogWalkers_detail(request, pk):
    #find dogWalker by primary key (pk), the id
    try:
        dogWalker = DogWalker.objects.get(pk=pk)
    except DogWalker.DoesNotExist:
        return JsonResponse({'message': 'DogWalker does not exist!'}, status=status.HTTP_404_NOT_FOUND)

    #retrieve a single dogWalker
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalker)
        return JsonResponse(dogWalker_serializer.data)

    #update a dogWalker
    elif request.method == 'PUT':
        dogWalker_data = JSONParser().parse(request)
        dogWalker_serializer = DogWalkerSerializer(dogWalker, data=dogWalker_data)
        if dogWalker_serializer.is_valid():
            dogWalker_serializer.save()
            return JsonResponse(dogWalker_serializer.data)
        return JsonResponse(dogWalker_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #delete a single dogWalker
    elif request.method == 'DELETE':
        dogWalker.delete()
        return JsonResponse({'message': 'DogWalker successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def dogWalkers_acpt_pup(request):
    dogWalkers = DogWalker.objects.filter(acpt_pup=True)

    #get a dogWalkers that accept puppies
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False) 


@api_view(['GET'])
def dogWalkers_avbl_morn(request):
    dogWalkers = DogWalker.objects.filter(avbl_morn=True) 

    #get a dogWalkers that accept morning walks
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_avbl_morn(request):
    dogWalkers = DogWalker.objects.filter(avbl_morn=True) 

    #get a dogWalkers that accept morning walks
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_avbl_aftn(request):
    dogWalkers = DogWalker.objects.filter(avbl_aftn=True) 

    #get a dogWalkers that accept afternoon walks
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_avbl_eve(request):
    dogWalkers = DogWalker.objects.filter(avbl_eve=True) 

    #get a dogWalkers that accept evening walks
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_acpt_7k(request):
    dogWalkers = DogWalker.objects.filter(acpt_7k=True) 

    #get a dogWalkers that accept dogs below 7kg 
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_acpt_18k(request):
    dogWalkers = DogWalker.objects.filter(acpt_18k=True) 

    #get a dogWalkers that accept dogs below 18kg
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_acpt_45k(request):
    dogWalkers = DogWalker.objects.filter(acpt_45k=True) 

    #get a dogWalkers that accept accept dogs below 45kg
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)

@api_view(['GET'])
def dogWalkers_acpt_abv_45k(request):
    dogWalkers = DogWalker.objects.filter(acpt_abv_45k=True) 

    #get a dogWalkers that accept dogs above 45k 
    if request.method == 'GET':
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)



@api_view(['GET'])
def dogWalkers_price(request):
    if request.method == "GET":
        dogWalkers=DogWalker.objects.all()
        value = request.query_params.get('price', None)
        if value is not None:
            dogWalkers=dogWalkers.filter(price__lte=value)
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)
    #This method gets the slider value from the url (line 152) and then uses this in the filtering logic



@api_view(['GET'])
def dogWalkers_date_range(request):
    if request.method == "GET":
        dogWalkers=DogWalker.objects.all()
        startDate = request.query_params.get('avbl_from', None)
        endDate = request.query_params.get('avbl_to', None)
        if startDate and endDate is not None:
            dogWalkers=(dogWalkers.filter(avbl_from__gte=startDate, avbl_from__lte=endDate))or (dogWalkers.filter(avbl_to__gte=startDate, avbl_to__lte=endDate))or (dogWalkers.filter(avbl_from__lte=startDate, avbl_to__gte=endDate)) 
        dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
        return JsonResponse(dogWalker_serializer.data, safe=False)
    #This method gets the start and end date selected from the datepicker from the url (line 165,166) and then uses this in the filtering logic
