import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Vitest no vacia el DOM entre tests. Sin esto, un it() ve lo que pinto el anterior
afterEach(() => {
  cleanup();
});

