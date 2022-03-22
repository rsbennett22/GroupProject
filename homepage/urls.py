from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('..\..\..\dogWalkers\dogWalkersPage.html', views.dogWalkers, name='dogWalkers'),
	path('..\..\..\dogTrainers\index.html', views.dogTrainers, name='dogTrainers'),
]
