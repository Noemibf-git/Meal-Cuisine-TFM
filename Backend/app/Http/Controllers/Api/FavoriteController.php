<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recipe;


//   Favoritas de la usuaria autenticada (Sanctum).
//   No hace falta modelo Favorite: se usa belongsToMany sobre favorites.
class FavoriteController extends Controller
{
    // GET /api/favorites — solo las mías, mismo with que el listado público.
    public function index(Request $request)
    {
        return $request->user()
            ->favoriteRecipes()
            ->with(['user:id,username', 'ingredients', 'steps'])
            ->get()
            ->map(function (Recipe $recipe) {
                 $recipe->setAttribute('is_favorite', true);
                return $recipe;
        });
    
    }       


    // POST — syncWithoutDetaching: añade sin quitar otras ni duplicar (unique).
    public function store(Request $request, Recipe $recipe)
    {
        $request->user()->favoriteRecipes()->syncWithoutDetaching([$recipe->id]);

        return response()->json(['is_favorite' => true]);
    }
    
    // DELETE — detach solo esta receta.
    public function destroy(Request $request, Recipe $recipe)
    {
        $request->user()->favoriteRecipes()->detach($recipe->id);

        return response()->json(['is_favorite' => false]);
    }
}

