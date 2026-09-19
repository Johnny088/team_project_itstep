from django.urls import path
from .views import TopicListCreateView, TopicDetailView


urlpatterns = [
    path("topics/", TopicListCreateView.as_view(), name="topic-list-create"),
    path("topics/<int:pk>/", TopicDetailView.as_view(), name="topic-detail"),
]