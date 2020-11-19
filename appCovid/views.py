from django.shortcuts import render, redirect
from django.views.generic import ListView
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User, Group
from django.contrib.auth.decorators import login_required, user_passes_test
# Create your views here.
from .models import Costumer
from .form import FormUser, UserForm


# Create your views here.

def index(request):
    """

    """
    context = {
    }
    return render(request, 'base.html', context)


def costumerListView(request):
    user = request.user
    print(user)
    form = FormUser()
    profil = Costumer.objects.filter(name=user)
    print(profil)
    if request.method == "POST":
        form = FormUser(request.POST, request.FILES, instance=user)
        if form.is_valid():
            form.save()

    context = {
        "profil": profil,
        'form': form,
    }
    return render(request, 'setting.html', context)


def logoutUser(request):
    logout(request)
    return redirect('appCovid:login')


def register(request):
    """
    docstring
    """
    form = UserForm()
    context = {
        "form": form
    }
    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            email = form.cleaned_data.get('email')
            phone = request.POST.get('phone')
            user = form.save()
            group = Group.objects.get(name='costomer')
            user.groups.add(group)
            Costumer.objects.create(
                user=user,
                name=username,
                email=email,
                phone=phone

            )
            return redirect('appCovid:login')
        else:
            form = UserForm()
            context = {"error": True,
                       "form": form
                       }
            return render(request, 'register.html', context)

    return render(request, 'register.html', context)


def loginUser(request):

    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('appCovid:index')
        else:

            return redirect("appCovid:login")

    return render(request, 'login.html')
