from django.shortcuts import render
from .models import DogWalker

# Create your views here.
def dogWalkers(request):
	#initialy order the users by their price
	walkers = DogWalker.objects.filter(name = 'Rafe')
	return render(request, 'dogWalkers/dogWalkersPage.html', {'walkers':walkers})
	
def home(request):
	return render(request, 'homepage/home.html', {})
	
def dogTrainers(request):
	return render(request, 'dogTrainers/dogTrainers.html', {})
