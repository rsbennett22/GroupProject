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
from django.db.models import Q
import json


startDate = None
endDate = None
weight = None
price = None

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



startDate = None
endDate = None
weight = None
price = None
avail = None
pup = None

@api_view(['GET'])
def dogWalkers_filter(request):
	if request.method == "GET":
		global startDate
		global endDate
		global weight
		global price
		global avail
		global pup
		dogWalkers=DogWalker.objects.all()
		startDateCheck = request.query_params.get('avbl_from', None)
		endDateCheck = request.query_params.get('avbl_to', None)
		weightCheck = request.query_params.get('weight', None)
		priceCheck = request.query_params.get('price', None)
		availCheck = request.query_params.get('avail', None)
		pupCheck = request.query_params.get('pup', None)
		if startDateCheck and endDateCheck and weightCheck and priceCheck and availCheck and pupCheck == 'null':  #This check is done when the 'reset filters' button is pressed 
			price = None
			startDate = None
			endDate = None
			weight = None
			avail = None
			pup = None
		else:  #The if statements below are used so the global variables aren't changed to 'None' each time a filter is changed on the front end 
			if priceCheck is not None:
				price = priceCheck
			if startDateCheck is not None:
				startDate = startDateCheck
			if endDateCheck is not None:
				endDate = endDateCheck
			if weightCheck is not None:
				weight = weightCheck
			if availCheck is not None:
				avail = availCheck
			if pupCheck is not None:
				pup = pupCheck
		#Below are the data base queries 
		cri1 = Q(min_wt__lte=weight)
		cri2 = Q(max_wt__gte=weight)
		cri3 = Q(price__lte=price)
		cri4 = Q(avbl_from__gte=startDate)
		cri5 = Q(avbl_from__lte=endDate)
		cri6 = Q(avbl_to__gte=startDate)
		cri7 = Q(avbl_to__lte=endDate)
		cri8 = Q(avbl_from__lte=startDate)
		cri9 = Q(avbl_to__gte=endDate)
		cri10 = Q(has_avbl=True)
		cri11 = Q(acpt_pup=True)
		print(price)
		print(weight)
		print(startDate)
		print(endDate)
		print ("avail- ", avail)
		print("pup- ", pup)
		if (avail == 'true') and (pup == 'true'):
			print("enetered true pup and true avail statement")
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11 & cri10)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri11 & cri10)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11 & cri10)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)) & cri11 & cri10)
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri11 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			else:
				 dogWalkers=dogWalkers.filter(cri11 & cri10)
		if (pup == 'false') and (avail == 'true'):
			print("entered false accept_pup and true avail statement")
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri10)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri10)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri10)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 &  cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			else:
				dogWalkers=dogWalkers.filter(cri10)
		if (pup == 'true') and (avail == 'false'):
			print("entered false accept_pup and true avail statement")
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri11)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 &  cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			else:
				dogWalkers=dogWalkers.filter(cri11)
		if (pup == 'true') and (avail is None):
			print("entered true accept_pup and None avail statement")
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri11)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri11)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 &  cri11 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			else:
				dogWalkers=dogWalkers.filter(cri11)
		if (pup is None) and (avail == 'true'):
			print("entered none accept_pup and true avail statement")
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & cri10)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri10)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri10)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 &  cri10 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			else:
				dogWalkers=dogWalkers.filter(cri10)
		else:
			if weight and startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if weight and price is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & cri3)
			if weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2)
			if price is not None:
				dogWalkers=dogWalkers.filter(cri3)
			if startDate and endDate and price is not None:
				dogWalkers=dogWalkers.filter(cri3 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate is not None:
				dogWalkers=dogWalkers.filter(((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
			if startDate and endDate and weight is not None:
				dogWalkers=dogWalkers.filter(cri1 & cri2 & ((cri4 & cri5) | (cri6 & cri7) | (cri8 & cri9)))
		dogWalker_serializer = DogWalkerSerializer(dogWalkers, many=True)
		return JsonResponse(dogWalker_serializer.data, safe=False)
 