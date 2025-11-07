# PÁGINA WEB HOTEL LOS DELFINES

Este proyecto es una aplicación web para la gestión y visualización de información del Hotel Los Delfines. Incluye funcionalidades para registro e inicio de sesión de usuarios, consulta de habitaciones, reservas y visualización de información relevante del hotel.

## Tecnologías utilizadas

- Node.js
- Express.js
- MySQL
- HTML, CSS, JavaScript (Frontend)

## Estructura del proyecto

- `software/` - Código fuente de la aplicación
  - `server.js` - Servidor principal Express
  - `db.js` - Conexión a la base de datos MySQL
  - `public/` - Archivos estáticos (HTML, CSS, JS, imágenes)
  - `routes/` - Rutas de la API (usuarios, reservas, habitaciones)
- `BASE_DATOS/` - Script SQL para la base de datos

## Instalación y uso

1. Clona el repositorio:
   ```
   git clone https://github.com/ToRo18299/PGINA-WEB-HOTEL-LOS_DELFINES.git
   ```
2. Entra a la carpeta `software`:
   ```
   cd PGINA-WEB-HOTEL-LOS_DELFINES/software
   ```
3. Instala las dependencias:
   ```
   npm install
   ```
4. Configura el archivo `.env` con tus credenciales de base de datos y JWT.
5. Inicia el servidor:
   ```
   node server.js
   ```
6. Accede a la aplicación desde tu navegador en `http://localhost:3000`

## Base de datos

El script para crear la base de datos y las tablas se encuentra en `BASE_DATOS/hotel_los_delfines.sql`.

## Funcionalidades principales

- Registro y login de usuarios
- Consulta de habitaciones disponibles
- Gestión de reservas
- Visualización de información del hotel

## Autor

- Diego Ramos

---

¡Contribuciones y sugerencias son bienvenidas!
