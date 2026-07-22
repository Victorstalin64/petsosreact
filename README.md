# 🐾 PetSOS React

PetSOS es una aplicación web desarrollada para ayudar a los usuarios y rescatistas a gestionar adopciones, reportar casos de fauna urbana y brindar asistencia interactiva mediante un chatbot inteligente. Este proyecto corresponde a una arquitectura moderna basada en React, Vite y Firebase.

## 🚀 Tecnologías Utilizadas

* React
* Vite
* CSS3
* JavaScript (ES6+)
* React Icons
* Firebase (Cloud Firestore y Autenticación)

## 📂 Estructura del Proyecto

El proyecto fue organizado utilizando una arquitectura basada en componentes, donde cada componente contiene su propio archivo JSX y CSS para facilitar el mantenimiento y la reutilización del código.

```plaintext
src/
│
├── assets/
│   └── images/
│
├── components/
│   │
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.css
│   │
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.css
│   │
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.css
│   │
│   ├── Services/
│   │   ├── Services.jsx
│   │   └── Services.css
│   │
│   ├── Features/
│   │   ├── Features.jsx
│   │   └── Features.css
│   │
│   ├── Download/
│   │   ├── Download.jsx
│   │   └── Download.css
│   │
│   ├── Gallery/
│   │   ├── Gallery.jsx
│   │   └── Gallery.css
│   │
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   └── Contact.css
│   │
│   └── Footer/
│       ├── Footer.jsx
│       └── Footer.css
│
├── App.jsx
├── main.jsx
└── index.css
```

### Ventajas de esta estructura

* Separación clara de responsabilidades.
* Componentes reutilizables.
* Mayor facilidad para mantener el código.
* Escalabilidad para futuras funcionalidades.
* Organización profesional utilizada en proyectos React.


## ✨ Funcionalidades

* Página principal responsiva.
* Sección de presentación de la plataforma.
* Información institucional.
* Servicios ofrecidos por PetSOS.
* Características principales de la aplicación.
* Conexión a base de datos en tiempo real con Firebase Cloud Firestore.
* PetsosBot Asistente virtual integrado mediante script en el HTML para resolver dudas sobre adopciones y reportes de fauna urbana.
* Galería informativa.
* Formulario de contacto.
* Pie de página con enlaces y redes sociales.

## 🎯 Objetivo del Proyecto

El objetivo de PetSOS es proporcionar una plataforma intuitiva que facilite la localización y protección de mascotas mediante herramientas tecnológicas modernas y accesibles para la comunidad.

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Victorstalin64/petsosreact.git
```

Ingresar al proyecto:

```bash
cd petsosreact
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
npm run dev
```

