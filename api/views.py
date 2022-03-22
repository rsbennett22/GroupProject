from rest_framework import generics

from dogWalkers import models
from api.serializers import DogWalkerSerializer

class ListWalkers(generics.ListCreateAPIView):
    queryset = models.DogWalker.objects.all()
    serializer_class = DogWalkerSerializer
    filterset_fields = ['name', 'acpt_pup']


class DetailWalkers(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.DogWalker.objects.all()
    serializer_class = DogWalkerSerializer
