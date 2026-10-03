import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../types/recipe";
import {
  describe,
  expect,
  it,
} from "vitest"; /*importo para que no de errores*/

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

    expect(
      screen.getByRole("heading", { name: "Tortilla" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Ver más" })).toHaveAttribute(
      "href",
      "/recetas/1",
    );
  });

  it("debe mostrar la foto cuando la receta tiene imagen", () => {
    render(
      <MemoryRouter>
        <RecipeCard
          recipe={{ ...recipe, imagen: "https://ejemplo.com/foto.jpg" }}
        />
      </MemoryRouter>,
    );
    expect(screen.getByRole("img", { name: "Tortilla" })).toHaveAttribute(
      "src",
      "https://ejemplo.com/foto.jpg",
    );
  });

  it("debe mostrar la descripcion cuando existe", () => {
    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>,
    );

    expect(screen.getByText("De patatas")).toBeInTheDocument();
  });
});
