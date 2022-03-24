from django.urls import path
from . import views

urlpatterns = [
	path('', views.home, name='home'),
	path('dogWalkers', views.dogWalkers, name="dogWalkers"),	
	path('dogTrainers', views.dogTrainers, name='dogTrainers'),
]
