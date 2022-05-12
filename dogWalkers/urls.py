from django.conf.urls import url
from . import views


from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalker/create', views.dogWalker_create),
	url(r'^dogWalkers/([0-9])$', views.dogWalker_detail_pk),
	url(r'dogWalker/(?P<username>\w+)$', views.dogWalker_detail_username),
	url(r'^dogWalkers/filter$', views.dogWalkers_filter, name='avbl_from' and 'avbl_to' and 'weight' and 'price' and 'avail' and 'pup'),

]