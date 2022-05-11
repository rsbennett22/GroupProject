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
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes

@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def dogWalkers_list(request):

	#get all the dogWalkers
	if request.method == 'GET':
		dogWalkers = DogWalker.objects.all()
		dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
		return JsonResponse(dogWalker_serializer.data, safe=False)

	'''#delete all dogWalkers
	elif  request.method == 'DELETE':
		count = DogWalker.objects.all().delete()
		return JsonResponse({'message':'{} DogWalkers were deleted successfully!'.format(count[0])}, status=status.HTTP_204_NO_CONTENT)'''

@api_view(['POST'])
def dogWalker_create(request):
#create a new dogWalker
	if request.method == 'POST':
		dogWalker_data = JSONParser().parse(request)
		dogWalker_serializer = DogWalkerSerializer(data = dogWalker_data)
		if dogWalker_serializer.is_valid():
			dogWalker_serializer.save()
			return JsonResponse(dogWalker_serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def dogWalker_detail_pk(request, pk):
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

@api_view(['GET', 'PUT', 'DELETE'])
def dogWalker_detail_username(request, username):
	#find dogWalker by email, the id
	try:
		dogWalker = DogWalker.objects.get(username=username)
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