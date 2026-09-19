from rest_framework import serializers
from .models import Topic


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = [
            "id",
            "title",
            "content",
            "author_name",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]