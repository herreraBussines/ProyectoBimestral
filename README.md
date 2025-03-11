# Proyecto Bimestral

## Clonar el repositorio

Para clonar el repositorio, ejecuta el siguiente comando en tu terminal:

```bash
git clone https://github.com/herreraBussines/ProyectoBimestral.git
cd ProyectoBimestral
```

## Configuración del entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/proyectobimestral
JWT_SECRET=t0p1t0p1
```

## Levantar el servidor

Para levantar el servidor, asegúrate de tener [Node.js](https://nodejs.org/) instalado. Luego, ejecuta los siguientes comandos:

```bash
npm install
npm run dev
```

El servidor se levantará en `http://localhost:5000`.

## Datos del administrador

Cuando se ejecuta el servidor, se crean los siguientes datos de administrador en la base de datos:

```json
{
    "email": "admin@example.com",
    "password": "Admin123"
}
```

Estos datos se pueden utilizar para acceder a las rutas protegidas del servidor.

## Rutas para pruebas en Postman

### Autenticación

#### Registro de usuario

**URL:** `/api/auth/register`  
**Método:** `POST`  
**Cuerpo de la solicitud:**

```json
{
    "name": "nuevo_usuario",
    "email": "nuevo_usuario@example.com",
    "password": "contraseña_segura"
}
```

#### Inicio de sesión

**URL:** `/api/auth/login`  
**Método:** `POST`  
**Cuerpo de la solicitud:**

```json
{
    "email": "nuevo_usuario@example.com",
    "password": "contraseña_segura"
}
```

### Usuarios

#### Obtener todos los usuarios

**URL:** `/api/users`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Obtener un usuario por ID

**URL:** `/api/users/:id`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Actualizar un usuario

**URL:** `/api/users/:id`  
**Método:** `PUT`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "name": "usuario_actualizado",
    "email": "usuario_actualizado@example.com"
}
```

#### Eliminar un usuario

**URL:** `/api/users/:id`  
**Método:** `DELETE`  
**Encabezado:** `Authorization: Bearer <token>`

#### Cambiar rol de usuario

**URL:** `/api/users/:id/role`  
**Método:** `PUT`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "role": "ADMIN"
}
```

### Categorías

#### Crear una categoría

**URL:** `/api/categories`  
**Método:** `POST`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "name": "nueva_categoria"
}
```

#### Obtener todas las categorías

**URL:** `/api/categories`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Actualizar una categoría

**URL:** `/api/categories/:id`  
**Método:** `PUT`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "name": "categoria_actualizada"
}
```

#### Eliminar una categoría

**URL:** `/api/categories/:id`  
**Método:** `DELETE`  
**Encabezado:** `Authorization: Bearer <token>`

### Productos

#### Crear un producto

**URL:** `/api/products`  
**Método:** `POST`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "name": "nuevo_producto",
    "description": "Descripción del producto",
    "price": 100,
    "stock": 10,
    "category": "id_categoria"
}
```

#### Obtener todos los productos

**URL:** `/api/products`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Obtener un producto por ID

**URL:** `/api/products/:id`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Actualizar un producto

**URL:** `/api/products/:id`  
**Método:** `PUT`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "name": "producto_actualizado",
    "description": "Descripción actualizada",
    "price": 150,
    "stock": 5,
    "category": "id_categoria"
}
```

#### Eliminar un producto

**URL:** `/api/products/:id`  
**Método:** `DELETE`  
**Encabezado:** `Authorization: Bearer <token>`

### Carrito

#### Agregar producto al carrito

**URL:** `/api/cart`  
**Método:** `POST`  
**Encabezado:** `Authorization: Bearer <token>`  
**Cuerpo de la solicitud:**

```json
{
    "productId": "id_producto",
    "quantity": 2
}
```

#### Obtener el carrito

**URL:** `/api/cart`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Eliminar producto del carrito

**URL:** `/api/cart/:productId`  
**Método:** `DELETE`  
**Encabezado:** `Authorization: Bearer <token>`

#### Vaciar el carrito

**URL:** `/api/cart`  
**Método:** `DELETE`  
**Encabezado:** `Authorization: Bearer <token>`

### Facturas

#### Procesar compra

**URL:** `/api/invoices`  
**Método:** `POST`  
**Encabezado:** `Authorization: Bearer <token>`

#### Obtener facturas del usuario

**URL:** `/api/invoices`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`

#### Generar PDF de factura

**URL:** `/api/invoices/:id/pdf`  
**Método:** `GET`  
**Encabezado:** `Authorization: Bearer <token>`