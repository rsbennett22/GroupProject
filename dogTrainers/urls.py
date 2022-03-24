from django.urls import path, include
from . import views

urlpatterns = [
	path('', views.dogTrainers, name='dogTrainers'),
	path('home/', views.home, name='home'),
	path('dogWalkers/', views.dogWalkers, name='dogWalkers'),
]
