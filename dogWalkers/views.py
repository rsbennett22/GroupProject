from django.shortcuts import render
from django.views.generic.list import ListView
from dogWalkers.models import DogWalker

class dogWalkersPage(ListView):
	model = DogWalker


def dogWalkersPages(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})
