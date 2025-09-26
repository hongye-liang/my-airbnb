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
    path('create/', api.create_property, name='api_create_property'),
    path('<uuid:pk>/', api.properties_detail, name ='api_properties_detail'),
]