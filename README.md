# Shoes-ya

Este backend está diseñado para gestionar la aplicación Shoes-Ya, desarrollado con Express.js, PostgreSQL y Sequelize, e integrado con Cloudinary para la administración de archivos multimedia. Además, utiliza Sequelize CLI para la gestión eficiente de migraciones y modelos.
## Características
- Gestión de productos, categorías e información de contacto.
- API RESTful para realizar operaciones CRUD.
- Envío de detalles de pedidos a WhatsApp.
- Uso de PostgreSQL como base de datos relacional.
- Migraciones y modelos gestionados con Sequelize CLI.

## Requisitos Previos
Antes de empezar, asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [PostgreSQL](https://www.postgresql.org/) (versión 12 o superior)
- [Sequelize CLI](https://sequelize.org/)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/khristianEscalante/shoesBackedn.git
   cd shoesBackedn
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=nombre_de_tu_base_de_datos
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   ```

4. Configura Sequelize CLI:
   ```bash
   npx sequelize-cli init
   ```

5. Ejecuta las migraciones para crear las tablas en la base de datos:
   ```bash
   npx sequelize-cli db:migrate
   ```

## Uso

1. Inicia el servidor:
   ```bash
   npm start
   ```

2. El backend estará disponible en: `http://localhost:3000`
3. La documentacion esta disponible `http://localhost:3000/api-docs/`

## Endpoints Principales

### Productos
- **GET** `/api/products`: Obtiene todos los productos.
- **POST** `/api/products`: Crea un nuevo producto.
- **GET** `/api/products/:id`: Obtiene un producto por su ID.
- **PUT** `/api/products/:id`: Actualiza un producto por su ID.
- **DELETE** `/api/products/:id`: Elimina un producto por su ID.

### Categorías
- **GET** `/api/categories`: Obtiene todas las categorías.
- **POST** `/api/categories`: Crea una nueva categoría.
- **GET** `/api/categories/:id`: Obtiene una categoría por su ID.
- **PUT** `/api/categories/:id`: Actualiza una categoría por su ID.
- **DELETE** `/api/categories/:id`: Elimina una categoría por su ID.

### Pedidos
- **POST** `/api/orders`: Crea un pedido y envía los detalles a WhatsApp.

## Scripts Disponibles

- `npm start`: Inicia el servidor en modo producción.
- `npm run dev`: Inicia el servidor en modo desarrollo.
- `npx sequelize-cli db:migrate`: Ejecuta las migraciones.
- `npx sequelize-cli db:seed:all`: Ejecuta los seeds para poblar la base de datos con datos iniciales.
- `npx sequelize-cli db:migrate:undo`: Revierte la última migración.

## Estructura del Proyecto
```plaintext
├── models/          # Modelos de Sequelize
├── migrations/      # Migraciones de Sequelize
├── seeders/         # Seeds de Sequelize
├── routes/          # Rutas de la API
├── controllers/     # Lógica de controladores
├── config/          # Configuración de la base de datos
├── app.js           # Configuración principal de Express
├── server.js        # Inicio del servidor
├── .env             # Variables de entorno
└── README.md        # Documentación del proyecto
```

## Contribuciones
¡Las contribuciones son bienvenidas! Si encuentras un error o tienes una sugerencia, no dudes en abrir un issue o un pull request.

## Licencia
Este proyecto está bajo la [Licencia MIT](./LICENSE).

---
