# Plan Técnico - ERP Fullstack con FastAPI + React

## 1. Análisis

### Requisitos funcionales
- Registrar avances de obra asociados a un proyecto.
    - El sistema debe de permitir seleccionar un proyecto existente
    - Cada avance se asocia a un proyecto mediante su ID
    - Validar el registro de avance solo si existe un proyecto.


- Cada avance incluye: fecha, porcentaje, notas y lista de materiales.
    - Fecha del avance: Campo Obligatorio, valida y no futura.
    - Porcentaje numero de avance con enteros de 0 a 100, que representara el progreso acumulador
    - Nota o descripcion de las actividade realizadas.
    - Lista en formato JSON de materiales utilizados asi como su cantidad.


- Validaciones basicas.
    - El porcentaje no puede ser menor al ultimo avance registrado.
    - Los materiales y progreso debe de ser cantidades positivas.
    - La fecha debe de ser mayor o igual a la ultima registrada para mantener cronologia

- Calcular costo estimado del avance.
    - Cada avance debe de calcular un costo estimado a funcion del porcentaje
    - El costo se guarda junto con el avance para trazabilidad.
    - Se debe permitir ajustar la formula del costo

- Consulta de avances
    - El sistema debe listar todos los avances del proyecto.
    - Posibilidad de manejar multiples proyectos en pralelo. NICE TO HAVE
    - Preparar el modelo para crecer con mas atributos

### Modelo de datos
**Proyecto**
id (PK, entero autoincremental) → Identificador único del proyecto.
nombre (varchar) → Nombre del proyecto.
costo_base (decimal) → Valor base para calcular avances.
fecha_inicio (date) → Inicio del proyecto.
fecha_fin (date) → Fin estimado del proyecto.

**Avance**
id (PK, entero autoincremental) → Identificador unico del avance.
proyecto_id (FK → Proyecto.id) → Relacion con el proyecto.
fecha (date) → Fecha del avance.
porcentaje_avance (int) → Progreso acmulado (0–100).
notas (text) → Observaciones del avance.
costo_estimado (decimal) → Costo calculado según porcentaje o materiales.

**Material**
id (PK, entero autoincremental) → Id unico del material.
avance_id (FK → Avance.id) → Relacion con el avance.
nombre (varchar) → Nombre del material.
cantidad (int) → Cantidad utilizada.

**Relaciones**
Un proyecto con MUCHOS avances                                      Proyecto 1->N Avances
Un avance pertenece a UN proyecto y tiene MUCHOS materiales         Avance 1->N Materiales
Un material pertenece a un avance

### Consideraciones de robustez/escalabilidad
- Validar datos.
    - Porcentaje entre 0 y 100
    - Fecha del avance no puede ser futura ni anterior al inicio del proyecto.
    - Los materiales deben ser positivos y con nombres no vacios.
    - Evitar retrocesos es decir, el porcentaje no puede ser menor al ultimo registraod.

- Integridad referencial.
    - Uso de FK con cascada para asegurar un avance siempre que pertenezca a un proyecto valido.
    - Los materiales se eliminan automaticamente si se borra el avance correspondiente.
    - Indices en proyectos e avances para consultas rapidas.

- Escalabilidad
    - Posibilidad de añadir atributos futuros.
    - Uso de migraciones para evolucionar la base de datos sin perder datos (Alembic)

- Optimizacion de consultas.
    - Indices en campos de busquedas frecuentes
    - Paginacion en el listado de avances
    - Uso de relaciones Lazy

- Seguridad y consistencias
    - Validad entradas con Pydantic para evitar datos corruptos
    - Manejo de errores con respuestas claras

- Crecimiento
    - Escalabilidad Horizontal

---

## 2. Backend (FastAPI)

### Estructura
backend/
 ├── app/
 │   ├── main.py
 │   ├── models.py
 │   ├── schemas.py
 │   ├── database.py
 │   ├── routers/
 │   │   ├── proyectos.py
 │   │   └── avances.py
 └── alembic/

### Endpoints
- POST /api/proyectos/{id}/avances
  - Recibe JSON con fecha, porcentaje, notas y materiales.
  - Valida con Pydantic.
  - Calcula costo estimado (costo_base * porcentaje/100).
  - Inserta en tablas Avance y Material.

- GET /api/proyectos/{id}/avances
  - Devuelve lista de avances con materiales.


---

## 3. Frontend (React + Vite)

### Estructura
frontend/
 ├── src/
 │   ├── App.jsx
 │   ├── components/
 │   │   ├── ProjectSelector.jsx
 │   │   ├── AdvanceForm.jsx
 │   │   └── AdvanceList.jsx
 └── vite.config.js

### Funcionalidad
- Selector de proyecto (mockeado).
- Formulario de avance:
  - Fecha, porcentaje, notas.
  - Lista dinámica de materiales (useState).
- Guardar avance → POST al backend.
- Mostrar avances → GET al backend.

---

