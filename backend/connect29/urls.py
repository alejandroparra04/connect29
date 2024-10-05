from .views import UserList, UserDetail, EmailLoginTokenView
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path("users/", UserList.as_view(), name="users"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user"),
    path("login", EmailLoginTokenView.as_view(), name="obtain_auth_token"),
]
