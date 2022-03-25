from django.shortcuts import render

# Create your views here.
def gdpr(request):
	return render(request, 'gdpr/gdpr.html', {})
