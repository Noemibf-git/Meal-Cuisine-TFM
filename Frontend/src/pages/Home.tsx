import { useEffect, useState } from "react";
import { getRecipes } from "../api/client";
import type { Recipe } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [featured, setFeatured] = useState<Recipe[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    getRecipes()
      .then((data: Recipe[]) => {
        setRecipes(data);
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setFeatured(shuffled.slice(0, 3));
      })
      .catch(() => setError("No se han podido cargar las recetas"))
      .finally(() => setLoading(false));
  }, []);

  const sought = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  if (loading) return <p>Cargando…</p>;
  if (error) return <p>{error}</p>;

  const visible = showAll ? recipes : featured;

  return (
    <section>
      <h1>Meal Cuisine</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
      
      {query.trim() !== "" ? (
        sought.length === 0 ? (
          <p>No hay recetas con ese nombre.</p>
        ) : (
          sought.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
        )
      ) : (
        <>
          <h2>{showAll ? "Todas las recetas" : "Recetas del día"}</h2>
          {visible.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          {recipes.length > 3 ? (
            <button type="button" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Ver las del día" : "Ver todas"}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
