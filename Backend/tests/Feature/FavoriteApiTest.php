<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/** Marcar y listar favoritas (Sanctum). */

class FavoriteApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_autenticado_puede_marcar_favorita(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson(
            "/api/recipes/{$recipe->id}/favorite",
        );

        $response->assertOk();
        $response->assertJsonPath('is_favorite', true);
        $this->assertDatabaseHas('favorites', [
            'user_id' => $user->id,
            'recipe_id' => $recipe->id,
        ]);
    }

    public function test_usuario_autenticado_puede_listar_favoritas(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create();
        $user->favoriteRecipes()->syncWithoutDetaching([$recipe->id]);

        $response = $this->actingAs($user, 'sanctum')->getJson('/api/favorites');

        $response->assertOk();
        $response->assertJsonCount(1);
        $response->assertJsonPath('0.id', $recipe->id);
        $response->assertJsonPath('0.is_favorite', true);
    }

    public function test_sin_token_no_puede_marcar_favorita(): void
    {
        $recipe = Recipe::factory()->create();

        $this->postJson("/api/recipes/{$recipe->id}/favorite")
            ->assertUnauthorized();
    }
}