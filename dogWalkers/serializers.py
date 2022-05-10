from rest_framework import serializers
from .models import DogWalker

class DogWalkerSerializer(serializers.ModelSerializer):
	class Meta:
		model = DogWalker
		fields = ('username','pk','name', 'base64_img', 'email', 'postcode', 'price', 'rating', 'usr_info','is_available', 'min_weight', 'max_weight', 'acpt_pup', 'activation_code')
