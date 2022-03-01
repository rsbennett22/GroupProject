from django.conf import settings
from django.db import models
from django.utils import timezone


class DogWalkerPost(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    distance = models.FloatField()
    experience = models.IntegerField()
    pricing = models.IntegerField()
    bio = models.TextField()
    rating = models.IntegerField()
    additional_info =  models.TextField()
    user_img = models.ImageField()

    def __str__(self):
        return self.name