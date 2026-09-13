import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createRecipe } from "../api/client";
import { useAuth } from "../context/AuthContext";

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
  const [ingredients, setIngredients] = useState<IngredientForm[]>([
    { name: "", quantity: "", unit: "" },
  ]);
  const [steps, setSteps] = useState<StepForm[]>([{ description: "" }]);
  const [error, setError] = useState<string | null>(null);

  if (!user) {
    return (
      <p>
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
    <section>
      <h1>Nueva receta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={35}
            required
          />
        </label>
        <label>
          Descripción
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
          />
        </label>

        <h2>Ingredientes</h2>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>
              Nombre
              <input
                value={ingredient.name}
                onChange={(e) =>
                  updateIngredient(index, "name", e.target.value)
                }
                required
              />
            </label>
            <label>
              Cantidad
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) =>
                  updateIngredient(index, "quantity", e.target.value)
                }
                required
              />
            </label>
            <label>
              Unidad
              <input
                value={ingredient.unit}
                onChange={(e) =>
                  updateIngredient(index, "unit", e.target.value)
                }
                placeholder="g, ud..."
              />
            </label>
            {ingredients.length > 1 ? (
              <button type="button" onClick={() => removeIngredient(index)}>
                Quitar ingrediente
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setIngredients([
              ...ingredients,
              { name: "", quantity: "", unit: "" },
            ])
          }
        >
          Añadir ingrediente
        </button>

        <h2>Pasos</h2>
        {steps.map((step, index) => (
          <div key={index}>
            <label>
              Paso {index + 1}
              <textarea
                value={step.description}
                onChange={(e) => updateStep(index, e.target.value)}
                required
              />
            </label>
            {steps.length > 1 ? (
              <button type="button" onClick={() => removeStep(index)}>
                Quitar paso
              </button>
            ) : null}
          </div>
        ))}
        <button
          type="button"
          onClick={() => setSteps([...steps, { description: "" }])}
        >
          Añadir paso
        </button>

        {error ? <p>{error}</p> : null}
        <Link to="/">Cancelar</Link>
        <button type="submit">Crear receta</button>
      </form>
    </section>
  );
}
