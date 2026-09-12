import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { getRecipe } from '../api/client'
import type { Recipe } from '../types/recipe'

export default function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getRecipe(Number(id))
      .then(setRecipe)
      .catch(() => setError('No se ha podido cargar la receta'))
  }, [id])

  if (error) return <p>{error}</p>
  if (!recipe) return <p>Cargando…</p>

  return (
    <article>
      <p>
        <Link to="/">← Volver</Link>
      </p>
      <h1>{recipe.title}</h1>
      {recipe.description ? <p>{recipe.description}</p> : null}
    </article>
  )
}