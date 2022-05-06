from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalkers/([0-9])$', views.dogWalkers_detail),
	url(r'^dogWalkers/acpt_pup$', views.dogWalkers_acpt_pup),
	url(r'^dogWalkers/has_avbl$', views.dogWalkers_has_avbl),
	url(r'^dogWalkers/filter$', views.dogWalkers_filter, name='avbl_from' and 'avbl_to' and 'weight' and 'price' and 'avail' and 'pup'),


]