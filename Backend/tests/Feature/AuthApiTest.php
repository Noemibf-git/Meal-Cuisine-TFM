<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/** Login por API: email + password y respuesta con token Bearer (Sanctum, no JWT). */

class AuthApiTest extends TestCase
{
    use RefreshDatabase;
        public function test_login_devuelve_token(): void
    {
        $user = User::factory()->create([
            'email' => 'noe@test.com',
        ]);

        $response = $this->postJson('/api/login', [
            'email' => 'noe@test.com',
            'password' => 'password',
        ]);

        $response->assertOk();
        $response->assertJsonStructure([
            'token',
            'user' => ['id', 'username', 'email', 'role'],
        ]);
        $response->assertJsonPath('user.email', 'noe@test.com');
    }
}