from django.urls import path
from .views import index, loginUser, register, costumerListView, logoutUser

urlpatterns = [
    path("", index, name="index"),
    path("login/", loginUser, name="login"),
    path("register/", register, name="register"),
    path("logout/", logoutUser, name="logout"),
    path("acount/", costumerListView, name="setting")
]
