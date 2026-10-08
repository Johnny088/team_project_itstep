from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User

from .models import Topic, Comment
from .serializers import (
    TopicSerializer,
    CommentSerializer,
    RegisterSerializer,
)


class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all().order_by("-updated_at")
    serializer_class = TopicSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(author=user, author_name=user.username)
        else:
            serializer.save(author=None)


class TopicDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class CommentListCreateView(generics.ListCreateAPIView):
    queryset = Comment.objects.all().order_by("created_at")
    serializer_class = CommentSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            comment = serializer.save(author=user, author_name=user.username)
        else:
            comment = serializer.save(author=None)
        comment.topic.save()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "id": request.user.id,
            "username": request.user.username,
            "email": request.user.email,
        })


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response(
                {"detail": "Refresh token is required."},
                status=400,
            )

        token = RefreshToken(refresh_token)
        token.blacklist()

        return Response(
            {"detail": "Successfully logged out."},
            status=200,
        )
