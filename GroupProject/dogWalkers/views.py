from django.shortcuts import render

# Create your views here.
def dogWalkersPage(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})
