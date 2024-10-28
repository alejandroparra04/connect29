from django.db import models
from django.contrib.auth.models import User


class Project(models.Model):
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    responsable = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.nombre


class Deliverable(models.Model):
    STATUS_CHOICES = (
        ('Pendiente', 'Pendiente'),
        ('Revisado', 'Revisado'),
        ('Aprobado', 'Aprobado'),
        ('Desaprobado', 'Desaprobado'),
    )

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pendiente')
    fecha_creacion = models.DateField(auto_now_add=True)
    codigo = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    categoria = models.CharField(
        max_length=2,
        choices=[('PM', 'Project Management'), ('SI', 'Software Implementation')])
    actividad = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre
