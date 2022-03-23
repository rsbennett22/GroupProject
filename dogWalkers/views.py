from django.shortcuts import render

# Create your views here.
def dogWalkers(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})
	
def home(request):
	return render(request, 'homepage/home.html', {})
