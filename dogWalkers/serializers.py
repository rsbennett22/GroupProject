from rest_framework import serializers
from .models import DogWalker

class DogWalkerSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogWalker
		fields = ('username','name', 'email', 'postcode', 'price', 'rating', 'usr_info', 'avbl_from', 'avbl_to', 'is_avbl', 'min_weight', 'max_weight', 'acpt_pup', 'usr_img', 'pk')
