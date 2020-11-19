from django import forms
from .models import Costumer
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class FormUser(forms.Form):
    """
    docstring
    """
    class Meta:
        model = Costumer
        field = "__all__"
        exlude = ['profil', 'username', 'user']


class UserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'password1', 'password2', 'email']
