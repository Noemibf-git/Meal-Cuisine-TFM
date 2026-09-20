import { Link } from "react-router";
import type { Recipe } from "../types/recipe";
import styles from "./RecipeCard.module.css";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      {recipe.imagen ? (
        <img className={styles.image} src={recipe.imagen} alt={recipe.title} />
      ) : (
        <div className={styles.placeholder} aria-hidden="true" />
      )}
      <h2 className={styles.title}>{recipe.title}</h2>
      {recipe.description ? (
        <p className={styles.text}>{recipe.description}</p>
      ) : null}
      <Link to={`/recetas/${recipe.id}`} className={styles.link}>
        Ver más
      </Link>
    </article>
  );
}
