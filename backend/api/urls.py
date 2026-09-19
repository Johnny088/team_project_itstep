from django.urls import path
from .views import (
    TopicListCreateView,
    TopicDetailView,
    CommentListCreateView,
)


urlpatterns = [
    path("topics/", TopicListCreateView.as_view(), name="topic-list-create"),
    path("topics/<int:pk>/", TopicDetailView.as_view(), name="topic-detail"),
    path("comments/", CommentListCreateView.as_view(), name="comment-list-create"),
]