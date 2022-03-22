from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('..\..\..\dogWalkers\dogWalkersPage.html', views.home, name='dogWalkers'),
	path('..\..\..\dogTrainers\index.html', views.home, name='dogTrainers'),
]
