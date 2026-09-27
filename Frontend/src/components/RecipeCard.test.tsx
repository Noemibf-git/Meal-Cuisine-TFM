import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../types/recipe";
import { describe, expect, it } from "vitest"; /*importo para que no de errores*/

const recipe: Recipe = {
  id: 1,
  title: "Tortilla",
  description: "De patatas",
  imagen: null,
  user_id: 2,
};

describe("RecipeCard", () => {
  it("debe mostrar el titulo y el enlace al detalle cuando recibe una receta", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Tortilla" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver más" })).toHaveAttribute(
      "href",
      "/recetas/1",
    );
  });
});