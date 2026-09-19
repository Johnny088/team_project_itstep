from rest_framework import generics
from .models import Topic, Comment
from .serializers import TopicSerializer, CommentSerializer


class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all().order_by("-updated_at")
    serializer_class = TopicSerializer


class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        comment = serializer.save()
        comment.topic.save()