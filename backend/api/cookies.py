from django.conf import settings

ACCESS_COOKIE = "access_token"
REFRESH_COOKIE = "refresh_token"

REFRESH_COOKIE_PATH = "/api/auth/"


def set_auth_cookies(response, access=None, refresh=None):
    max_age = int(settings.SIMPLE_JWT["REFRESH_TOKEN_LIFETIME"].total_seconds())
    common = {
        "max_age": max_age,
        "httponly": True,
        "secure": settings.AUTH_COOKIE_SECURE,
        "samesite": settings.AUTH_COOKIE_SAMESITE,
    }
    if access:
        response.set_cookie(ACCESS_COOKIE, access, path="/", **common)
    if refresh:
        response.set_cookie(REFRESH_COOKIE, refresh, path=REFRESH_COOKIE_PATH, **common)


def delete_auth_cookies(response):
    samesite = settings.AUTH_COOKIE_SAMESITE
    response.delete_cookie(ACCESS_COOKIE, path="/", samesite=samesite)
    response.delete_cookie(REFRESH_COOKIE, path=REFRESH_COOKIE_PATH, samesite=samesite)
