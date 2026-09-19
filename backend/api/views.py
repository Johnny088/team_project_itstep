from rest_framework import generics
from .models import Topic
from .serializers import TopicSerializer


class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all().order_by("-created_at")
    serializer_class = TopicSerializer


class TopicDetailView(generics.RetrieveAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
