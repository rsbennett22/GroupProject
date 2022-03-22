# api/serializers.py
from rest_framework import serializers
from dogWalkers import models

class DogWalkerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'name',
            'usr_img',
            'email',
            'postcode',
            'price',
            'usr_info',
            'avbl_from',
            'avbl_to',
            'avbl_morn',
            'avbl_aftn',
            'avbl_eve',
            'acpt_7k',
            'acpt_18k',
            'acpt_45k',
            'acpt_abv_45k',
            'acpt_pup',

        )
        model = models.DogWalker