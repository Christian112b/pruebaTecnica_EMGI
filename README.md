# Sistema de Gestión de Proyectos y Avances

## Requisitos previos
- Python 3.10 o superior
- Node.js y npm

## Backend
1. Entrar a la carpeta backend:
   cd backend
2. Crear y activar un entorno virtual (recomendado):
   python -m venv .venv
   # En Linux/Mac
   source .venv/bin/activate
   # En Windows
   .venv\Scripts\activate
3. Instalar dependencias:
   pip install -r requirements.txt
4. Ejecutar el servidor:
   uvicorn app.main:app --reload
5. El backend estará disponible en http://localhost:8000

## Frontend
1. Entrar a la carpeta frontend:
   cd frontend
2. Instalar dependencias:
   npm install
3. Ejecutar el servidor de desarrollo:
   npm run dev
4. El frontend estará disponible en http://localhost:5173 (o el puerto que indique Vite)

## Notas
- El backend debe estar corriendo antes de abrir el frontend.
- La base de datos se configura automáticamente usando SQLite (archivo erp.db) mediante la variable de entorno DATABASE_URL en backend/app/.env.
- No se requiere configuración adicional de base de datos para el entorno de desarrollo.
