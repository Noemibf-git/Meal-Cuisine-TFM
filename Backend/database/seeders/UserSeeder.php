<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
        // Credenciales solo para desarrollo local. No usar en producción.
            'username' => 'Admin',
            'email' => 'admin@example.com',
            'password' => 'password', //Del hash se encarga la factory
            'role' => 'admin',
        ]);

        User::factory()->create([
            'username' => 'Usuario',
            'email' => 'user@example.com',
            'password' => 'password',
            'role' => 'user',
        ]);
    
        User::factory(10)->create();

    }
}
