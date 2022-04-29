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

@api_view(['GET', 'POST', 'DELETE'])
def dogTraining_list(request):

	#get all the dogTraining
	if request.method == 'GET':
		dogTraining = DogTraining.objects.all()
		dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
		return JsonResponse(dogTraining_serializer.data, safe=False)

	#create a new dogTrainer
	elif request.method == 'POST':
		dogTraining_data = JSONParser().parse(request)
		dogTraining_serializer = DogTrainingSerializer(data = dogTraining_data)
		if dogTraining_serializer.is_valid():
			dogTraining_serializer.save()
			return JsonResponse(dogTraining_serializer.data, status=status.HTTP_201_CREATED)

	#delete all dogTrainer
	elif  request.method == 'DELETE':
		count = DogTraining.objects.all().delete()
		return JsonResponse({'message':'{} DogTraining were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def dogTraining_detail(request, pk):
	#find dogTrainer by primary key (pk), the id
	try:
		dogTraining = DogTraining.objects.get(pk=pk)
	except DogTraining.DoesNotExist:
		return JsonResponse({'message': 'DogTrainer does not exist!'}, status=status.HTTP_404_NOT_FOUND)

	#retrieve a single dogTrainer
	if request.method == 'GET':
		dogTraining_serializer = DogTrainingSerializer(dogTraining)
		return JsonResponse(dogTraining_serializer.data)

	#update a dogTrainer
	elif request.method == 'PUT':
		dogTraining_data = JSONParser().parse(request)
		dogTraining_serializer = DogTrainingSerializer(dogTraining, data=dogTraining_data)
		if dogTraining_serializer.is_valid():
			dogTraining_serializer.save()
			return JsonResponse(dogTraining_serializer.data)
		return JsonResponse(dogTraining_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

	#delete a single dogTrainer
	elif request.method == 'DELETE':
		dogTraining.delete()
		return JsonResponse({'message': 'DogTrainer successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def dogTraining_acpt_pup(request):
	dogTraining = DogTraining.objects.filter(acpt_pup=True)

	#get a dogTrainer that accept puppies
	if request.method == 'GET':
		dogTraining_serializer = DogTrainingSerializer(dogTraining, many=True)
		return JsonResponse(dogTraining_serializer.data, safe=False)