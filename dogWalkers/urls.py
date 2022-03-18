
from django.contrib import admin
from django.urls import path, include # update this line
from dogWalkers.views import dogWalkersPage 


urlpatterns = [
	#path('DogWalkers/', views.dogWalkersPage, name='dogWalkersPage'),
	path('admin/', admin.site.urls),
    path('', dogWalkersPage.as_view()),
    path('api/v1/', include('api.urls')), # add this line
]
