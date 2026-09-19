import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getRecipes } from '../api/client'
import type { Recipe } from '../types/recipe'
import RecipeCard from '../components/RecipeCard'
import { useAuth } from '../context/AuthContext'

export default function MyRecipes() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    getRecipes()
      .then((data: Recipe[]) => setRecipes(data))
      .catch(() => setError('No se han podido cargar las recetas'))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <p>
        Tienes que <Link to="/login">entrar</Link> para ver tus recetas.
      </p>
    )
  }

  if (loading) return <p>Cargando…</p>
  if (error) return <p>{error}</p>

  const mine = recipes.filter((recipe) => recipe.user_id === user.id)

  return (
    <section>
      <h1>Mis recetas</h1>
      {mine.length === 0 ? (
        <p>
          Aún no has creado ninguna receta.{' '}
          <Link to="/recetas/nueva">Nueva receta</Link>
        </p>
      ) : (
        mine.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      )}
    </section>
  )
}