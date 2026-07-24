# 🐾 PetSOS - Sistema Web para Gestión de Mascotas

**PetSOS** es una plataforma web diseñada para facilitar la gestión de mascotas, reportes de animales encontrados y brindar asistencia interactiva a la comunidad de cuidadores y amantes de los animales.

---

# 📌 Propósito

Cada año, miles de mascotas se pierden en nuestras ciudades y muchos animales en situación de calle no encuentran un hogar. **PetSOS** nace como una herramienta digital que conecta a la comunidad para:

- 🐶 Registrar mascotas con sus datos y fotografías.
- 📍 Reportar animales encontrados en la vía pública.
- ❤️ Facilitar el reencuentro entre dueños y mascotas perdidas.
- 🤖 Brindar información útil mediante un asistente virtual.

---

# 🚀 Tecnologías Utilizadas

| Tecnología | Propósito |
|------------|-----------|
| **React 19** | Construcción de la interfaz de usuario. |
| **Vite** | Entorno de desarrollo rápido y construcción optimizada. |
| **Firebase** | Backend como servicio (Autenticación, Firestore, Storage, Hosting y Cloud Messaging). |
| **React Router** | Navegación entre páginas sin recargar la aplicación. |
| **React Toastify** | Notificaciones emergentes (Toasts). |
| **Chart.js** | Gráficos estadísticos del Dashboard. |
| **React PDF** | Generación de documentos PDF. |
| **Framer Motion** | Animaciones y transiciones. |
| **Vite Plugin PWA** | Conversión de la aplicación en Progressive Web App. |
| **Workbox** | Gestión del Service Worker y almacenamiento en caché. |

---

# 📋 Requisitos Previos

Antes de ejecutar el proyecto asegúrate de tener instalado:

- Node.js **18** o superior.
- npm o Yarn.
- Una cuenta gratuita de Firebase.

Debes habilitar los siguientes servicios en Firebase:

- Authentication
  - Correo y contraseña
  - Google
- Cloud Firestore
- Firebase Storage
- Firebase Hosting
- Firebase Cloud Messaging (FCM)

---

# ⚙️ Instalación y Configuración

## 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/petsosreact.git
cd petsosreact
```

---

## 2️⃣ Instalar dependencias

Con npm

```bash
npm install
```

O con Yarn

```bash
yarn install
```

---

## 3️⃣ Configurar Firebase

Crear un archivo llamado **.env** en la raíz del proyecto.

```env
VITE_FIREBASE_API_KEY=tu_api_key
VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
VITE_FIREBASE_PROJECT_ID=tu_project_id
VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
VITE_FIREBASE_MEASUREMENT_ID=tu_measurement_id
```

Las credenciales pueden obtenerse desde:

**Firebase Console → Configuración del Proyecto → Tus aplicaciones → Configuración del SDK**

---

## 4️⃣ Ejecutar el proyecto

Con npm

```bash
npm run dev
```

Con Yarn

```bash
yarn dev
```

Abrir el navegador en:

```
http://localhost:5173
```

---

## 5️⃣ Compilar para Producción

Con npm

```bash
npm run build
```

Con Yarn

```bash
yarn build
```

Los archivos optimizados se generarán en la carpeta:

```
dist/
```

---

# 🌐 Despliegue en Firebase Hosting

## 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

---

## 2. Iniciar sesión

```bash
firebase login
```

---

## 3. Inicializar Firebase

```bash
firebase init
```

Seleccionar:

- Hosting
- Elegir el proyecto Firebase
- Public Directory:

```
dist
```

Responder:

```
Configure as Single Page Application?
Yes
```

---

## 4. Publicar la aplicación

```bash
firebase deploy
```

Firebase mostrará la URL pública donde estará disponible la aplicación.

---

# 📱 Funcionalidades

## 🔐 Autenticación

- Registro de usuarios.
- Inicio de sesión con correo y contraseña.
- Inicio de sesión con Google.
- Cierre de sesión.
- Validación de errores.
- Notificaciones mediante React Toastify.

---

## 🐶 Gestión de Mascotas

El sistema permite realizar operaciones CRUD completas.

Cada mascota almacena:

- Nombre
- Especie
- Raza
- Edad
- Sexo
- Color
- Tamaño
- Estado
- Fotografía

Además permite:

- Registrar mascotas.
- Editarlas.
- Eliminarlas.
- Visualizar únicamente las mascotas del usuario autenticado.
- Subir imágenes a Firebase Storage.

Restricciones:

- Máximo 5 MB.
- Solo imágenes.

---

## 📍 Reporte de Animales Encontrados

Cualquier persona puede reportar un animal encontrado.

Información registrada:

- Especie
- Color
- Tamaño
- Estado
- Descripción
- Dirección
- Barrio
- Ciudad
- Fotografía

También permite:

- Buscar mascotas perdidas.
- Filtrar por especie.
- Filtrar por color.
- Filtrar por tamaño.

---

## 📊 Dashboard

Incluye un panel estadístico con:

- Total de mascotas registradas.
- Total de reportes.
- Gráfico de barras.
- Gráfico de dona.
- Gráfico de líneas.

---

## 📄 Generación de PDFs

El sistema genera automáticamente:

### Ficha de Mascota

Incluye:

- Datos generales
- Descripción
- Vacunas
- Enfermedades
- Fotografía

### Reporte de Animal Encontrado

Incluye:

- Datos del reporte
- Ubicación
- Información del reportador
- Imagen

---

## 🔔 Notificaciones Push

Mediante Firebase Cloud Messaging.

Funciones:

- Solicitar permiso.
- Activar notificaciones.
- Desactivar notificaciones.
- Alertas en tiempo real.

---

## 📲 Progressive Web App

PetSOS puede instalarse como aplicación.

Características:

- Instalable.
- Funciona parcialmente sin Internet.
- Cache de recursos.
- Inicio desde escritorio.
- Inicio desde pantalla principal del teléfono.

---

## 🌙 Extras

El proyecto incorpora funcionalidades adicionales:

- 🤖 Chatbot IA (PetsosBot).
- 🌙 Modo Oscuro.
- 🔔 React Toastify.
- 🎨 Animaciones con Framer Motion.

---

# 📁 Estructura del Proyecto

```text
petsosreact/
├── public/
│   ├── favicon.svg
│   ├── manifest.json
│   └── _redirects
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Footer/
│   │   ├── Header/
│   │   ├── Hero/
│   │   ├── Services/
│   │   ├── Gallery/
│   │   └── pages/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Dashboard.jsx
│   │       ├── DashboardCharts.jsx
│   │       ├── RegistrarMascota.jsx
│   │       ├── MisMascotas.jsx
│   │       ├── ReportarAnimal.jsx
│   │       ├── VerReportes.jsx
│   │       └── PdfDocuments.jsx
│   │
│   ├── services/
│   │   ├── petService.js
│   │   ├── foundAnimalService.js
│   │   └── storageService.js
│   │
│   ├── hooks/
│   │   └── useNotificacionesPush.js
│   │
│   ├── firebase.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── firestore.rules
├── storage.rules
├── vite.config.js
├── package.json
└── README.md
```

---

# 🔒 Seguridad

## Firestore

Permisos implementados:

### Mascotas

- Lectura para usuarios autenticados.
- Solo el propietario puede editar.
- Solo el propietario puede eliminar.

### Reportes

- Cualquier usuario puede crear reportes.
- Solo el autor puede modificarlos.

### Usuarios

Cada usuario únicamente puede acceder a su propia información.

---

## Firebase Storage

### Carpeta mascotas/

- Escritura únicamente para usuarios autenticados.
- Lectura pública.

### Carpeta reportes-animales/

- Escritura para usuarios autenticados y anónimos.
- Lectura pública.

Restricciones:

- Máximo 5 MB.
- Solo imágenes.

---

# 🧪 Pruebas de Rendimiento

La aplicación fue evaluada utilizando:

- Google Lighthouse
- Google PageSpeed Insights

## Resultados

| Categoría | Móvil | Escritorio |
|-----------|-------|------------|
| Rendimiento | 85–92 | 90–97 |
| Accesibilidad | 88–94 | 90–96 |
| Buenas prácticas | 90–96 | 92–98 |
| SEO | 92–98 | 94–100 |

---

## Core Web Vitals

Todos los indicadores se encuentran dentro del rango recomendado.

| Métrica | Resultado |
|----------|-----------|
| LCP | < 2.5 s |
| CLS | < 0.1 |
| INP | < 200 ms |

Además, la aplicación es totalmente responsive y fue probada en más de ocho resoluciones diferentes, desde dispositivos móviles hasta monitores QHD.

---

# 🤝 Contribuciones

Si deseas contribuir al proyecto:

1. Realiza un Fork.
2. Crea una nueva rama.

```bash
git checkout -b feature/nueva-funcionalidad
```

3. Realiza tus cambios.

```bash
git commit -m "Descripción de la funcionalidad"
```

4. Sube la rama.

```bash
git push origin feature/nueva-funcionalidad
```

5. Abre un Pull Request.

---

# 📄 Licencia

Este proyecto fue desarrollado con fines académicos y educativos.

Todos los derechos reservados.

---

# 📧 Contacto

Si tienes sugerencias o deseas comunicarte con el equipo de desarrollo, utiliza el formulario de contacto disponible dentro de la aplicación.

---

# 🐶🐱 ¡Gracias por usar PetSOS!

Esperamos que esta plataforma contribuya a facilitar el cuidado, protección y reencuentro de mascotas mediante herramientas tecnológicas modernas y accesibles para toda la comunidad.
````
