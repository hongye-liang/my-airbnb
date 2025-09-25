# from django.contrib import admin
# from django.urls import path, include

# from . import api

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('api/properties/', include('property.urls')),
# ]

from django.urls import path

from . import api

urlpatterns = [
    path('', api.properties_list, name='api_properties_list'),
]