from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^dogTraining$', views.dogTraining_list),
	url(r'^dogTraining/([0-9])$', views.dogTraining_detail),
	url(r'^dogTraining/acpt_Trainer$', views.dogTraining_acpt_pup),
	url(r'^dogTraining/acpt_7k$', views.dogTraining_acpt_7k),
	url(r'^dogTraining/acpt_18k$', views.dogTraining_acpt_18k),
	url(r'^dogTraining/acpt_45k$', views.dogTraining_acpt_45k),
	url(r'^dogTraining/acpt_abv_45k$', views.dogTraining_acpt_abv_45k),
	url(r'^dogTraining/price$', views.dogTraining_price, name='price'),


]