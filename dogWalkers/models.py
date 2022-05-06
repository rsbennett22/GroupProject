from django.db import models
from django_resized import ResizedImageField

class DogWalker(models.Model):
	name = models.CharField(max_length = 100)
	#usr_img = ResizedImageField(size=[500,500], upload_to = "usrImgs")
	email = models.EmailField(max_length = 100)
	postcode = models.CharField(max_length = 8)
	price = models.IntegerField()
	min_wt = models.IntegerField(default = 0)
	max_wt = models.IntegerField(default = 130)
	rating = models.IntegerField(default = 0)
	usr_info = models.TextField()
	avbl_from = models.DateField()
	avbl_to = models.DateField()
	has_avbl = models.BooleanField(default = False)
	acpt_pup = models.BooleanField()
	
	def __str__(self):
		return self.name