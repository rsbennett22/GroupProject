from django.db import models
from django_resized import ResizedImageField
from django.core.validators import MaxValueValidator, MinValueValidator


class DogWalker(models.Model):
	name = models.CharField(max_length = 100)
	#usr_img = ResizedImageField(size=[500,500], upload_to = "usrImgs")
	profile_pic = models.ImageField(null=True,blank=True)
	email = models.EmailField(max_length = 100)
	postcode = models.CharField(max_length = 8)
	price = models.IntegerField()
	min_wt = models.IntegerField(default = 0)
	max_wt = models.IntegerField(default = 130)
	rating = models.FloatField(default = 0,validators=[MaxValueValidator(5),MinValueValidator(0)])
	usr_info = models.TextField()
	avbl_from = models.DateField()
	avbl_to = models.DateField()
	has_avbl = models.BooleanField(default = False)
	acpt_pup = models.BooleanField()

	def save(self, *args, **kwargs):
		self.price = round(self.price,2)
		self.rating = round(self.rating,1)
		super(DogWalker, self).save(*args, **kwargs)
	
	def __str__(self):
		return self.name