# Endpoints del Backend

## URL Base: http://localhost:8000 (o según configuración)

### Endpoint Raíz
- **GET /** 
  - Devuelve: `{ "message": "Backend Listo" }`

### Endpoints de Proyectos (en `/api/proyectos`)
- **POST /** 
  - Crear un nuevo proyecto.
  - Envío: datos del proyecto (nombre, costo_base, fecha_inicio, fecha_fin)
  - Respuesta: datos del proyecto creado (incluye id y porcentaje_avance inicial 0)

- **GET /** 
  - Listar todos los proyectos con su último porcentaje de avance.
  - Respuesta: lista de proyectos.

- **GET /{id}** 
  - Obtener un proyecto específico por su ID.
  - Parámetro: `id` (número)
  - Respuesta: datos del proyecto.

- **DELETE /{id}** 
  - Eliminar un proyecto por su ID.
  - Parámetro: `id` (número)
  - Respuesta: confirmación de eliminación.

### Endpoints de Avances (en `/api/proyectos`)
- **POST /{id}/avances** 
  - Añadir un avance a un proyecto.
  - Parámetro: `id` (ID del proyecto)
  - Envío: fecha, porcentaje_avance, notas, lista de materiales
  - Respuesta: datos del avance creado.

- **GET /{id}/avances** 
  - Listar todos los avances de un proyecto.
  - Parámetro: `id` (ID del proyecto)
  - Respuesta: lista de avances.

## Notas
- API construida con FastAPI y SQLAlchemy.
- Esquemas en `app/schemas.py`.
- Modelos en `app/models.py`.