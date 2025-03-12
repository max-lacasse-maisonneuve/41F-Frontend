import Nav from "./Nav";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, vi } from "vitest";
import { useLocation, MemoryRouter } from "react-router-dom";

describe("Nav", () => {
    it("should display a nav", () => {
        const { container } = render(
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        );
        expect(screen.getByText("Accueil")).toBeInTheDocument();

        const liens = container.querySelectorAll("a");
        expect(liens.length).toBe(5);
    });

    it("should link to the right page", async () => {
        render(
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        );
        const lienAccueil = screen.getByText("Accueil");
        expect(lienAccueil).toBeInTheDocument();
        expect(lienAccueil).toHaveAttribute("href", "/");

        const listeFilms = screen.getByText("Liste des films");
        expect(listeFilms).toBeInTheDocument();
        expect(listeFilms).toHaveAttribute("href", "/films");
    });
});
