from rest_framework import permissions

MODERATORS_GROUP = "moderators"


def is_moderator(user):
    if not user.is_authenticated:
        return False
    if user.is_staff or user.is_superuser:
        return True
    return user.groups.filter(name=MODERATORS_GROUP).exists()


def get_role(user):
    if user.is_superuser:
        return "admin"
    if is_moderator(user):
        return "moderator"
    return "user"


class IsAuthorOrAdminOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        user = request.user
        if not user.is_authenticated:
            return False

        if is_moderator(user):
            return True

        return obj.author_id is not None and obj.author_id == user.id
