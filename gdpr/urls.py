from django.urls import path, include
from . import views

urlpatterns = [
	path('', views.gdpr, name='gdpr'),
]
