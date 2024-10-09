from django.apps import AppConfig
from django.db.models.signals import post_migrate


class Connect29Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'connect29'
