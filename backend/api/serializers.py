from rest_framework import serializers
from .models import Topic, Comment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "topic", "content", "author_name", "image", "created_at"]
        read_only_fields = ["id", "created_at"]


class TopicSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = [
            "id",
            "title",
            "content",
            "author_name",
            "image",
            "created_at",
            "updated_at",
            "comments",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]