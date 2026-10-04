# Meal Cuisine — Frontend

Interfaz del TFM: recetas, comentarios, login, “mis recetas” y favoritas.

## Tecnologías

- React y TypeScript
- Vite
- React Router
- CSS Modules
- Vitest y React Testing Library

## Qué hace

Páginas para ver recetas, detalle con comentarios, crear receta (con URL de foto opcional), registro/login, listado de recetas propias y listado de recetas favoritas. Habla con el backend Laravel (`VITE_API_URL`). Autenticación: token Sanctum en `localStorage` (no JWT). Estilos propios.

## Instalación (local)

Hace falta el backend en marcha (`php artisan serve`, puerto 8000) y MySQL en XAMPP.

En esta carpeta, archivo `.env` (no se sube a git):

```
VITE_API_URL=http://127.0.0.1:8000/api
```

```bash
npm install
npm run dev
```

Se abre `http://localhost:5173/`. No se usa Apache para el front.

Más detalle: README de la raíz del repositorio.

## Tests

```bash
npm test
```

Prueba del componente `RecipeCard` (título y enlace al detalle, descripción, foto y corazón activado o desactivado).