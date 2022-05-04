from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser 
from rest_framework import status 
from .models import DogTraining
from .serializers import DogTrainingSerializer
from rest_framework.decorators import api_view
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse
import logging
import os
# import checkPrice from DogTraining.js

@api_view(['GET', 'POST', 'DELETE'])
def dogTraining_list(request):

    #get all the dogTraining
    if request.method == 'GET':
        dogTraining = DogTraining.objects.all()
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)

    #create a new dogTraining
    elif request.method == 'POST':
        dogTraining_data = JSONParser().parse(request)
        dogTraining_serializer = DogTrainingSerializer(data = dogTraining_data)
        if dogTraining_serializer.is_valid():
            dogTraining_serializer.save()
            return JsonResponse(dogTraining_serializer.data, status=status.HTTP_201_CREATED)

    #delete all dogTraining
    elif  request.method == 'DELETE':
        count = DogTraining.objects.all().delete()
        return JsonResponse({'message':'{} DogTrainer were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def dogTraining_detail(request, pk):
    #find dogTraining by primary key (pk), the id
    try:
        dogTraining = DogTraining.objects.get(pk=pk)
    except DogTraining.DoesNotExist:
        return JsonResponse({'message': 'DogTrainer does not exist!'}, status=status.HTTP_404_NOT_FOUND)

    #retrieve a single dogTraining
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining)
        return JsonResponse(dogTraining_serializer.data)

    #update a dogTraining
    elif request.method == 'PUT':
        dogTraining_data = JSONParser().parse(request)
        dogTraining_serializer = DogTrainingSerializer(dogTraining, data=dogTraining_data)
        if dogTraining_serializer.is_valid():
            dogTraining_serializer.save()
            return JsonResponse(dogTraining_serializer.data)
        return JsonResponse(dogTraining_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #delete a single dogTraining
    elif request.method == 'DELETE':
        dogTraining.delete()
        return JsonResponse({'message': 'DogTrainer successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def dogTraining_acpt_Trainer(request):
    dogTraining = DogTraining.objects.filter(dogTraining_acpt_Trainer=True) 
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)

@api_view(['GET'])
def dogTraining_acpt_style(request):
    dogTraining = DogTraining.objects.filter(dogTraining_acpt_style=True) 
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)


@api_view(['GET'])
def dogTraining_acpt_7k(request):
    dogTraining = DogTraining.objects.filter(acpt_7k=True) 

    #get a dogTraining that accept dogs below 7kg 
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)

@api_view(['GET'])
def dogTraining_acpt_18k(request):
    dogTraining = DogTraining.objects.filter(acpt_18k=True) 

    #get a dogTraining that accept dogs below 18kg
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)

@api_view(['GET'])
def dogTraining_acpt_45k(request):
    dogTraining = DogTraining.objects.filter(acpt_45k=True) 

    #get a dogTraining that accept accept dogs below 45kg
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)

@api_view(['GET'])
def dogTraining_acpt_abv_45k(request):
    dogTraining = DogTraining.objects.filter(acpt_abv_45k=True) 

    #get a dogTraining that accept dogs above 45k 
    if request.method == 'GET':
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)



@api_view(['GET'])
def dogTraining_price(request):
    if request.method == "GET":
        dogTraining=DogTraining.objects.all()
        value = request.query_params.get('price', None)
        if value is not None:
            dogTraining=dogTraining.filter(price__lte=value)
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)
    #This method gets the slider value from the url (line 152) and then uses this in the filtering logic



@api_view(['GET'])
def dogTraining_date_range(request):
    if request.method == "GET":
        dogTraining=DogTraining.objects.all()
        startDate = request.query_params.get('avbl_from', None)
        endDate = request.query_params.get('avbl_to', None)
        if startDate and endDate is not None:
            dogTraining=(dogTraining.filter(avbl_from__gte=startDate, avbl_from__lte=endDate))or (dogTraining.filter(avbl_to__gte=startDate, avbl_to__lte=endDate))or (dogTraining.filter(avbl_from__lte=startDate, avbl_to__gte=endDate)) 
        dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
        return JsonResponse(dogTraining_serializer.data, safe=False)
    #This method gets the start and end date selected from the datepicker from the url (line 165,166) and then uses this in the filtering logic
