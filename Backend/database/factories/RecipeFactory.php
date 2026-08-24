<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Recipe;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    protected $model = Recipe::class;

    public function definition(): array
    {
        // Solo columnas de la tabla recipes
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(2),
            'imagen' => null,
        ];
    }
}
