from rest_framework import serializers
from .models import DogWalker

class DogWalkerSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogWalker
		fields = ('username','pk','name', 'email', 'postcode', 'price', 'rating', 'usr_info','is_available', 'min_weight', 'max_weight', 'acpt_pup')
