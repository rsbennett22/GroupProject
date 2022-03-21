from django.urls import path
from . import views

urlpatterns = [
	path('DogWalkers/', views.dogWalkersPage, name='dogWalkersPage'),
]
