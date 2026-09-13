import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { getRecipe, deleteRecipe } from "../api/client";
import type { Recipe } from "../types/recipe";
import { useAuth } from "../context/AuthContext";

export default function RecipeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getRecipe(Number(id))
      .then(setRecipe)
      .catch(() => setError("No se ha podido cargar la receta"));
  }, [id]);

  async function handleDelete() {
    if (!id) return;
    const ok = window.confirm("¿Seguro que quieres borrar esta receta?");
    if (!ok) return;
    try {
      await deleteRecipe(Number(id));
      navigate("/");
    } catch {
      setError("No se ha podido borrar la receta");
    }
  }
  if (error) return <p>{error}</p>;
  if (!recipe) return <p>Cargando…</p>;

  const canDelete =
    user !== null && (user.id === recipe.user_id || user.role === "admin");

  return (
    <article>
      <p>
        <Link to="/">← Volver</Link>
      </p>
      <h1>{recipe.title}</h1>
      {recipe.description ? <p>{recipe.description}</p> : null}

      {recipe.ingredients && recipe.ingredients.length > 0 ? (
        <>
          <h2>Ingredientes</h2>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.pivot.quantity} {ingredient.pivot.unit ?? ""}{" "}
                {ingredient.name}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {recipe.steps && recipe.steps.length > 0 ? (
        <>
          <h2>Pasos</h2>
          <ol>
            {recipe.steps.map((step) => (
              <li key={step.id}>{step.description}</li>
            ))}
          </ol>
        </>
      ) : null}

      {canDelete ? (
        <button type="button" onClick={handleDelete}>
          Borrar receta
        </button>
      ) : null}
    </article>
  );
}
