import type { AuthResponse, User } from "../types/User";
import type { Recipe } from "../types/recipe";
import type { Comment } from "../types/comment";


const baseUrl = import.meta.env.VITE_API_URL;

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export async function getRecipes() {
  const response = await fetch(`${baseUrl}/recipes`);
  if (!response.ok) {
    throw new Error("No se han podido cargar las recetas");
  }
  return response.json();
}

export async function getRecipe(id: number) {
  const response = await fetch(`${baseUrl}/recipes/${id}`);
  if (!response.ok) {
    throw new Error("No se ha podido cargar la receta");
  }
  return response.json();
}

export async function login(email: string, password: string) {
  const response = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Email o contraseña incorrectos");
  }

  const data: AuthResponse = await response.json();
  localStorage.setItem("token", data.token);
  return data.user;
}

export async function getMe() {
  const response = await fetch(`${baseUrl}/me`, {
    headers: authHeaders(),
  });
  if (!response.ok) {
    localStorage.removeItem("token");
    throw new Error("Sesión no válida");
  }
  return response.json() as Promise<User>;
}

export async function logout() {
  await fetch(`${baseUrl}/logout`, {
    method: "POST",
    headers: authHeaders(),
  });
  localStorage.removeItem("token");
}

export async function register(
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
) {
  const response = await fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      email,
      password,
      password_confirmation,
    }),
  });

  if (!response.ok) {
    throw new Error("No se ha podido crear la cuenta");
  }
}
export async function createRecipe(payload: {
  title: string;
  description: string | null;
  ingredients: { name: string; quantity: number; unit: string | null }[];
  steps: { step_number: number; description: string }[];
}) {
  const response = await fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    throw new Error("No se ha podido crear la receta");
  }
  return response.json() as Promise<Recipe>;
}
export async function deleteRecipe(id: number) {
  const response = await fetch(`${baseUrl}/recipes/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (!response.ok) {
    throw new Error("No se ha podido borrar la receta");
  }
}

export async function getComments(recipeId: number) {
  const response = await fetch(`${baseUrl}/recipes/${recipeId}/comments`)
  if (!response.ok) {
    throw new Error('No se han podido cargar los comentarios')
  }
  return response.json() as Promise<Comment[]>
}

export async function createComment(recipeId: number, content: string) {
  const response = await fetch(`${baseUrl}/recipes/${recipeId}/comments`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ content }),
  })
  if (!response.ok) {
    throw new Error('No se ha podido publicar el comentario')
  }
  return response.json() as Promise<Comment>
}

export async function deleteComment(recipeId: number, commentId: number) {
  const response = await fetch(
    `${baseUrl}/recipes/${recipeId}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: authHeaders(),
    },
  )
  if (!response.ok) {
    throw new Error('No se ha podido borrar el comentario')
  }
}