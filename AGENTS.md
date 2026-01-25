# AGENTS.md - Instrucciones para Agentes de IA

Este archivo define las reglas, convenciones y contexto técnico para trabajar en el proyecto `mdevia-pokedex`. Los agentes de IA **DEBEN** leer y seguir estas instrucciones.

---

## 📌 Contexto del Proyecto

| Atributo | Valor |
| :--- | :--- |
| **Nombre** | mdevia-pokedex |
| **Descripción** | Aplicación web moderna de Pokédex |
| **Arquitectura** | Next.js App Router (v16+) |
| **Repositorio** | Monorepo con pnpm |

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología | Versión / Notas |
| :--- | :--- | :--- |
| **Framework** | Next.js | v16.1.4 (App Router) |
| **Lenguaje** | TypeScript | v5+ (Strict Mode) |
| **UI Library** | React | v19.2.3 |
| **Estilos** | Tailwind CSS | v4 (PostCSS plugin) |
| **Iconos** | Lucide React | |
| **Testing** | Vitest + React Testing Library | |
| **Linting** | ESLint | core-web-vitals + typescript |
| **Package Manager** | pnpm | |

---

## 📂 Estructura de Proyecto

```text
/
├── app/                    # Rutas App Router
│   ├── [id]/               # Ruta dinámica de detalle
│   ├── layout.tsx          # Layout raíz
│   ├── page.tsx            # Página principal
│   ├── loading.tsx         # Estado de carga
│   └── globals.css         # Estilos globales (Tailwind)
├── components/             # Componentes reutilizables (14 componentes)
│   ├── PokemonCard.tsx     # Tarjeta de pokémon
│   ├── SearchBar.tsx       # Barra de búsqueda
│   ├── TypeFilter.tsx      # Filtro por tipo
│   ├── RegionFilter.tsx    # Filtro por región
│   ├── ThemeSelector.tsx   # Selector de tema (claro/oscuro)
│   ├── LanguageSelector.tsx# Selector de idioma
│   └── ...                 # Otros componentes
├── lib/                    # Lógica de negocio y utilidades
│   ├── types.ts            # Interfaces TypeScript
│   ├── pokeapi.ts          # Servicio de API (PokeAPI)
│   ├── i18n.ts             # Internacionalización
│   ├── constants.ts        # Constantes (colores, regiones)
│   └── utils.ts            # Funciones helper
├── test/                   # Tests (coubicación o aquí)
├── public/                 # Assets estáticos
└── AGENTS.md               # ESTE ARCHIVO
```

---

## 🏛️ Principios de Diseño (SOLID para React)

### S - Single Responsibility
- **Un componente = una responsabilidad**: Si un componente hace fetch de datos Y renderiza UI, separar en container/presentational.
- **Ejemplo**: `PokemonCard` solo renderiza; `pokeapi.ts` solo hace fetch.

### O - Open/Closed
- **Extensible sin modificar**: Usar props y composición para extender comportamiento.
- **Ejemplo**: `SearchBar` acepta `placeholder` como prop para personalizarse.

### L - Liskov Substitution
- **Interfaces consistentes**: Props de componentes similares deben ser intercambiables.
- **Ejemplo**: Filtros (`TypeFilter`, `RegionFilter`) comparten patrones similares.

### I - Interface Segregation
- **Interfaces pequeñas y específicas**: No pasar objetos completos si solo se necesitan algunos campos.
- **Ejemplo**: Pasar `lang: Language` en lugar de todo el contexto.

### D - Dependency Inversion
- **Depender de abstracciones**: Las funciones de API están centralizadas en `lib/pokeapi.ts`.
- **Los componentes no hacen fetch directo**: Usan funciones del servicio.

---

## 📐 Reglas de Desarrollo

### 1. TypeScript
- **Strict mode activado**: No desactivar flags de `tsconfig.json`.
- **Tipado explícito**: Interfaces en `lib/types.ts` para datos de API.
- **Evitar `any`**: Usar `unknown` + type narrowing si es necesario.
- **Path aliases**: Usar `@/` para imports (ej: `@/lib/types`).

### 2. Next.js & React
- **Server Components por defecto**: En `app/`, todo es Server Component.
- **`'use client'`**: SOLO cuando hay:
  - `useState`, `useEffect`, `useContext`
  - Event handlers (`onClick`, `onChange`)
  - Hooks de navegación (`useRouter`, `useSearchParams`)
- **Componentes funcionales**: `const Component = () => {}`.
- **Nombrado PascalCase**: `PokemonCard.tsx`, no `pokemon-card.tsx`.

### 3. Estilos (Tailwind CSS v4)
- **`darkMode: 'selector'`**: Controlado por clase en HTML, no por media query.
- **Mobile-first**: Clases base para móvil, prefijos (`sm:`, `md:`, `lg:`) para desktop.
- **Clases estándar**: Evitar valores arbitrarios `[...]` si existe utilidad.
- **Diseño premium**: Sombras suaves, bordes redondeados, transiciones.

### 4. API & Data Fetching
- **Servicio centralizado**: `lib/pokeapi.ts` contiene todas las funciones de fetch.
- **Tipos definidos**: Todas las respuestas tipadas con interfaces de `lib/types.ts`.
- **Caching**: Next.js cachea por defecto en Server Components.

---

## 🧪 Testing

### Framework & Librerías
| Librería | Propósito |
| :--- | :--- |
| `vitest` | Test runner |
| `@testing-library/react` | Renderizado y queries |
| `@testing-library/user-event` | Simulación de interacción |
| `jsdom` | Entorno de navegador |

### Comandos
```bash
pnpm test          # Ejecutar tests
pnpm test --watch  # Modo watch
```

### Patrones de Testing
```typescript
// 1. Imports
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// 2. Mocks de Next.js (si es necesario)
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useSearchParams: () => ({ get: vi.fn() }),
  usePathname: () => '/',
}));

// 3. Estructura de tests
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Arrange
    render(<Component />);
    
    // Act (si aplica)
    
    // Assert
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Reglas de Testing
1. **Testear comportamiento, no implementación**: Usar queries accesibles (`getByRole`, `getByText`).
2. **AAA Pattern**: Arrange → Act → Assert.
3. **Mocking**: Mockear `next/navigation` para componentes con routing.
4. **Ubicación**: Tests en `test/` o coubicados como `Component.test.tsx`.

---

## ✅ Calidad de Código

### ESLint
- **Configuración**: `eslint-config-next` con `core-web-vitals` y `typescript`.
- **Ejecutar**: `pnpm lint`.

### Pre-commit Checklist
- [ ] Sin errores de TypeScript (`pnpm build`)
- [ ] Sin warnings de ESLint (`pnpm lint`)
- [ ] Tests pasando (`pnpm test`)
- [ ] Sin `console.log` en producción
- [ ] Sin código comentado

---

## 🤖 Comportamiento del Agente

### Idioma
- **Comunicación con usuario**: Español.
- **Código (variables, funciones, comentarios)**: Inglés.

### Proactividad
- **Errores obvios**: Corregir typos, bugs lógicos evidentes.
- **Clean code**: Eliminar código muerto, `console.log`, imports no usados.

### Task Tracking
- Mantener `task.md` actualizado.
- Usar `task_boundary` para reportar progreso.

### UI Specifics (Decisiones del Proyecto)
- **NO** mostrar altura/peso en tarjetas de la lista principal.
- **NO** duplicar selectores de tema/idioma en páginas de detalle.
- Ocultar filtros/búsqueda en páginas de detalle.

---

## 🔄 Flujo de Trabajo Recomendado

1. **Entender el contexto**: Leer este archivo y `README.md`.
2. **Explorar antes de editar**: Usar `view_file_outline`, `grep_search`.
3. **Cambios incrementales**: Commits pequeños y descriptivos.
4. **Verificar**: `pnpm lint && pnpm test && pnpm build`.
5. **Documentar**: Actualizar `AGENTS.md` si hay decisiones arquitectónicas nuevas.
