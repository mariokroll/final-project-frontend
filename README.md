# final-project-frontend

# FilmAffinity Clone

Este repositorio contiene el código fuente de una aplicación web similar a FilmAffinity, desarrollada utilizando Django y React. La aplicación permite a los usuarios explorar, calificar y comentar películas, además de gestionar cuentas de usuario y recibir recomendaciones personalizadas de películas.

## Características

- **Exploración de Películas**: Los usuarios pueden navegar por el catálogo de películas y acceder a detalles como título, descripción, género y calificaciones.
- **Calificación de Películas**: Usuarios registrados pueden calificar películas en una escala de 1 a 10.
- **Registro y Gestión de Usuarios**: Los usuarios pueden registrarse, iniciar sesión y gestionar su perfil.
- **Recomendaciones Personalizadas**: Sistema de recomendación basado en filtrado colaborativo.
- **Búsqueda Avanzada**: Búsqueda de películas por título, descripción, género y calificación.
- **Administración del Catálogo de Películas**: Funcionalidades CRUD para administradores para gestionar el catálogo de películas.

## Tecnologías Utilizadas

- **Frontend**: React
- **Backend**: Django, Django REST Framework
- **Base de Datos**: PostgreSQL
- **Autenticación**: Django proporciona la autenticación de usuario
- **Despliegue Continuo**: Integración y despliegue continuo con GitHub Actions y Render

## Arquitectura

La aplicación sigue una arquitectura cliente-servidor, con React en el frontend proporcionando una interfaz de usuario dinámica y Django en el backend manejando la lógica del negocio y la base de datos.

### Modelo de Base de Datos

- **Usuarios**: Registrados con campos como nombre,teléfono, email y contraseña.
- **Películas**: Incluye títulos, descripción, género (relacionado con una tabla de géneros), calificación y año.
- **Reseñas**: Relaciona usuarios y películas con reseñas y calificaciones específicas.

