# MDEVIA Pokédex 🎮

> [!NOTE]
> 🎓 **Ejercicio de práctica — Master en Desarrollo con IA (MDEVIA)**
> Este repositorio forma parte de los ejercicios prácticos del Máster en Desarrollo con Inteligencia Artificial (MDEVIA). Su propósito es educativo: explorar el desarrollo de aplicaciones web modernas con Next.js, TypeScript y consumo de APIs públicas, bajo las directrices del programa formativo.

---

**MDEVIA Pokédex** es una aplicación web moderna y elegante construida con **Next.js 16** que permite a los usuarios explorar el universo Pokémon de forma intuitiva y visualmente atractiva, consumiendo datos en tiempo real desde la [PokéAPI](https://pokeapi.co/).

La interfaz sigue una estética _"Master Edition"_: diseño basado en tarjetas, tipografía clara, modo oscuro/claro y una experiencia de usuario fluida tanto en escritorio como en móvil.

---

## ✨ Características Principales

### 🗂️ Listado y Navegación
- **Cuadrícula de Pokémon**: Visualización en cuadrícula organizada, con 30 Pokémon por página.
- **Vista en Lista**: Alternativa compacta para explorar los Pokémon en formato de lista.
- **Selector de Vista**: Cambia fácilmente entre el modo cuadrícula y el modo lista.
- **Paginación Inteligente**: Navega por toda la Pokédex con controles de página anterior/siguiente.

### 🔍 Búsqueda y Filtros
- **Búsqueda por Nombre**: Localiza cualquier Pokémon escribiendo su nombre.
- **Filtro por Tipo**: Filtra los Pokémon según su tipo (Fuego, Agua, Planta, etc.).
- **Filtro por Región**: Explora Pokémon según la generación/región a la que pertenecen.

### 🌍 Internacionalización y Tema
- **Soporte Multiidioma**: Interfaz disponible en **Español** e **Inglés**.
- **Selector de Tema**: Cambia entre **modo claro** y **modo oscuro** en cualquier momento.

### 📄 Página de Detalle de Pokémon
Cada Pokémon dispone de una página dedicada con:
- Tipos con colores representativos.
- Estadísticas base detalladas con barras visuales.
- **Línea Evolutiva**: Visualización gráfica completa de la cadena de evolución.

### 🎨 Diseño y Rendimiento
- Interfaz **responsiva**, optimizada para escritorio y móvil.
- **Pantalla de carga** animada mientras se obtienen los datos de la API.
- Código tipado con **TypeScript en Strict Mode** para mayor robustez.

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Notas |
| :--- | :---: | :--- |
| [Next.js](https://nextjs.org/) | `16.1.4` | App Router |
| [React](https://react.dev/) | `19.2.3` | Con React DOM |
| [TypeScript](https://www.typescriptlang.org/) | `^5` | Strict Mode activado |
| [Tailwind CSS](https://tailwindcss.com/) | `^4` | Vía PostCSS |
| [Lucide React](https://lucide.dev/) | `^0.469.0` | Librería de iconos |
| [Vitest](https://vitest.dev/) | `^4` | Framework de testing |
| [Testing Library](https://testing-library.com/) | `^16` | Tests de componentes React |
| `pnpm` | — | Package manager recomendado |

---

## 🚀 Cómo Empezar

### Pre-requisitos

- [Node.js](https://nodejs.org/) **v18 o superior**
- [pnpm](https://pnpm.io/) (recomendado como gestor de paquetes)

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd mdevia-pokedex

# 2. Instalar pnpm si aún no lo tienes
npm install -g pnpm

# 3. Instalar dependencias del proyecto
pnpm install

# 4. Arrancar el servidor de desarrollo
pnpm dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

---

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo con hot-reload |
| `pnpm build` | Compila la aplicación para producción |
| `pnpm start` | Inicia el servidor en modo producción (requiere `build` previo) |
| `pnpm lint` | Ejecuta ESLint para verificar el estilo y calidad del código |
| `pnpm test` | Ejecuta la suite de tests con Vitest |

---

## 📁 Estructura del Proyecto

```text
mdevia-pokedex/
├── app/                          # Rutas y páginas (App Router de Next.js)
│   ├── [id]/                     # Página de detalle de un Pokémon
│   │   └── page.tsx
│   ├── globals.css               # Estilos globales
│   ├── layout.tsx                # Layout raíz de la aplicación
│   ├── loading.tsx               # Pantalla de carga global
│   └── page.tsx                  # Página principal (listado de Pokémon)
│
├── components/                   # Componentes React reutilizables
│   ├── EvolutionChainDisplay.tsx # Visualización de línea evolutiva
│   ├── GlobalPokedexHeader.tsx   # Cabecera global de la Pokédex
│   ├── LanguageSelector.tsx      # Selector de idioma (ES/EN)
│   ├── Pagination.tsx            # Componente de paginación
│   ├── PokedexHeaderWrapper.tsx  # Wrapper del header para estado cliente
│   ├── PokedexLayout.tsx         # Layout principal con filtros y listado
│   ├── PokemonCard.tsx           # Tarjeta de Pokémon (vista cuadrícula)
│   ├── PokemonListItem.tsx       # Fila de Pokémon (vista lista)
│   ├── PokemonStats.tsx          # Barras de estadísticas base
│   ├── RegionFilter.tsx          # Filtro por generación/región
│   ├── SearchBar.tsx             # Barra de búsqueda por nombre
│   ├── ThemeSelector.tsx         # Selector de tema claro/oscuro
│   ├── TypeFilter.tsx            # Filtro por tipo de Pokémon
│   └── ViewModeSelector.tsx      # Selector de modo de vista (grid/list)
│
├── lib/                          # Lógica de negocio y utilidades
│   ├── i18n.ts                   # Traducciones e internacionalización
│   ├── pokeapi.ts                # Cliente para consumir la PokéAPI
│   ├── types.ts                  # Interfaces y tipos TypeScript
│   └── utils.ts                  # Funciones auxiliares
│
├── test/                         # Tests unitarios y de integración
├── public/                       # Assets estáticos (imágenes, favicon, etc.)
├── AGENTS.md                     # Instrucciones para agentes de IA
└── README.md                     # Este archivo
```

---

## 🤖 Para Agentes de IA

Este proyecto incluye un archivo [`AGENTS.md`](./AGENTS.md) con instrucciones y convenciones detalladas para agentes de IA que trabajen sobre este repositorio, incluyendo:

- Principios de diseño y arquitectura aplicados.
- Patrones de React y TypeScript seguidos en el proyecto.
- Convenciones de naming y estructura de componentes.
- Estrategia de testing con Vitest y Testing Library.

---

## 📄 Licencia

Este proyecto es de uso **educativo**, desarrollado en el contexto del **Master en Desarrollo con IA (MDEVIA)**. No está destinado a uso comercial.
