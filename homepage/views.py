from django.shortcuts import render

# Create your views here.
def home(request):
	return render(request, 'homepage/home.html', {})
	
def dogWalkers(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})

def dogTrainers(request):
	return render(request, 'dogTrainers/dogTrainers.html', {})
