import TuileFilm from "./TuileFilm";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, vi } from "vitest";
import { useNavigate } from "react-router-dom";

vi.mock("react-router-dom", async () => {
    return {
        useNavigate: vi.fn(),
    };
});

describe("TuileFilm", () => {
    const filmTest = {
        id: "1",
        titre: "Pour l'amour d'Hollywood",
        genres: ["Comédie", "Drame", "Musical"],
        description: "Un musicien et une actrice en herbe tombent amoureux à Los Angeles.",
        annee: "2016",
        realisation: "Damien Chazelle",
        titreVignette: "pourlamourdhollywood.jpg",
    };

    it("should exist", () => {
        const { container } = render(<TuileFilm film={filmTest}></TuileFilm>);
        const conteneurPrincipal = container.querySelector(".liste-films__element");
        const conteneurTitre = container.querySelector(".tuile-infos");

        expect(conteneurTitre.textContent).toBe(filmTest.titre);
        expect(conteneurPrincipal.id).toBe(filmTest.id);
    });

    it("should navigate to correct url", async () => {
        const mockedNavigate = vi.fn();
        useNavigate.mockReturnValue(mockedNavigate);

        const { container } = render(<TuileFilm film={filmTest}></TuileFilm>);
        
        const conteneurTitre = container.querySelector(".tuile-infos");
        await userEvent.click(conteneurTitre);

        expect(mockedNavigate).toBeCalledWith("/films/1");
    });
});
