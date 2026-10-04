from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    TopicListCreateView,
    TopicDetailView,
    CommentListCreateView,
    RegisterView,
    MeView,
    LogoutView,
)




urlpatterns = [
    # Topics
    path("topics/", TopicListCreateView.as_view(), name="topic-list-create"),
    path("topics/<int:pk>/", TopicDetailView.as_view(), name="topic-detail"),

    # Comments
    path("comments/", CommentListCreateView.as_view(), name="comment-list-create"),

    # Authentication
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("auth/login/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("auth/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("auth/me/", MeView.as_view(), name="me"),
    path("auth/logout/", LogoutView.as_view(), name="logout"),

]
