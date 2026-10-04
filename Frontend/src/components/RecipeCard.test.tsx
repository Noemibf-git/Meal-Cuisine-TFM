import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import RecipeCard from "./RecipeCard";
import type { Recipe } from "../types/recipe";
import { AuthContext } from "../context/useAuth";
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

const guestAuth = {
  user: null,
  setUser: () => {},
  logout: async () => {},
};

const userAuth = {
  user: { id: 1, username: "Noe", email: "noe@test.com", role: "user" },
  setUser: () => {},
  logout: async () => {},
};

describe("RecipeCard", () => {
  it("debe mostrar el titulo y el enlace al detalle cuando recibe una receta", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={guestAuth}>
          <RecipeCard recipe={recipe} />
        </AuthContext.Provider>
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
        <AuthContext.Provider value={guestAuth}>
          <RecipeCard
            recipe={{ ...recipe, imagen: "https://ejemplo.com/foto.jpg" }}
          />
        </AuthContext.Provider>
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
        <AuthContext.Provider value={guestAuth}>
          <RecipeCard recipe={recipe} />
        </AuthContext.Provider>
      </MemoryRouter>,
    );

    expect(screen.getByText("De patatas")).toBeInTheDocument();
  });
  it("debe dejar el corazon desactivado si no hay sesion", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={guestAuth}>
          <RecipeCard recipe={recipe} />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: "Añadir a favoritas" }),
    ).toBeDisabled();
  });
  it("debe activar el corazon si hay sesion", () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={userAuth}>
          <RecipeCard recipe={recipe} />
        </AuthContext.Provider>
      </MemoryRouter>,
    );
    expect(
      screen.getByRole("button", { name: "Añadir a favoritas" }),
    ).toBeEnabled();
  });
});
