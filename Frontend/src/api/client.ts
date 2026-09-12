import type { AuthResponse } from '../types/User'

const baseUrl = import.meta.env.VITE_API_URL

export async function getRecipes() {
  const response = await fetch(`${baseUrl}/recipes`)
  if (!response.ok) {
    throw new Error('No se han podido cargar las recetas')
  }
  return response.json()
}

export async function getRecipe(id: number) {
  const response = await fetch(`${baseUrl}/recipes/${id}`)
  if (!response.ok) {
    throw new Error('No se ha podido cargar la receta')
  }
  return response.json()
}


export async function login(email: string, password: string) {
  const response = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Email o contraseña incorrectos')
  }

  const data: AuthResponse = await response.json()
  localStorage.setItem('token', data.token)
  return data.user
}