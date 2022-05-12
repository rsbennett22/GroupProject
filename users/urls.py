from django.urls import include, path
from django.conf.urls import url

from .views import UserListView
from . import views

urlpatterns = [
    path('resend-code/', views.request_new_code),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
    path('', UserListView.as_view()),
]