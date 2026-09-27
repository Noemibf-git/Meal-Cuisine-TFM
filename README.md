# Meal Cuisine

Trabajo de Fin de Máster: aplicación de recetas y comentarios.

- Backend: Laravel 12 y Sanctum (token Bearer, no JWT).
- Frontend: React, TypeScript y Vite.
- Estilos: CSS Modules.

No se usa TheMealDB.

## Requisitos

- PHP 8.2+
- Composer
- Node.js
- XAMPP (MySQL). El frontend no se sirve con Apache.


## Backend

Arranca MySQL en XAMPP. Crea una base vacía en phpMyAdmin.

```bash
cd Backend
composer install
copy .env.example .env
php artisan key:generate

```

En `Backend/.env` pon MySQL (el example viene en SQLite):

``` 
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=recetas
DB_USERNAME=root
DB_PASSWORD=
```
```bash
php artisan migrate
php artisan serve

```
La API queda en `http://127.0.0.1:8000/api`.

## Frontend

En la carpeta `Frontend` crea un archivo `.env` (no se sube a git) con:

```
VITE_API_URL=http://127.0.0.1:8000/api
```

Luego:

```bash
cd Frontend
npm install
npm run dev
```
Se abre `http://localhost:5173/`. Hace falta tener a la vez `php artisan serve` (puerto 8000) y `npm run dev` (puerto 5173).

El listado de recetas es público. Crear receta y comentar requieren iniciar sesión (el token se guarda en el navegador).

## Tests

Pruebas de integración de la API (PHPUnit, Feature). Hay al menos una por recurso: recetas, autenticación y comentarios.

```bash
cd Backend
php artisan test --filter=ApiTest
```

Prueba de frontend (Vitest y React Testing Library) del componente `RecipeCard`:

```bash
cd Frontend
npm test
```

Los tests de Laravel usan SQLite en memoria (`phpunit.xml`). No escriben en MySQL.

## Entorno local

XAMPP (MySQL) + `php artisan serve` + `npm run dev` en `http://localhost:5173/`.