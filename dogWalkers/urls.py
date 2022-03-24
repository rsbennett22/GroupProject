from django.urls import path, include
from . import views

urlpatterns = [
	path('', views.dogWalkers, name='dogWalkers'),
	path('home/', views.home, name='home'),
	path('dogTrainers/', views.dogTrainers, name='dogTrainers'),
]
