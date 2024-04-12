from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(('api.urls','api'), namespace='api')),
    path('user/',include(('User.urls','User'),namespace='users')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)