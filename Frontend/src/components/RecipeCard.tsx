import { Link } from "react-router";
import type { Recipe } from "../types/recipe";
import styles from "./RecipeCard.module.css";
import { useState } from "react";
import { addFavorite, removeFavorite } from "../api/client";
import { useAuth } from "../context/useAuth";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(recipe.is_favorite === true);
  
  async function handleFavorite() {
    if (!user) return;
    try {
      if (isFavorite) {
        await removeFavorite(recipe.id);
        setIsFavorite(false);
      } else {
        await addFavorite(recipe.id);
        setIsFavorite(true);
      }
    } catch {
      // El corazon no cambia si el API falla.
    }
  }

  return (
    <article className={styles.card}>
      <button
        type="button"
        className={`${styles.heart} ${isFavorite ? styles.heartOn : styles.heartOff}`}
        disabled={!user}
        onClick={handleFavorite}
        aria-label={isFavorite ? "Quitar de favoritas" : "Añadir a favoritas"}
      >
        ♥
      </button>
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
