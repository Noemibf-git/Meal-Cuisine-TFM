import { useEffect, useState } from "react";
import { getRecipes } from "../api/client";
import type { Recipe } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";
import styles from "./Home.module.css";

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
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Meal Cuisine, recetas fáciles, rápidas y deliciosas
        </h1>
        <p className={styles.heroText}>
          Encuentra inspiración culinaria para tu día a día.
        </p>
      </div>
      <div className={styles.about}>
        <h2 className={styles.aboutTitle}>¿Qué es Meal Cuisine?</h2>
        <p className={styles.aboutText}>
          En Meal Cuisine creemos que cocinar no solo es preparar alimentos,
          sino también crear momentos, explorar sabores y conectar con la
          cultura de cada plato. Por eso, te ofrecemos recetas claras, fáciles
          de seguir y adaptadas a distintos niveles, para que cocinar sea un
          placer accesible para todos.
        </p>
      </div>
      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label className={styles.label}>
          Buscar receta
          <input
            className={styles.input}
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
          <div className={styles.grid}>
            {sought.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )
      ) : (
        <>
          <h2 className={styles.subtitle}>
            {showAll ? "Todas las recetas" : "Recetas del día"}
          </h2>
          <div className={styles.grid}>
            {visible.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
          {recipes.length > 3 ? (
            <button
              type="button"
              className={styles.more}
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Ver las del día" : "Ver todas"}
            </button>
          ) : null}
        </>
      )}
    </section>
  );
}
