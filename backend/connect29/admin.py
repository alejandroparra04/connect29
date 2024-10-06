from django.contrib import admin
from .models import Project


@admin.register(Project)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'responsable', 'fecha_inicio', 'fecha_fin')  # Mostrar estos campos en el panel de admin
