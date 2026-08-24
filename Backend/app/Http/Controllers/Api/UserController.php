<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::select('id', 'username', 'email', 'role', 'created_at')->get());
    }

    public function show(User $user)
    {
        if ($user->id === Auth::id() || Auth::user()->role === 'admin') {
            return response()->json($user->only('id', 'username', 'email', 'role', 'created_at'));
        }
        return response()->json($user->only('id', 'username', 'role'));
    }

    public function update(Request $request, User $user)
    {
        if ($user->id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'username' => 'sometimes|required|string|max:255|unique:users,username,' . $user->id,
            'email'    => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|required|string|min:8|confirmed',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return response()->json($user->only('id', 'username', 'email', 'role', 'created_at'));
    }

    public function destroy(User $user)
    {
        if ($user->id !== Auth::id() && Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        // SoftDeletes: el usuario se marca con deleted_at (no se borra la fila).
        // Los tokens de Sanctum sí se borran para que no pueda seguir usando la API.
        $user->tokens()->delete();
        $user->delete();

        return response()->json(['message' => 'Usuario eliminado correctamente']);
    }
}

