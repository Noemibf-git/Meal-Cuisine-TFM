<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/**
 * Pruebas Feature del recurso Recetas (listar, crear, editar, borrar).
 * RefreshDatabase usa SQLite en memoria (phpunit.xml), no el MySQL de XAMPP.
 */
class RecipeApiTest extends TestCase
{
    use RefreshDatabase;
        public function test_lista_recetas_sin_token(): void
    {
        Recipe::factory()->count(2)->create();

        $response = $this->getJson('/api/recipes');

        $response->assertOk();
        $response->assertJsonCount(2);
    }

    public function test_usuario_autenticado_puede_crear_receta(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson('/api/recipes', [
            'title' => 'Tortilla',
            'description' => 'Clasica',
            'ingredients' => [
                ['name' => 'huevos', 'quantity' => 3, 'unit' => 'ud'],
            ],
            'steps' => [
                ['step_number' => 1, 'description' => 'Batir'],
            ],
        ]);

        $response->assertCreated();
        $this->assertDatabaseHas('recipes', [
            'title' => 'Tortilla',
            'user_id' => $user->id,
        ]);
    }

    public function test_duena_puede_editar_titulo(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->putJson(
            "/api/recipes/{$recipe->id}",
            ['title' => 'Tortilla nueva'],
        );

        $response->assertOk();
        $response->assertJsonPath('title', 'Tortilla nueva');
    }

    public function test_duena_puede_borrar_receta(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')->deleteJson(
            "/api/recipes/{$recipe->id}",
        );

        $response->assertOk();
        $this->assertSoftDeleted('recipes', ['id' => $recipe->id]);
    }
}

