<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\RecipeStep;
use Illuminate\Support\Facades\Auth;
use OpenApi\Attributes as OA;

class RecipeStepController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    #[OA\Get(path: '/api/recipes/{id}/steps', summary: 'Ver los pasos de una receta', tags: ['Pasos'])]
    #[OA\Parameter(name: 'id', in: 'path', required: true, schema: new OA\Schema(type: 'integer'))]
    #[OA\Response(response: 200, description: 'Lista de pasos')]

    public function index(Recipe $recipe)
    {
        return response()->json($recipe->steps);
    }

    public function show(Recipe $recipe, RecipeStep $step)
    {
        if ($step->recipe_id !== $recipe->id) {
            return response()->json(['message' => 'Paso no encontrado en esta receta'], 404);
        }

        return response()->json($step);
    }

    public function store(Request $request, Recipe $recipe)
    {
        if ($recipe->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'step_number' => 'required|integer',
            'description' => 'required|string',
        ]);

        $step = $recipe->steps()->create($data);

        return response()->json($step, 201);
    }

    public function update(Request $request, Recipe $recipe, RecipeStep $step)
    {
        if ($recipe->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if ($step->recipe_id !== $recipe->id) {
            return response()->json(['message' => 'Paso no encontrado en esta receta'], 404);
        }

        $data = $request->validate([
            'step_number' => 'sometimes|required|integer',
            'description' => 'sometimes|required|string',
        ]);

        $step->update($data);

        return response()->json($step);
    }

    public function destroy(Recipe $recipe, RecipeStep $step)
    {
        if ($recipe->user_id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        if ($step->recipe_id !== $recipe->id) {
            return response()->json(['message' => 'Paso no encontrado en esta receta'], 404);
        }

        $step->delete();

        return response()->json(['message' => 'Paso eliminado correctamente']);
    }
}
