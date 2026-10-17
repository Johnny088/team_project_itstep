from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken

from .permissions import IsAuthorOrAdminOrReadOnly, get_role
from .pagination import TopicPagination

from django.contrib.auth.models import User

from .models import Topic, Comment
from .serializers import (
    TopicSerializer,
    CommentSerializer,
    RegisterSerializer,
)

from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import LoginSerializer


class TopicListCreateView(generics.ListCreateAPIView):
    queryset = Topic.objects.all().order_by("-updated_at")
    serializer_class = TopicSerializer
    pagination_class = TopicPagination

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            serializer.save(author=user, author_name=user.username)
        else:
            serializer.save(author=None)


class TopicDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]


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


class CommentDeleteView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthorOrAdminOrReadOnly]


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
            "role": get_role(request.user)
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

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer