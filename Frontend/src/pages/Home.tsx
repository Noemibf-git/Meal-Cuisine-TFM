import { useEffect, useState } from 'react'
import { getRecipes } from '../api/client'
import type { Recipe } from '../types/recipe'
import RecipeCard from '../components/RecipeCard'

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    getRecipes()
      .then((data: Recipe[]) => setRecipes(data))
      .catch(() => setError('No se han podido cargar las recetas'))
      .finally(() => setLoading(false))
  }, [])

  const buscadas = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.trim().toLowerCase())
  )

  if (loading) return <p>Cargando…</p>
  if (error) return <p>{error}</p>

  return (
    <section>
      <h1>Meal Cuisine</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label>
          Buscar receta
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ej: tortilla"
          />
        </label>
      </form>

      {query.trim() === '' ? (
        <p>Escribe un nombre para ver recetas.</p>
      ) : buscadas.length === 0 ? (
        <p>No hay recetas con ese nombre.</p>
      ) : (
        buscadas.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </section>
  )
}