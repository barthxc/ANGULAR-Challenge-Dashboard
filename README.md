# ANGULARChallengeDashboard

# Abrir proyecto en desarrollo

1. Clonar del proyecto `git clone`

2. Instalar las depencias **[json-server]** `npm install`

3. Levantar servidor backend local `npm run backend`

4. Levantar front `ng server`

# Estructura del proyecto

La aplicación está organizada en un módulo llamado **Dashboard**, el cual encapsula toda la lógica relacionada con su funcionamiento y renderización.

## **Motivación de la estructura**

Se ha optado por crear un único módulo para el **Dashboard** con el objetivo de que, en proyectos grandes, pueda funcionar como un módulo independiente. De esta forma:

- Solo es necesario importar módulos compartidos, como un **SharedModule**, cuando sea requerido.
- Se mantiene una estructura modular y escalable.

## **Sistema de Rutas**

Para garantizar una navegación organizada, todas las rutas del módulo comienzan con el prefijo:

```
/dashboard
```

Dentro de este módulo:

- Se ha definido un **layout principal** que actúa como contenedor.
- Por defecto, se renderiza la página **HomePage** dentro del Dashboard.
- Cada vista dentro del módulo se basa en la ruta principal `/dashboard`.

# Servicios

La aplicación implementa un servicio por cada entidad principal de la base de datos del **JSON Server**:

- **Usuarios** (`UsersService`)
- **Posts** (`PostsService`)
- **Comentarios** (`CommentsService`)

Además, se han desarrollado otros servicios con funcionalidades específicas para mejorar la gestión de datos y la experiencia del usuario.

## **Servicios adicionales**

### **1. `LocalDataService` – Gestión de datos relacionada**

Este servicio agrupa la lógica de los tres servicios principales (**usuarios, posts y comentarios**).  
Dado que no existe un backend real, es necesario gestionar las relaciones entre entidades manualmente.

✅ **Ejemplo de funcionalidad:**  
Si se elimina un usuario, es necesario asegurarse de que también se eliminen sus comentarios y posts. Para ello:

- Cada servicio contiene las funciones individuales de eliminación.
- `LocalDataService` orquesta la eliminación conjunta.

Se ha creado un servicio por cada campo principal de la base de datos de JsonServer [comentarios, posts, usuarios]

### **2. `ToastService` – Notificaciones**

Servicio dedicado a mostrar **notificaciones tipo toast** en la aplicación global.  
Se pueden enviar mensajes con distintos niveles de alerta:

- `success` (éxito)
- `error` (error)
- `warning` (advertencia)

📌 **Ejemplo de uso:**

```js
this.toastService.show("Usuario eliminado correctamente", "success");
```

### **3. `DialogService` – Confirmaciones**

Este servicio se encarga de mostrar un diálogo de confirmación antes de ejecutar funciones que impacten la base de datos.

🛠 **Integración con `ToastService`:**

- Cuando un usuario confirma un cambio en el diálogo, el servicio ejecuta la acción correspondiente.
- Luego, muestra una notificación de confirmación utilizando `ToastService`.

📌 **Ejemplo de flujo:**

1. Se solicita eliminar un usuario.
2. Se muestra el diálogo de confirmación.
3. Si el usuario acepta, se ejecuta la eliminación.
4. Se muestra un toast confirmando la acción.

### **4. `EntityService` – Abstracción de lógica en los componentes**

Este servicio encapsula la lógica de cada entidad, evitando que los componentes tengan que inyectar múltiples servicios.

✅ **Ejemplo de utilidad:**  
Si estamos en la vista de **gestión de usuarios**, el botón de eliminar usuario ejecutará la función correspondiente **sin que el componente tenga que conocer detalles de implementación**.

📌 **Cómo funciona:**

- El servicio recibe el **segmento de ruta** (ej. `users`, `posts`, `comments`).
- Según el contexto, ejecuta la función adecuada para obtener datos, eliminarlos o modificarlos.
- El componente solo se comunica con `EntityService`, reduciendo la cantidad de dependencias inyectadas.

# Ciclo de vida

La lógica de la aplicación comienza en el **Layout**, que actúa como la página maestra o padre y siempre está activo. A partir de ahí, se cargan los datos y se gestiona la interacción con los diferentes componentes.

## 📌 Layout

### 🔹 Inicialización

- En el `OnInit` se ejecuta la función `fillSignals()`, que se encarga de llenar las señales (`signals`) de **usuarios, comentarios y posts** mediante peticiones, evitando trabajar con arrays vacíos.
- Se suscribe a un observador que monitorea la anchura de la pantalla para ajustar dinámicamente los estilos según el dispositivo.

### 🔹 Funcionalidades

- Se gestiona el cambio de datos de las señales para su uso en el `inputSearch`.
- Se definen rutas y configuraciones visuales para mejorar la experiencia en dispositivos móviles.

## 🏠 HomePage

### 🔹 Peticiones y Filtrado

Los servicios realizan peticiones que filtran los datos para generar diferentes vistas:

- **topUserPost** → Top 3 usuarios con más posts.
- **topUsersComment** → Top 3 usuarios con más comentarios.
- **topPosts** → Top 3 posts con más comentarios.

### 🔹 Renderizado

- Se utiliza un **componente genérico** llamado `Card` que recibe los siguientes inputs:
  - `title`: Título de la tarjeta.
  - `data`: Datos a mostrar.
  - `routerName`: Define la ruta a la que se redirige al hacer clic en un elemento.
  - `haveHead`: Indica si la tarjeta tiene cabecera o subtítulo.

## 📊 Gráficos (Charts)

Dentro de `HomePage`, existe un **tab** dividido en dos secciones donde se visualizan gráficos de usuarios y comentarios.

### 🔹 Configuración del componente `Chart`

- Inputs principales:
  - `title`: Título del gráfico.
  - `chartType`: Tipo de gráfico (posts, usuarios, reset).
  - `data`: Datos a graficar.
  - `xAxisLabel`: Etiqueta del eje X.
- Funcionalidades:
  - Captura eventos `click` para actualizar la gráfica.
  - Ajuste dinámico del tamaño con `@HostListener` mediante la función `resize()`.
  - Función `onSelect()` para actualizar la visualización.
  - `output` que emite valores vacíos para reiniciar el gráfico cuando se han mostrado todos los datos.

## 📝 Usuarios / Posts / Comentarios

### 🔹 Organización

- Cada página (`Usuarios`, `Posts`, `Comentarios`) muestra una lista de datos.
- Se utiliza el componente `GenericTable` para el renderizado.

📌 _Nota:_ Se decidió separar estas páginas en lugar de consolidarlas en una sola para evitar inyecciones de dependencias innecesarias.

### 🔹 Componente `GenericTable`

- Inputs principales:
  - `toGo`: Define la navegación al hacer clic en un elemento (Ejemplo: `user/1`).
  - `data`: Array de datos que se transforma para el renderizado.
  - `deleteAction`: Función para eliminar un elemento.
- Funcionalidades:
  - Extrae las columnas de `Object.keys()` y añade una columna `actions` con botones.
  - Utiliza `DialogService` para confirmar eliminaciones y muestra un `Toast` de éxito.
  - Permite redirigir a la página correcta según el elemento seleccionado.

### 🔹 Botón `EditButton`

- Captura el `ID` del elemento y usa `toGo` para redirigir a la página `ElementById`.

## ✏️ Element By Id

### 🔹 Funcionalidad

- Renderiza un formulario dinámico basado en el ID del elemento y la ruta (`toGo`).
- Determina el título y los datos a cargar según el segmento de la URL.

📌 _Nota:_ Para ejecutar funciones de servicios en el componente sin inyectar dependencias, se usa `bind()`.

### 🔹 Servicios

- `getEntityService`: Obtiene los datos de la entidad.
- `getCreateEntityService`: Permite crear nuevas entidades.

### 🔹 Renderizado del formulario

Se utiliza el componente `GenericForm`.

## 📄 Generic Form (Formulario Genérico)

### 🔹 Configuración

- Inputs principales:
  - `data`: Datos a mostrar en el formulario.
  - `onSubmitFunction`: Función para ejecutar (crear o editar).
  - `isCreation`: Booleano que indica si se está creando un elemento.

### 🔹 Funcionalidades

- Excluye ciertos campos innecesarios.
- Usa `Object.keys()` para obtener los nombres de los campos.
- Asigna valores predeterminados según sea edición o creación.
- Todos los campos son obligatorios por defecto.

📌 _Mejoras futuras:_ Implementar validaciones personalizadas en un archivo separado.

### 🔹 Función `submit()`

- Verifica que el formulario sea válido.
- Ejecuta la función recibida del padre.
- Envía los datos con o sin `ID` según corresponda.
