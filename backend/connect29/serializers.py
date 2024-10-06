from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Project


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password"]


class ProjectSerializer(serializers.ModelSerializer):
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='responsable', required=False
    )

    responsable = serializers.CharField(source='responsable.username', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'responsable', 'responsable_id']
