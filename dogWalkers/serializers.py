from rest_framework import serializers
from .models import DogWalker

class DogWalkerSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogWalker
		fields = ('name', 'email', 'postcode', 'price', 'rating', 'usr_info', 'avbl_from', 'avbl_to', 'avbl_morn', 'avbl_aftn', 'avbl_eve', 'acpt_7k', 'acpt_18k', 'acpt_45k', 'acpt_abv_45k', 'acpt_pup')
