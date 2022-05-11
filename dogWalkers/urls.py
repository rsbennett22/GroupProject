from django.conf.urls import url
from . import views


from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
	url(r'^dogWalkers$', views.dogWalkers_list),
	url(r'^dogWalkers/([0-9])$', views.dogWalkers_detail),
	url(r'^dogWalkers/filter$', views.dogWalkers_filter, name='avbl_from' and 'avbl_to' and 'weight' and 'price' and 'avail' and 'pup'),

]

urlpatterns += static(settings.MEDIA_URL,document_root = settings.MEDIA_ROOT)