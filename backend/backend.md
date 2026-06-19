# Backend Endpoints

## Base URL: http://localhost:8000 (or as configured)

### Root Endpoint
- **GET /** 
  - Description: Returns a message indicating the backend is ready.
  - Response: `{ "message": "Backend Listo" }`

### Projects Endpoints (under `/api/proyectos`)
- **POST /** 
  - Description: Create a new project.
  - Request Body: `ProyectoCreate` schema (nombre, costo_base, fecha_inicio, fecha_fin)
  - Response: `ProyectoResponse` schema (id, nombre, costo_base, fecha_inicio, fecha_fin, porcentaje_avance)

- **GET /** 
  - Description: Retrieve a list of all projects with their latest advance percentage.
  - Response: List of `ProyectoResponse` objects.

- **GET /{project_id}** 
  - Description: Retrieve a specific project by its ID with its latest advance percentage.
  - Path Parameter: `project_id` (integer)
  - Response: `ProyectoResponse` object.

- **DELETE /{project_id}** 
  - Description: Delete a project by its ID.
  - Path Parameter: `project_id` (integer)
  - Response: Status 204 (No Content) with a JSON message: `{ "detail": "Proyecto eliminado correctamente" }`

### Advances Endpoints (under `/api/proyectos`)
- **POST /{id}/avances** 
  - Description: Create a new advance for a project.
  - Path Parameter: `id` (integer, project ID)
  - Request Body: `AvanceCreate` schema (fecha, porcentaje_avance, notas, materiales list)
  - Response: `AvanceResponse` object (includes id, proyecto_id, fecha, porcentaje_avance, notas, costo_estimado, and list of materials)

- **GET /{project_id}/avances** 
  - Description: Retrieve all advances for a specific project.
  - Path Parameter: `project_id` (integer)
  - Response: List of `AvanceResponse` objects.

## Notes
- The API is built with FastAPI and uses SQLAlchemy for ORM.
- The schemas (`ProyectoCreate`, `ProyectoResponse`, `AvanceCreate`, `AvanceResponse`) are defined in `app/schemas.py`.
- The database models are defined in `app/models.py`.