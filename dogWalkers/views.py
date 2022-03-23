from django.shortcuts import render
from .models import DogWalker

# Create your views here.
def home(request):
	return render(request, 'homepage/home.html', {})
	
def dogWalkers(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})

def dogTrainers(request):
	return render(request, 'dogTrainers/index.html', {})