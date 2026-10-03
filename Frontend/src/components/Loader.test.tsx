import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from "./Loader";

describe("Loader", () => {
  it("debe indicar que la pagina esta cargando", () => {
    render(<Loader />);

    expect(screen.getByRole("status")).toBeInTheDocument();
    expect(screen.getByText("Cargando")).toBeInTheDocument();
  });
});