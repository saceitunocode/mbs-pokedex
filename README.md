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

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver el resultado.

## 📁 Estructura del Proyecto

- `app/`: Contiene las rutas y la lógica de las páginas (Next.js App Router).
- `components/`: Componentes de UI reutilizables como `PokemonCard`, `EvolutionChainDisplay` y `PokemonStats`.
- `lib/`: Utilidades y lógica para el consumo de la API.
- `public/`: Archivos estáticos e imágenes.
