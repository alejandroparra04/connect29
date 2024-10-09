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


# class Process(models.Model):
#     CATEGORIES_CHOICES = (
#         ('PM', 'Project Management'),
#         ('SI', 'Software Implementation'),
#     )
#
#     nombre = models.CharField(max_length=200)
#     project = models.ForeignKey(Project, on_delete=models.CASCADE)
#     categoria = models.CharField(max_length=2, choices=CATEGORIES_CHOICES)
#
#     def __str__(self):
#         return self.nombre


class Deliverable(models.Model):
    STATUS_CHOICES = (
        ('P', 'Pendiente'),
        ('R', 'Revisado'),
        ('A', 'Aprobado'),
        ('D', 'Desaprobado'),
    )

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField()
    estado = models.CharField(max_length=1, choices=STATUS_CHOICES, default='P')
    fecha_creacion = models.DateField(auto_now_add=True)

    proyecto = models.ForeignKey(Project, on_delete=models.CASCADE)
    categoria = models.CharField(
        max_length=2,
        choices=[('PM', 'Project Management'), ('SI', 'Software Implementation')])
    actividad = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre
