import { Link } from 'react-router'
import type { Recipe } from '../types/recipe'

type RecipeCardProps = {
  recipe: Recipe
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article>
      <h2>{recipe.title}</h2>
      {recipe.description ? <p>{recipe.description}</p> : null}
      <Link to={`/recetas/${recipe.id}`}>Ver más</Link>
    </article>
  )
}