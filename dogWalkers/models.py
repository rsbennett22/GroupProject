from django.db import models
from django_resized import ResizedImageField
from django.conf import settings

# Create your models here.

class DogWalker(models.Model):
	name = models.CharField(max_length = 100)
	usr_img = ResizedImageField(size=[500,500], upload_to = 'usrImgs/')
	email = models.EmailField(max_length = 100)
	postcode = models.CharField(max_length = 8)
	price = models.IntegerField()
	usr_info = models.TextField()
	avbl_from = models.DateField()
	avbl_to = models.DateField()
	avbl_morn = models.BooleanField()
	avbl_aftn = models.BooleanField()
	avbl_eve = models.BooleanField()
	acpt_7k = models.BooleanField()
	acpt_18k = models.BooleanField()
	acpt_45k = models.BooleanField()
	acpt_abv_45k = models.BooleanField()
	acpt_pup = models.BooleanField()
	
	def createUser(self):
		self.save()
		
	def __str__(self):
		return self.name
		
	def getName(self):
		return self.name
		
	def getEmail(self):
		return self.email
		
	def getPostcode(self):
		return self.postcode
		
	def getPrice(self):
		return self.price
		
	def getUsrInfo(self):
		return self.usr_info
		
	def get_Avbl_From(self):
		return self.avbl_from
		
	def get_Avbl_To(self):
		return self.avbl_to
		
	def get_Avbl_Morn(self):
		return self.avbl_morn
		
	def get_Avbl_Aftn(self):
		return self.avbl_aftn
		
	def get_Avbl_Eve(self):
		return self.avbl_eve
		
	def get_Acpt_7k(self):
		return self.acpt_7k
		
	def get_Acpt_18k(self):
		return self.acpt_18k
		
	def get_Acpt_45k(self):
		return self.acpt_45k
		
	def get_Acpt_Abv_45k(self):
		return self.acpt_abv_45k
		
	def get_Acpt_Pup(self):
		return self.acpt_pup

	def __str__(self):
		return self.name
