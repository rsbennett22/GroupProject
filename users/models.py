from django.contrib.auth.models import AbstractUser
from django.db import models
from dogWalkers.models import DogWalker

class CustomUser(AbstractUser):
    createdDogWalkerProfile=models.BooleanField(default=False)
    def __str__(self):
        return self.email