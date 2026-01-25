# MDEVIA Pokédex 🎮

MDEVIA Pokédex es una aplicación web moderna y elegante construida con **Next.js** que permite a los usuarios explorar el vasto mundo de Pokémon de una manera intuitiva y visualmente atractiva.

Esta aplicación ha sido diseñada con una estética "Master Edition", priorizando la claridad, el diseño basado en tarjetas y una experiencia de usuario fluida.

## ✨ Características Principales

- **Cuadrícula de Pokémon**: Visualiza los Pokémon en una cuadrícula organizada de 3x10 por página.
- **Paginación Inteligente**: Navega fácilmente a través de toda la lista de Pokémon.
- **Búsqueda y Filtros**: Filtra Pokémon por nombre, tipo y región.
- **Selector de Tema**: Cambia entre modo claro y oscuro.
- **Internacionalización**: Soporte para Español e Inglés.
- **Detalles Completos**: Cada Pokémon tiene su propia página dedicada que incluye:
  - Tipos con colores representativos.
  - Estadísticas base detalladas.
  - **Línea Evolutiva**: Visualización gráfica de la cadena de evolución del Pokémon.
- **Diseño Premium**: Interfaz limpia, responsiva y optimizada para una lectura agradable.
- **Consumo de API**: Datos obtenidos en tiempo real desde la [PokéAPI](https://pokeapi.co/).

## 🛠️ Stack Tecnológico

| Tecnología | Versión / Notas |
| :--- | :--- |
| [Next.js](https://nextjs.org/) | v16.1.4 (App Router) |
| [React](https://react.dev/) | v19.2.3 |
| [TypeScript](https://www.typescriptlang.org/) | v5+ (Strict Mode) |
| [Tailwind CSS](https://tailwindcss.com/) | v4 |
| [Vitest](https://vitest.dev/) | Testing framework |
| [Lucide React](https://lucide.dev/) | Iconos |
| pnpm | Package manager |

## 🚀 Cómo Empezar

### Pre-requisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [pnpm](https://pnpm.io/) (recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd mdevia-pokedex

# Instalar pnpm (si no lo tienes)
npm install -g pnpm

# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev
```

Abre tu navegador en [http://localhost:3000](http://localhost:3000) para ver el resultado.

## 📜 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `pnpm dev` | Inicia el servidor de desarrollo |
| `pnpm build` | Construye la aplicación para producción |
| `pnpm start` | Inicia el servidor de producción |
| `pnpm lint` | Ejecuta ESLint para verificar el código |
| `pnpm test` | Ejecuta los tests con Vitest |

## 📁 Estructura del Proyecto

```text
/
├── app/                    # Rutas App Router
│   ├── [id]/               # Página de detalle
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/             # Componentes reutilizables
│   ├── PokemonCard.tsx     # Tarjeta de Pokémon
│   ├── SearchBar.tsx       # Barra de búsqueda
│   ├── TypeFilter.tsx      # Filtro por tipo
│   └── ...                 # Otros componentes
├── lib/                    # Lógica de negocio
│   ├── pokeapi.ts          # Cliente de PokéAPI
│   ├── types.ts            # Interfaces TypeScript
│   ├── i18n.ts             # Internacionalización
│   └── utils.ts            # Funciones auxiliares
├── test/                   # Tests
├── public/                 # Assets estáticos
├── AGENTS.md               # Instrucciones para agentes de IA
└── README.md               # Este archivo
```

## 🤖 Para Desarrolladores (IA)

Este proyecto incluye un archivo `AGENTS.md` con instrucciones detalladas para agentes de IA, incluyendo:
- Principios SOLID aplicados a React
- Patrones de testing
- Convenciones de código

## 📄 Licencia

Este proyecto es de uso educativo.
