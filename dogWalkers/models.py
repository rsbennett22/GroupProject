from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class DogWalker(models.Model):
	username = models.CharField(max_length=100)
	name = models.CharField(max_length = 100)
	usr_img = models.ImageField(null=True,blank=True)
	email = models.EmailField(max_length = 100)
	postcode = models.CharField(max_length = 8)
	price = models.IntegerField()
	min_weight = models.IntegerField(default = 0)
	max_weight = models.IntegerField(default = 0)
	rating = models.FloatField(default = 0,validators=[MaxValueValidator(5),MinValueValidator(0)])
	usr_info = models.TextField()
	avbl_from = models.DateField()
	avbl_to = models.DateField()
	is_avbl = models.BooleanField(default = False)
	acpt_pup = models.BooleanField()
	
	def __str__(self):
		return self.name