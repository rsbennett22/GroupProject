from django.urls import path
from . import views

urlpatterns = [
	path('', views.dogWalkers, name='dogWalkers'),
	path('..\..\..\homepage\home.html', views.home, name='home'),
	path('..\..\..\dogTrainers\index.html', views.dogTrainers, name='dogTrainers'),
]
