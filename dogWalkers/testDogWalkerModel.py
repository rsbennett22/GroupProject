from django.test import TestCase
from dogWalkers.models import DogWalker
from datetime import date

class DogWalkersTestCase(TestCase):
	def setUp(self):
		DogWalker.objects.create(name="test_name", email="test@mail.com", postcode="test1234", price=10, usr_info="Test user info", avbl_from="2022-03-09", avbl_to="2022-04-09", avbl_morn=True, avbl_aftn=True, avbl_eve=True, acpt_7k=True, acpt_18k=True, acpt_45k=True, acpt_abv_45k=True, acpt_pup=True)
		
	def test_dog_walkers(self):
		testUser = DogWalker.objects.get(name="test_name")
		self.assertEqual(testUser.getName(), "test_name")
		self.assertEqual(testUser.getEmail(), "test@mail.com")
		self.assertEqual(testUser.getPostcode(), "test1234")
		self.assertEqual(testUser.getPrice(), 10)
		self.assertEqual(testUser.getUsrInfo(), "Test user info")
		self.assertEqual(testUser.get_Avbl_From(), date(2022,3,9))
		self.assertEqual(testUser.get_Avbl_To(), date(2022,4,9))
		self.assertEqual(testUser.get_Avbl_Morn(), True)
		self.assertEqual(testUser.get_Avbl_Aftn(), True)
		self.assertEqual(testUser.get_Avbl_Eve(), True)
		self.assertEqual(testUser.get_Acpt_7k(), True)
		self.assertEqual(testUser.get_Acpt_18k(), True)
		self.assertEqual(testUser.get_Acpt_45k(), True)
		self.assertEqual(testUser.get_Acpt_Abv_45k(), True)
		self.assertEqual(testUser.get_Acpt_Pup(), True)


#Blank DogWalker object		
#DogWalker.objects.create(name="", email="", postcode="", price=, usr_info="", avbl_from="", avbl_to="", avbl_morn=, avbl_aftn=, avbl_eve=, acpt_7k=, acpt_18k=, acpt_45k=, acpt_abv_45k=, acpt_pup=)
