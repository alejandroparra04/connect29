from .views import EmailLoginTokenView, UserList, UserDetail, ProjectList, ProjectDetail
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('api-token-auth/', obtain_auth_token),
    path("users/", UserList.as_view(), name="users"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user"),
    path("projects/", ProjectList.as_view(), name="projects"),
    path("projects/<int:pk>/", ProjectDetail.as_view(), name="project"),
    path("login", EmailLoginTokenView.as_view(), name="obtain_auth_token"),
]
