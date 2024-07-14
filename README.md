# Aluraflix

Aluraflix es una plataforma de gestión de videos desarrollada con React. Este sistema permite a los usuarios listar, registrar, actualizar y eliminar videos. El propósito de Aluraflix es servir como una herramienta práctica para reforzar los conocimientos en la librería React, abordando aspectos como la componentización, el uso de hooks, el consumo de APIs y la navegación mediante rutas.

## Funcionalidades

- **Listado de Videos**: Los videos se agrupan por categorías y se muestran con sus respectivas imágenes, títulos y descripciones. Cada categoría tiene un color distintivo para facilitar su identificación.
- **Registro de Videos**: Los usuarios pueden añadir nuevos videos proporcionando un título, categoría, imagen, enlace de video y descripción.
- **Actualización de Videos**: Los videos existentes se pueden editar. Al hacer clic en el botón de "Editar", se abre un modal con un formulario pre-rellenado con la información actual del video.
- **Eliminación de Videos**: Los videos se pueden eliminar fácilmente haciendo clic en el botón de "Borrar".

## Estructura del Proyecto

El proyecto está estructurado de la siguiente manera:

- `src/`
  - `components/`
    - `VideoCard.js`: Componente que representa una tarjeta de video individual.
    - `VideoList.js`: Componente que lista todos los videos agrupados por categoría.
    - `VideoForm.js`: Componente para el formulario de creación de videos.
    - `EditModal.js`: Componente para el modal de edición de videos.
  - `App.js`: Componente principal de la aplicación que maneja las rutas y la lógica principal.
  - `index.js`: Punto de entrada de la aplicación.