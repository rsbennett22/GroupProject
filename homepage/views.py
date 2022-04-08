from django.shortcuts import render
from django.views.generic import View
from django.conf import settings
from django.http import HttpResponse
import logging
import os

class Homepage(View):
	def get(self, request):
		print(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'))
		try:
			with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
				return HttpResponse(f.read())
		except FileNotFoundError:
			logging.exception('Production build of app does not exist')
			return HttpResponse('This URL is only used when you have built the app! Do npm run build and reload!', status=501)