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
