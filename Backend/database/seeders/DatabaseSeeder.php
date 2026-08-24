<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Recipe;
use App\Models\Ingredient;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(UserSeeder::class);

        $users = User::all();

        $users->each(function ($user) {
            // 1) Crear receta (tabla recipes)
            $recipe = Recipe::factory()->create([
                'user_id' => $user->id,
            ]);

            // 2) Crear/reutilizar ingredientes (tabla ingredients)
            //    y unirlos a la receta (tabla recipe_ingredients)
            $ingredientNames = ['patatas', 'huevos', 'cebolla'];

            foreach ($ingredientNames as $index => $name) {
                $ingredient = Ingredient::firstOrCreate([
                    'name' => $name,
                ]);

                $recipe->ingredients()->attach($ingredient->id, [
                    'quantity' => $index + 1,
                    'unit' => 'unidades',
                ]);
            }

            // 3) Crear pasos (tabla recipe_steps)
            $recipe->steps()->createMany([
                [
                    'step_number' => 1,
                    'description' => 'Preparar los ingredientes',
                ],
                [
                    'step_number' => 2,
                    'description' => 'Cocinar la receta',
                ],
                [
                    'step_number' => 3,
                    'description' => 'Servir y disfrutar',
                ],
            ]);
        });
    }
}
