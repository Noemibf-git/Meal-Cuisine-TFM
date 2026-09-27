<?php

namespace Tests\Feature;

use App\Models\Recipe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

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
}