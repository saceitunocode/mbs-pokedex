# MBS Pokédex 🎮

MBS Pokédex es una aplicación web moderna y elegante construida con **Next.js** que permite a los usuarios explorar el vasto mundo de Pokémon de una manera intuitiva y visualmente atractiva.

Esta aplicación ha sido diseñada con una estética "Master Edition", priorizando la claridad, el diseño basado en tarjetas y una experiencia de usuario fluida.

## ✨ Características Principales

- **Cuadrícula de Pokémon**: Visualiza los Pokémon en una cuadrícula organizada de 3x10 por página.
- **Paginación Inteligente**: Navega fácilmente a través de toda la lista de Pokémon.
- **Detalles Completos**: Cada Pokémon tiene su propia página dedicada que incluye:
  - Información técnica (ID, Altura, Peso).
  - Tipos con colores representativos.
  - Estadísticas base detalladas.
  - **Línea Evolutiva**: Visualización gráfica de la cadena de evolución del Pokémon.
- **Diseño Premium**: Interfaz limpia, responsiva y optimizada para una lectura agradable.
- **Consumo de API**: Datos obtenidos en tiempo real desde la [PokéAPI](https://pokeapi.co/).

## 🛠️ Tecnologías Utilizadas

- **Sustrato core**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Lógica de UI**: [React 19](https://react.dev/)
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)

## 🚀 Cómo Empezar

Para ejecutar este proyecto de forma local, sigue estos pasos:

### Pre-requisitos

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

### Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd mbs-pokedex
   ```

2. Instala pnpm (si no lo tienes):
   ```bash
   npm install -g pnpm
   ```

3. Instala las dependencias:
   ```bash
   pnpm install
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

5. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver el resultado.

## � Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

- `pnpm dev`: Inicia la aplicación en modo de desarrollo.\
  Abre [http://localhost:3000](http://localhost:3000) para verlo en el navegador.

- `pnpm build`: Construye la aplicación para producción.\
  Optimiza el rendimiento para el despliegue.

- `pnpm start`: Inicia un servidor de producción Next.js.\
  Generalmente se usa después de ejecutar `pnpm build`.

- `pnpm lint`: Ejecuta el linter (ESLint) para encontrar y arreglar problemas en el código.

- `pnpm test`: Ejecuta los tests unitarios utilizando Vitest.

## 📁 Estructura del Proyecto

Una visión general de la estructura de directorios principal:

- `app/`: Directorio principal de la aplicación (Next.js App Router).
  - `layout.tsx`: Layout raíz de la aplicación.
  - `page.tsx`: Página principal (Home).
  - `globals.css`: Estilos globales y configuración de Tailwind.
- `components/`: Biblioteca de componentes de UI reutilizables.
  - `PokemonCard.tsx`: Tarjeta de visualización individual de Pokémon.
  - `PokemonStats.tsx`: Componente para gráficos de estadísticas.
  - `ThemeSelector.tsx`: Selector de tema claro/oscuro.
  - ...y otros componentes modulares.
- `lib/`: Lógica de negocio y utilidades.
  - `api.ts`: Cliente y funciones para interactuar con la PokéAPI.
  - `utils.ts`: Funciones auxiliares generales.
- `public/`: Archivos estáticos públicos (imágenes, fuentes, iconos).
- `test/`: Configuración y utilidades para pruebas.
- `eslint.config.mjs`: Configuración de reglas de linting.
- `vitest.config.ts`: Configuración del runner de pruebas Vitest.
- `tailwind.config.js`: Configuración personalizada de Tailwind CSS.

