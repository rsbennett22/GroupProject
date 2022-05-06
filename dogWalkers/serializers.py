from rest_framework import serializers
from .models import DogWalker

class DogWalkerSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogWalker
		fields = ('name', 'email', 'postcode', 'price', 'rating', 'usr_info', 'avbl_from', 'avbl_to', 'has_avbl', 'min_wt', 'max_wt', 'acpt_pup')
