from django.conf.urls import url
from . import views

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalkers/([0-9])$', views.dogWalkers_detail),
	url(r'^dogWalkers/acpt_pup$', views.dogWalkers_acpt_pup),
	url(r'^dogWalkers/avbl_morn$', views.dogWalkers_avbl_morn),
	url(r'^dogWalkers/avbl_aftn$', views.dogWalkers_avbl_aftn),
	url(r'^dogWalkers/avbl_eve$', views.dogWalkers_avbl_eve),
	url(r'^dogWalkers/acpt_7k$', views.dogWalkers_acpt_7k),
	url(r'^dogWalkers/acpt_18k$', views.dogWalkers_acpt_18k),
	url(r'^dogWalkers/acpt_45k$', views.dogWalkers_acpt_45k),
	url(r'^dogWalkers/acpt_abv_45k$', views.dogWalkers_acpt_abv_45k),
	url(r'^dogWalkers/price$', views.dogWalkers_price, name='price'),



]