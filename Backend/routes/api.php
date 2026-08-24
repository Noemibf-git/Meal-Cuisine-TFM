<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RecipesController;
use App\Http\Controllers\Api\IngredientController;
use App\Http\Controllers\Api\RecipeStepController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\UserController;


// Rutas públicas
//Limite de intentos para introducir contraseña
Route::middleware('throttle:5,1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});
Route::get('/recipes', [RecipesController::class, 'index']);
Route::get('/recipes/{recipe}', [RecipesController::class, 'show']);
Route::get('/recipes/{recipe}/steps', [RecipeStepController::class, 'index']);
Route::get('/ingredients', [IngredientController::class, 'index']);
Route::post('/ingredients/search', [IngredientController::class, 'search']);
Route::get('/ingredients/{ingredient}', [IngredientController::class, 'show']);
Route::get('/recipes/{recipe}/comments', [CommentController::class, 'index']);
Route::get('/recipes/{recipe}/steps/{step}', [RecipeStepController::class, 'show']);


// Usuario auntenticado 
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/recipes', [RecipesController::class, 'store']);
    Route::put('/recipes/{recipe}', [RecipesController::class, 'update']);
    Route::delete('/recipes/{recipe}', [RecipesController::class, 'destroy']);
    Route::post('/recipes/{recipe}/comments', [CommentController::class, 'store']);
    Route::delete('/recipes/{recipe}/comments/{comment}', [CommentController::class, 'destroy']);
    Route::post('/recipes/{recipe}/steps', [RecipeStepController::class, 'store']);
    Route::put('/recipes/{recipe}/steps/{step}', [RecipeStepController::class, 'update']);
    Route::delete('/recipes/{recipe}/steps/{step}', [RecipeStepController::class, 'destroy']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::put('/users/{user}', [UserController::class, 'update']);
    Route::delete('/users/{user}', [UserController::class, 'destroy']);
});

// ── SOLO ADMIN ────────────────────────────────────────────
Route::middleware(['auth:sanctum', 'es.admin'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
});