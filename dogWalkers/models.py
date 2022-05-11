from django.db import models

class DogWalker(models.Model):
	username = models.CharField(max_length = 20)
	name = models.CharField(max_length = 100)
	usr_img = models.ImageField(upload_to = "usrImgs")
	email = models.EmailField(max_length = 100)
	postcode = models.CharField(max_length = 8)
	price = models.IntegerField()
	rating = models.IntegerField(default = 0)
	usr_info = models.TextField()
	is_available = models.BooleanField()
	min_weight = models.PositiveIntegerField()
	max_weight = models.PositiveIntegerField()
	acpt_pup = models.BooleanField()
	def __str__(self):
		return self.name