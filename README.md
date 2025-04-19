# Plataforma Inmobiliaria

Una plataforma web para la gestión y publicación de propiedades inmobiliarias, con sistema de chat en tiempo real entre usuarios.

## Características

- Registro y autenticación de usuarios
- Publicación de propiedades con imágenes
- Búsqueda y filtrado de propiedades
- Chat en tiempo real entre usuarios
- Gestión de propiedades (edición y eliminación)
- Interfaz responsive y moderna

## Requisitos

- Node.js (v14 o superior)
- MongoDB
- NPM o Yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone [url-del-repositorio]
cd inmobiliaria
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo .env:
```bash
cp .env.example .env
```

4. Configurar las variables de entorno en .env:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/inmobiliaria
JWT_SECRET=tu-secreto-seguro
NODE_ENV=development
```

5. Iniciar el servidor:
```bash
npm start
```

## Estructura del Proyecto

```
inmobiliaria/
├── public/             # Archivos estáticos
│   ├── css/           # Estilos CSS
│   ├── js/            # Scripts del cliente
│   └── uploads/       # Imágenes subidas
├── models/            # Modelos de MongoDB
├── routes/            # Rutas de la API
├── middleware/        # Middleware de Express
└── server.js         # Punto de entrada
```

## API Endpoints

### Autenticación
- POST /api/auth/register - Registro de usuario
- POST /api/auth/login - Inicio de sesión

### Propiedades
- GET /api/properties - Listar propiedades
- GET /api/properties/:id - Obtener propiedad específica
- POST /api/properties - Crear propiedad
- PUT /api/properties/:id - Actualizar propiedad
- DELETE /api/properties/:id - Eliminar propiedad

### Chat
- GET /api/chat - Listar chats del usuario
- GET /api/chat/:id - Obtener chat específico
- POST /api/chat - Crear chat
- POST /api/chat/:id/messages - Enviar mensaje

## Tecnologías Utilizadas

- Backend:
  - Node.js
  - Express
  - MongoDB
  - Socket.io
  - JWT

- Frontend:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Socket.io Client

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles. 