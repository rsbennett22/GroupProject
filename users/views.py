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

class UserListView(ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]

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