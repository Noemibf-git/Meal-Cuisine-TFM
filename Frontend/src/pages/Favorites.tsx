import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getFavorites } from '../api/client'
import type { Recipe } from '../types/recipe'
import RecipeCard from '../components/RecipeCard'
import { useAuth } from '../context/useAuth'
import styles from './MyRecipes.module.css'
import Loader from '../components/Loader';

export default function Favorites() {
  const { user } = useAuth()
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return
    getFavorites()
      .then((data: Recipe[]) => setRecipes(data))
      .catch(() => setError('No se han podido cargar las recetas favoritas'))
      .finally(() => setLoading(false))
  }, [user])

  if (!user) {
    return (
      <p className={styles.notice}>
        Tienes que <Link to="/login">entrar</Link> para ver tus recetas.
      </p>
    )
  }

  if (loading) return <Loader/>
  if (error) return <p>{error}</p>

  return (
    <section>
      <h1 className={styles.title}>Favoritas</h1>
      {recipes.length === 0 ? (
        <p className={styles.empty}>
          Aún no has marcado ninguna receta.{' '}
          <Link to="/">Ir al inicio</Link>
        </p>
      ) : (
        <div className={styles.grid}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        </div>
      )}
    </section>
  )
} 