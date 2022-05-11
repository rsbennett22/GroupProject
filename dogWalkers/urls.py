from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalker/create', views.dogWalker_create),
	url(r'^dogWalker/([0-9])$', views.dogWalker_detail_pk),
	url(r'^dogWalker/(?P<username>\w+)$', views.dogWalker_detail_username),
	url(r'^dogWalkers/acpt_pup$', views.dogWalkers_acpt_pup),
]