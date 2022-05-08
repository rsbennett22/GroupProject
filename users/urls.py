from django.urls import include, path
from django.conf.urls import url

from .views import UserListView
from . import views

urlpatterns = [
    path('', UserListView.as_view()),
    #path(r'^user/([0-9])$', views.user_detail),
    path('auth/', include('rest_auth.urls')),
    path('auth/register/', include('rest_auth.registration.urls')),
]