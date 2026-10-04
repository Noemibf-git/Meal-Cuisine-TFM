# Meal Cuisine — Backend

API del TFM: recetas, comentarios favoritos y autenticación.

## Tecnologías

- Laravel 12
- PHP
- Laravel Sanctum (token Bearer, no JWT)
- MySQL (en local, XAMPP)

## Qué hace

Expone rutas bajo `/api`: listar y ver recetas (público), login y registro, crear receta, comentarios (GET público, POST/DELETE con token), favoritas GET /api/favorites, POST/DELETE /api/recipes/{id}/favorite (Sanctum). El frontend React consume esta API.

## Instalación (local)

1. Arrancar MySQL en XAMPP y crear una base vacía (por ejemplo `recetas`).
2. En esta carpeta:

```bash
composer install
copy .env.example .env
php artisan key:generate
```

3. En `.env` poner MySQL (`DB_CONNECTION=mysql` y el nombre de la base). El example viene en SQLite.
4. `php artisan migrate` y `php artisan serve`.
5. API: `http://127.0.0.1:8000/api`.

El frontend se arranca aparte (`Frontend`, puerto 5173). Instrucciones juntas: README de la raíz del repositorio.

## Tests

```bash
php artisan test --filter=ApiTest
```

Una prueba Feature por recurso (recetas, auth, comentarios y favoritas). Usan SQLite en memoria, no MySQL.

## Entorno local

No está publicado en un hosting. Se trabaja con MySQL (XAMPP), el `.env` de esta carpeta y `php artisan serve`.