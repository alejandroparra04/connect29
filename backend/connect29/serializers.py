from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Project, Deliverable


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password", "is_staff"]


class EditUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "password", "is_staff"]
        extra_kwargs = {
            'password': {'write_only': True, 'required': False}
        }

    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.is_staff = validated_data.get('is_staff', instance.is_staff)

        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance


class ProjectSerializer(serializers.ModelSerializer):
    responsable_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), source='responsable', required=False
    )

    responsable = serializers.CharField(source='responsable.email', read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'nombre', 'descripcion', 'fecha_inicio', 'fecha_fin', 'responsable', 'responsable_id']


class DeliverableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deliverable
        fields = ['id', 'nombre', 'descripcion', 'estado', 'fecha_creacion', 'codigo', 'project', 'categoria', 'actividad']
