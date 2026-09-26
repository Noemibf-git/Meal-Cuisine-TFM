import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createRecipe } from "../api/client";
import { useAuth } from "../context/AuthContext";
import styles from "./CreateRecipe.module.css";

type IngredientForm = {
  name: string;
  quantity: string;
  unit: string;
};

type StepForm = {
  description: string;
};

export default function CreateRecipe() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imagen, setImagen] = useState("");
  const [ingredients, setIngredients] = useState<IngredientForm[]>([
    { name: "", quantity: "", unit: "" },
  ]);
  const [steps, setSteps] = useState<StepForm[]>([{ description: "" }]);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <p className={styles.notice}>
        Tienes que <Link to="/login">entrar</Link> para crear una receta.
      </p>
    );
  }

  function updateIngredient(
    index: number,
    field: keyof IngredientForm,
    value: string,
  ) {
    setIngredients(
      ingredients.map((ingredient, i) =>
        i === index ? { ...ingredient, [field]: value } : ingredient,
      ),
    );
  }

  function updateStep(index: number, value: string) {
    setSteps(
      steps.map((step, i) =>
        i === index ? { ...step, description: value } : step,
      ),
    );
  }
  function removeIngredient(index: number) {
    if (ingredients.length === 1) return;
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function removeStep(index: number) {
    if (steps.length === 1) return;
    setSteps(steps.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const created = await createRecipe({
        title,
        imagen: imagen.trim() === "" ? null : imagen.trim(),
        description: description.trim() === "" ? null : description,
        ingredients: ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: Number(ingredient.quantity),
          unit: ingredient.unit.trim() === "" ? null : ingredient.unit,
        })),
        steps: steps.map((step, index) => ({
          step_number: index + 1,
          description: step.description,
        })),
      });
      navigate(`/recetas/${created.id}`);
    } catch {
      setError("No se ha podido crear la receta");
    }
  }

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>Nueva receta</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Título
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={35}
            required
          />
        </label>
        <label className={styles.label}>
          Descripción
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
          />
        </label>
        <label className={styles.label}>
          URL de la foto (opcional)
          <input
            className={styles.input}
            type="url"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="https://..."
          />
        </label>
        <h2 className={styles.subtitle}>Ingredientes</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.row}>
            <label className={styles.label}>
              Nombre
              <input
                className={styles.input}
                value={ingredient.name}
                onChange={(e) =>
                  updateIngredient(index, "name", e.target.value)
                }
                required
              />
            </label>
            <label className={styles.label}>
              Cantidad
              <input
                className={styles.input}
                type="number"
                value={ingredient.quantity}
                onChange={(e) =>
                  updateIngredient(index, "quantity", e.target.value)
                }
                required
              />
            </label>
            <label className={styles.label}>
              Unidad
              <input
                className={styles.input}
                value={ingredient.unit}
                onChange={(e) =>
                  updateIngredient(index, "unit", e.target.value)
                }
                placeholder="g, ud..."
              />
            </label>
            {ingredients.length > 1 ? (
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeIngredient(index)}
              >
                Quitar ingrediente
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          className={styles.add}
          onClick={() =>
            setIngredients([
              ...ingredients,
              { name: "", quantity: "", unit: "" },
            ])
          }
        >
          Añadir ingrediente
        </button>

        <h2 className={styles.subtitle}>Pasos</h2>
        {steps.map((step, index) => (
          <div key={index} className={styles.row}>
            <label className={styles.label}>
              Paso {index + 1}
              <textarea
                className={styles.textarea}
                value={step.description}
                onChange={(e) => updateStep(index, e.target.value)}
                required
              />
            </label>
            {steps.length > 1 ? (
              <button
                type="button"
                className={styles.remove}
                onClick={() => removeStep(index)}
              >
                Quitar paso
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          className={styles.add}
          onClick={() => setSteps([...steps, { description: "" }])}
        >
          Añadir paso
        </button>

        {error ? <p className={styles.error}>{error}</p> : null}
        <div className={styles.actions}>
          <Link to="/" className={styles.cancel}>
            Cancelar
          </Link>
          <button type="submit" className={styles.submit}>
            Crear receta
          </button>
        </div>
      </form>
    </section>
  );
}
