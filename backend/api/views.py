from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .permissions import IsAuthorOrAdminOrReadOnly, get_role
from .pagination import TopicPagination

from django.contrib.auth.models import User

from .cookies import (
    REFRESH_COOKIE,
    delete_auth_cookies,
    set_auth_cookies,
)

from .models import Topic, Comment
from .serializers import (
    TopicSerializer,
    CommentSerializer,
    RegisterSerializer,
    LoginSerializer,
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
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE)

        if refresh_token:
            try:
                RefreshToken(refresh_token).blacklist()
            except TokenError:
                pass

        response = Response({"detail": "Successfully logged out."}, status=200)
        delete_auth_cookies(response)
        return response


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        if response.status_code == 200:
            set_auth_cookies(
                response,
                access=response.data["access"],
                refresh=response.data["refresh"],
            )
            response.data = {"detail": "Successfully logged in."}

        return response


class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get(REFRESH_COOKIE)

        if not refresh_token:
            return Response({"detail": "Refresh cookie is missing."}, status=401)

        serializer = self.get_serializer(data={"refresh": refresh_token})
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as error:
            raise InvalidToken(error.args[0])

        data = serializer.validated_data
        response = Response({"detail": "Token refreshed."}, status=200)
        set_auth_cookies(
            response,
            access=data["access"],
            refresh=data.get("refresh"),
        )
        return response
