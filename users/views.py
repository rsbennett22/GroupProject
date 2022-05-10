from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from django.views.generic.edit import CreateView
from rest_framework.response import Response
from rest_framework import status
from django.views import View

from .models import CustomUser
from .serializers import UserSerializer

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.http.response import JsonResponse
from django.core.mail import send_mail
from dogs4all.settings_local import *
import random
import string

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

@api_view(['GET'])
def request_new_code(request):
    username=request.GET.get('username',"")
    account = CustomUser.objects.get(username=username)

    if request.method == 'GET':
        activationCode = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))

        user_serializer = UserSerializer(account)
        account.activation_code = activationCode
        account.save()
        
        print(activationCode)
        send_mail(
            subject="Verify your account",
            message="Enter this code on the on the verify page to verify your account!\n\n"+activationCode,
            from_email=EMAIL_HOST_USER,
            recipient_list=[RECIPIENT_ADDRESS]
        )   
        return JsonResponse(user_serializer.data)
    return JsonResponse(status=status.HTTP_400_BAD_REQUEST)


'''@api_view(['GET'])
def send_verification(request, pk):
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'User does not exist!'}, status=status.HTTP_404_NOT_FOUND)

    if(request.method == 'GET'):
        user_serializer = UserSerializer(user)
        activationCode = user_serializer.data.get('activation_code')
'''

'''@api_view(['GET', 'PUT', 'DELETE'])
def user_detail(request, pk):
    #find user by primary key (pk), the id
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return JsonResponse({'message': 'DogWalker does not exist!'}, status=status.HTTP_404_NOT_FOUND)

    #retrieve a single dogWalker
    if request.method == 'GET':
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data)

    #update a dogWalker
    elif request.method == 'PUT':
        user_data = JSONParser().parse(request)
        user_serializer = UserSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse(user_serializer.data)
        return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #delete a single dogWalker
    elif request.method == 'DELETE':
        user.delete()
        return JsonResponse({'message': 'DogWalker successfully deleted!'}, status=status.HTTP_204_NO_CONTENT)
'''