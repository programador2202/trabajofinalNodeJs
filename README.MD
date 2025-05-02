# Sistema de Gestión de Productos - Node.js + MySQL

Este proyecto es una aplicación web básica desarrollada con **Node.js**, **Express** y **MySQL** que permite gestionar productos en una tienda. Puedes registrar productos con imágenes, ver la lista, editar y eliminar registros.

# Estructura del Proyecto

- `config/` – Conexión a base de datos.
- `routes/` – Rutas de la aplicación (`index.js`).
- `views/` – Vistas renderizadas (usando EJS).
- `public/` – Archivos estáticos (como imágenes).
- `app.js` – Archivo principal del servidor.
- `package.json` – Dependencias y scripts del proyecto.

---

# Veremos paso a paso de cada carpeta

-	En public almacenaremos las imágenes que se registren desde el formulario esto servirá para que luego esas imágenes puedan ser mostradas en el catálogo.

-	En routes tenemos 2 carpetas una donde manejamos el agregar, editar y eliminar y otro archivo que solo se manejara los datos a mostrar en un catálogo.

Componentes principales de Productos:

-	express.Router(): define rutas como /, /create, /edit/:id,delete/:id
-	multer: se usa para subir y guardar imágenes en public/img.
-	db: conexión a la base de datos (config/database.js).


# views
- Partials
-header: Contiene la parte superior del HTML, menú de navegación.
-Se incluye al inicio de cada página.

-footer:A veces también contiene scripts JS, pie de página o información de contacto.
-Se incluye al final de cada página.


# catalogo.ejs
Esta vista muestra el catálogo completo, con filtros y tarjetas para cada producto:

- Incluye filtros por:
  - Categoría
  - Búsqueda por nombre o marca
  - Ordenamiento por precio (ascendente o descendente)
- Los filtros conservan su estado gracias a variables enviadas desde el backend (`categoriaSeleccionada`, `buscar`).
- Si no hay resultados, muestra un mensaje de "No se encontraron productos".
- Usa Bootstrap para mostrar cada producto en una **card responsiva**, incluyendo:
  - Imagen del producto
  - Nombre y descripción
  - Precio
  - Categoría

# create.ejs

Esta vista permite registrar un nuevo producto mediante un formulario amigable con diseño Bootstrap y confirmación con SweetAlert2.

# Funcionalidades:

- **Formulario estructurado por secciones**:
  - Selección de categoría desde un `<select>` dinámico.
  - Campos para: Marca, Nombre, Precio, Imagen y Descripción del producto.
- **Carga de imagen** mediante campo de tipo `file`.
- **Estilo visual moderno** gracias a Bootstrap (`form-floating`, `card`).
- Validación básica con `required` en todos los campos.

# Confirmación antes de enviar:

Usa **SweetAlert2** para mostrar un mensaje de confirmación antes de registrar el producto. El formulario solo se envía si el usuario acepta.


# edit 
Esta vista permite actualizar un producto ya existente, reutilizando el mismo diseño que el formulario de registro y añadiendo lógica para mostrar datos precargados.

# Funcionalidades:

- **Formulario con datos precargados**:
  - Los campos se completan automáticamente con los datos del producto a editar (`producto`).
  - La categoría se selecciona dinámicamente según el valor actual.

- **Carga opcional de nueva imagen**:
  - Si no se selecciona una imagen nueva, se mantiene la actual gracias a un campo oculto (`imagenActual`).
  - Se muestra una miniatura de la imagen existente.

- **Validación y formato moderno**:
  - Uso de `form-floating` de Bootstrap para mejorar la UX.
  - Todos los campos son obligatorios excepto la imagen.


# instalacion de node_modules

-npm init -y -> instalacion del package-json
npm install express -> instalacion de node_modules

para inciar el proyecto lo aremos con nodemon app
