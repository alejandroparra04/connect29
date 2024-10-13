import os
import re

from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from django.core.files.storage import default_storage
from django.http import JsonResponse, Http404, FileResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

from .constants import ACTIVIDADES_PM, ACTIVIDADES_SI
from .models import Project, Deliverable
from .serializers import UserSerializer, EditUserSerializer, ProjectSerializer, DeliverableSerializer

MSG_USER_NOT_FOUND = {"error": "Usuario no encontrado"}
MSG_PROJECT_NOT_FOUND = {"error": "Proyecto no encontrado"}
MSG_DELIVERABLE_NOT_FOUND = {"error": "Entregable no encontrado"}


# -------------------------------------------------------------
# ---                          LOGIN                        ---
# -------------------------------------------------------------

class EmailLoginTokenView(APIView):
    """
    Vista para iniciar sesión usando el email y obtener un token de autenticación.
    """

    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        try:
            user = User.objects.get(email=email)

            if check_password(password, user.password):
                token, _ = Token.objects.get_or_create(user=user)
                role = "admin" if user.is_staff else "user"
                return Response(
                    {"token": token.key, "role": role},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Contraseña incorrecta"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except User.DoesNotExist:
            return Response(
                {"error": "No se encontró un usuario con ese email"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# -------------------------------------------------------------
# ---                         USUARIOS                      ---
# -------------------------------------------------------------

class UserList(APIView):
    """
    Vista que maneja la lista de usuarios.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden crear usuarios")
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # user.is_staff = False
            user.set_password(request.data["password"])
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDetail(APIView):
    """
    Vista para obtener, actualizar o eliminar un usuario específico.
    Solo administradores pueden actualizar o eliminar.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            return None

    def get(self, request, pk):
        user = self.get_object(pk)
        if user is not None:
            serializer = UserSerializer(user)
            return Response(serializer.data)
        else:
            return Response(MSG_USER_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied(
                "Solo los administradores pueden actualizar usuarios."
            )

        user = self.get_object(pk)
        if user is not None:
            serializer = EditUserSerializer(user, data=request.data, partial=True)
            if serializer.is_valid():
                user = serializer.save()
                user.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(MSG_USER_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden eliminar usuarios.")

        user = self.get_object(pk)
        if user is not None:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(MSG_USER_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)


# -------------------------------------------------------------
# ---                        PROYECTOS                      ---
# -------------------------------------------------------------

class ProjectList(APIView):
    """
    Vista que maneja la lista de proyectos.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    def post(self, request):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden crear proyectos")
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(responsable=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectDetail(APIView):
    """
    Vista para obtener, actualizar o eliminar un proyecto específico.
    Solo administradores pueden actualizar o eliminar.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return None

    def get(self, request, pk):
        project = self.get_object(pk)
        if project is not None:
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        else:
            return Response(MSG_PROJECT_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied(
                "Solo los administradores pueden actualizar proyectos."
            )

        project = self.get_object(pk)
        if project is not None:
            responsable_id = request.data.get('responsable_id', None)
            if responsable_id:
                try:
                    responsable = User.objects.get(id=responsable_id)
                except User.DoesNotExist:
                    return Response(
                        {"error": "El usuario responsable no existe."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

            serializer = ProjectSerializer(project, data=request.data)
            if serializer.is_valid():
                if responsable_id:
                    serializer.validated_data['responsable'] = responsable
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(MSG_PROJECT_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden eliminar proyectos.")

        project = self.get_object(pk)
        if project is not None:
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(MSG_PROJECT_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)


# -------------------------------------------------------------
# ---                        ACTIVIDADES                    ---
# -------------------------------------------------------------
class ActivityList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, category):
        if category == 'PM':
            actividades = ACTIVIDADES_PM
        elif category == 'SI':
            actividades = ACTIVIDADES_SI
        else:
            return Response({"error": "Categoría inválida"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(actividades)


# -------------------------------------------------------------
# ---                        ENTREGABLES                    ---
# -------------------------------------------------------------

class DeliverableList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id, category):
        try:
            project = Project.objects.get(id=project_id)

            entregables = Deliverable.objects.filter(project=project, categoria=category)
            entregables_serializer = DeliverableSerializer(entregables, many=True)

            return Response(entregables_serializer.data)
        except Project.DoesNotExist:
            return Response(MSG_PROJECT_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, project_id, category):
        try:
            project = Project.objects.get(id=project_id)
            actividad = request.data.get('actividad')

            # Validar la actividad según la categoría
            if category == 'PM':
                if actividad not in ACTIVIDADES_PM:
                    return Response({"error": "Actividad inválida para PM"}, status=status.HTTP_400_BAD_REQUEST)
                actividad_index = ACTIVIDADES_PM.index(actividad) + 1
            elif category == 'SI':
                if actividad not in ACTIVIDADES_SI:
                    return Response({"error": "Actividad inválida para SI"}, status=status.HTTP_400_BAD_REQUEST)
                actividad_index = ACTIVIDADES_SI.index(actividad) + 1
            else:
                return Response({"error": "Categoría inválida"}, status=status.HTTP_400_BAD_REQUEST)

            entregables_existentes = Deliverable.objects.filter(
                project=project,
                categoria=category,
                actividad=actividad
            )

            if entregables_existentes.exists():
                ultimo_codigo = max([int(e.codigo[-1]) for e in entregables_existentes])
            else:
                ultimo_codigo = 0

            nuevo_codigo = f"PR{project_id}{category}{actividad_index}NUM{ultimo_codigo + 1}"

            request.data['codigo'] = nuevo_codigo

            serializer = DeliverableSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(
                    project=project,
                    categoria=category,
                    actividad=actividad,
                    codigo=nuevo_codigo
                )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Project.DoesNotExist:
            return Response(MSG_PROJECT_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)


class DeliverableDetail(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Deliverable.objects.get(pk=pk)
        except Deliverable.DoesNotExist:
            return None

    def get(self, request, pk):
        deliverable = self.get_object(pk)
        if deliverable is not None:
            serializer = DeliverableSerializer(deliverable)
            return Response(serializer.data)
        else:
            return Response(MSG_DELIVERABLE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, pk):
        deliverable = self.get_object(pk)
        if deliverable is not None:
            serializer = DeliverableSerializer(deliverable, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(MSG_DELIVERABLE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, pk):
        deliverable = self.get_object(pk)
        if deliverable is not None:
            deliverable.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(MSG_DELIVERABLE_NOT_FOUND, status=status.HTTP_404_NOT_FOUND)


class SubirArchivoView(APIView):
    """
    Vista protegida para la subida de archivos PDF relacionados con un entregable
    """
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def post(self, request):
        archivo = request.FILES.get('archivo')
        codigo_entregable = request.data.get('codigo_entregable')

        if not archivo or archivo.content_type != 'application/pdf':
            return Response({'error': 'Solo se permiten archivos PDF'}, status=status.HTTP_400_BAD_REQUEST)

        if not codigo_entregable:
            return Response({'error': 'Código de entregable no proporcionado'}, status=status.HTTP_400_BAD_REQUEST)

        ruta_archivo = os.path.join('', f'{codigo_entregable}.pdf')
        ruta_guardada = default_storage.save(ruta_archivo, archivo)

        file_url = default_storage.url(ruta_guardada)
        return Response({'file_url': file_url}, status=status.HTTP_201_CREATED)


class DescargarArchivoView(APIView):
    """
    Vista protegida para la descarga de archivos PDF relacionados con un entregable
    """
    permission_classes = [IsAuthenticated]

    def get(self, request, codigo_entregable):
        if not self.es_codigo_valido(codigo_entregable):
            return Response({'error': 'Código de entregable inválido'}, status=status.HTTP_400_BAD_REQUEST)

        nombre_archivo = f'{codigo_entregable}.pdf'
        ruta_archivo = os.path.join(settings.MEDIA_ROOT, nombre_archivo)
        ruta_archivo = os.path.abspath(ruta_archivo)

        if not ruta_archivo.startswith(os.path.abspath(settings.MEDIA_ROOT)):
            return Response({'error': 'Acceso no autorizado'}, status=status.HTTP_404_NOT_FOUND)

        if not os.path.exists(ruta_archivo):
            return Response({'error': 'El archivo no fue encontrado'}, status=status.HTTP_404_NOT_FOUND)

        try:
            archivo = open(ruta_archivo, 'rb')
            response = FileResponse(archivo, content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="{nombre_archivo}"'
            return response
        except Exception as e:
            print(f"Error al intentar abrir el archivo: {e}")
            return Response({'error': 'Error al intentar abrir el archivo'}, status=status.HTTP_404_NOT_FOUND)

    def es_codigo_valido(self, codigo):
        patron = re.compile(r'^PR\d+PM\d+NUM\d+$')
        return bool(patron.match(codigo))
