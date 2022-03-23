# api/urls.py
from django.urls import path

from api.views import ListWalkers, DetailWalkers

urlpatterns = [
    path('dogWalkers/', ListWalkers.as_view()),
    path('dogWalkers/<int:pk>/', DetailWalkers.as_view()),
]