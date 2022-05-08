from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalkers/([0-9])$', views.dogWalkers_detail_pk),
	url(r'^dogWalkers/(?P<username>\w+)$', views.dogWalkers_detail_username),
	url(r'^dogWalkers/acpt_pup$', views.dogWalkers_acpt_pup),
]