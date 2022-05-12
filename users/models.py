from django.contrib.auth.models import AbstractUser
from django.db import models
from dogWalkers.models import DogWalker

from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.core.mail import send_mail
from dogs4all.settings_local import *
import random
import string

class CustomUser(AbstractUser):
    createdDogWalkerProfile=models.BooleanField(default=False)
    account_verified = models.BooleanField(default=False)
    activation_code = models.CharField(default='0000000000', max_length=10)
    def __str__(self):
        return self.email

@receiver(user_signed_up, dispatch_uid="allauth_user_signed_up")
def user_signed_up_(request, user, **kwargs):
    #after creating dogWalker, send verification email with the code generated as body
    print(user) #email user used to signup

    #generate validation code
    #attach code to user
    #attach code to email and send email
    #on front-end check if code entered matches the one stored in the user

    activationCode = ''.join(random.SystemRandom().choice(string.ascii_letters + string.digits) for _ in range(10))

    account = CustomUser.objects.get(email=user)
    account.activation_code = activationCode
    account.save()

    print(activationCode)
    send_mail(
        subject="Verify your account",
        message="Enter this code on the on the verify page to verify your account!\n\n"+activationCode,
        from_email=EMAIL_HOST_USER,
        recipient_list=[user]
    )