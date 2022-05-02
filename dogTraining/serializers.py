from rest_framework import serializers
from .models import DogTraining

class DogTrainingSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogTraining
		fields = ('name', 'email', 'postcode', 'price', 'rating','usr_info', 'avbl_from', 'avbl_to', 'acpt_7k', 'acpt_18k', 'acpt_45k', 'acpt_abv_45k', 'acpt_Trainer')
