from rest_framework import generics
import django_filters
from dogWalkers import models
from api.serializers import DogWalkerSerializer


class ListWalkers(generics.ListCreateAPIView):
    queryset = models.DogWalker.objects.all()
    serializer_class = DogWalkerSerializer
    filterset_fields = ['avbl_morn', 'avbl_aftn', 'avbl_eve', 'acpt_7k', 'acpt_18k', 'acpt_45k', 'acpt_abv_45k', 'acpt_pup', 'price', 'avbl_from', 'avbl_to'] 




class DetailWalkers(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.DogWalker.objects.all()
    serializer_class = DogWalkerSerializer
