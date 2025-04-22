# Documentación del Proyecto EggFarmFront

## Descripción General

EggFarmFront es un proyecto de frontend desarrollado con **Vue 3** y **Vite**. Este proyecto está diseñado para proporcionar una interfaz de usuario intuitiva y eficiente para la gestión de una granja de huevos.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- **Node.js** (versión 14 o superior)
- **npm** (versión 6 o superior) o **yarn**

## Instalación

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/EsloanJimenez/EggFarmFront.git
   ```

2. **Navegar al Directorio del Proyecto:**

   ```bash
   cd EggFarmFront
   ```

3. **Instalar Dependencias:**

   Si estás utilizando **npm**:

   ```bash
   npm install
   ```

   Si estás utilizando **yarn**:

   ```bash
   yarn install
   ```

## Uso

1. **Iniciar el Servidor de Desarrollo:**

   Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

   ```bash
   npm run dev
   ```

   o si estás utilizando **yarn**:

   ```bash
   yarn dev
   ```

   Esto iniciará el servidor de desarrollo y podrás acceder a la aplicación en tu navegador en [http://localhost:3000](http://localhost:3000).

2. **Compilar para Producción:**

   Para compilar el proyecto para producción, ejecuta:

   ```bash
   npm run build
   ```

   o si estás utilizando **yarn**:

   ```bash
   yarn build
   ```

   Esto generará una carpeta `dist` con los archivos optimizados para producción.

## Estructura del Proyecto

El proyecto sigue una estructura de archivos típica de **Vue 3** con **Vite**:

- `src/`: Contiene todos los archivos fuente de la aplicación.
  - `components/`: Componentes reutilizables de Vue.
  - `views/`: Vistas o páginas de la aplicación.
  - `App.vue`: Componente raíz de la aplicación.
  - `main.js`: Punto de entrada de la aplicación.
- `public/`: Archivos estáticos que se servirán tal cual.
- `package.json`: Archivo de configuración de npm con scripts y dependencias.

## Contribuciones

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.
