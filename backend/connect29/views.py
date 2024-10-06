from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

from .models import Project
from .serializers import UserSerializer, ProjectSerializer


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

        print("-"*50)
        print(email, password)

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
            user.is_staff = False
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
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        user = self.get_object(pk)
        if user is not None:
            serializer = UserSerializer(user)
            return Response(serializer.data)

    def put(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied(
                "Solo los administradores pueden actualizar usuarios."
            )

        user = self.get_object(pk)
        if user is not None:
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(request.data["password"])
                user.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden eliminar usuarios.")

        user = self.get_object(pk)
        if user is not None:
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


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
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        project = self.get_object(pk)
        if project is not None:
            serializer = ProjectSerializer(project)
            return Response(serializer.data)

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

    def delete(self, request, pk):
        if not request.user.is_staff:
            raise PermissionDenied("Solo los administradores pueden eliminar proyectos.")

        project = self.get_object(pk)
        if project is not None:
            project.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
