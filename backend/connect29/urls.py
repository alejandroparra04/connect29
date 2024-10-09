from .views import (
    EmailLoginTokenView, UserList, UserDetail, ProjectList, ProjectDetail, DeliverableList, ActivityList
)
from django.urls import path


urlpatterns = [
    path("users/", UserList.as_view(), name="users"),
    path("users/<int:pk>/", UserDetail.as_view(), name="user"),
    path("projects/", ProjectList.as_view(), name="projects"),
    path("projects/<int:pk>/", ProjectDetail.as_view(), name="project"),
    path("activities/<str:category>/", ActivityList.as_view(), name="Activities"),
    path("deliverables/<int:project_id>/<str:category>/", DeliverableList.as_view(), name="deliverables"),
    path("login", EmailLoginTokenView.as_view(), name="obtain_auth_token"),
]
