from django.urls import path
from . import views

urlpatterns = [
	path('', views.dogWalkers, name='dogWalkers'),
	#path('..\..\..\homepage\home.html', views.dogWalkers, name='home'),
	#path('..\..\..\dogTrainers\index.html', views.dogWalkers, name='dogTrainers'),
	path('home/', views.home, name='home'),
]
