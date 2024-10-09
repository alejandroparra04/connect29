from django.contrib import admin
from .models import Project, Deliverable


@admin.register(Project)
class ProyectoAdmin(admin.ModelAdmin):
    list_display = (
    'nombre', 'descripcion', 'responsable', 'fecha_inicio', 'fecha_fin')  # Mostrar estos campos en el panel de admin


@admin.register(Deliverable)
class EntregableAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion', 'estado', 'fecha_creacion', 'actividad')
