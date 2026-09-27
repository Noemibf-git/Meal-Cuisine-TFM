<?php

namespace Tests\Feature;

use App\Models\Recipe;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CommentApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_usuario_autenticado_puede_comentar(): void
    {
        $user = User::factory()->create();
        $recipe = Recipe::factory()->create();

        $response = $this->actingAs($user, 'sanctum')->postJson(
            "/api/recipes/{$recipe->id}/comments",
            ['content' => 'Muy rica'],
        );

        $response->assertCreated();
        $response->assertJsonPath('content', 'Muy rica');
        $this->assertDatabaseHas('comments', [
            'recipe_id' => $recipe->id,
            'user_id' => $user->id,
            'content' => 'Muy rica',
        ]);
    }
}