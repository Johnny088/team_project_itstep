from rest_framework import serializers
from .models import Topic, Comment
from django.contrib.auth.models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["id", "topic", "content", "author", "author_name", "image", "created_at"]
        read_only_fields = ["id", "author", "created_at"]


class TopicSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = [
            "id",
            "title",
            "content",
            "author",
            "author_name",
            "image",
            "created_at",
            "updated_at",
            "comments",
        ]
        read_only_fields = ["id", "author", "created_at", "updated_at"]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        
        identifier = attrs.get("username")
        password = attrs.get("password")

        if identifier and password:
           
            if "@" in identifier:
                try:
                    user_obj = User.objects.get(email__iexact=identifier)
                   
                    attrs["username"] = user_obj.username
                except User.DoesNotExist:
                    raise serializers.ValidationError({"detail": "Користувача з такою поштою не знайдено."})

        return super().validate(attrs)