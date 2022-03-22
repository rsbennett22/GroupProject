from django.shortcuts import render

# Create your views here.
def dogWalkers(request):
	return render(request, 'dogWalkers/dogWalkersPage.html', {})
