import TuileFilm from "./TuileFilm";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom"; //On importe quand même le useNavigate pour que le mock fonctionne
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";

//On fait semblant que le react-router-dom existe
// et on mock le useNavigate pour qu'il ne fasse rien
vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(), // Mock useNavigate
}));

describe("TuileFilm", () => {
    it("should render a film", async () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate); // Mock useNavigate

        const film = {
            id: "1",
            titre: "Parasite",
            description:
                "Toute la famille de Ki-taek est au chômage, et s'intéresse fortement au train de vie de la richissime famille Park, jusqu'à ce qu'ils soient impliqués dans un incident inattendu.",
            annee: "2019",
            genres: ["Drame", "Thriller"],
            realisation: "Bong Joon Ho",
            titreVignette: "parasite.jpg",
        };

        render(<TuileFilm film={film}></TuileFilm>);
        expect(screen.getByText(film.titre)).toBeInTheDocument();

        const clickableElement = screen.getByText(film.titre);
        await userEvent.click(clickableElement);
        expect(mockNavigate).toHaveBeenCalledWith("/films/1");
    });

    it("should render an empty string if no title is passed", async () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);

        const film = {
            id: "1",
            titre: undefined,
            description:
                "Toute la famille de Ki-taek est au chômage, et s'intéresse fortement au train de vie de la richissime famille Park, jusqu'à ce qu'ils soient impliqués dans un incident inattendu.",
            annee: "2019",
            genres: ["Drame", "Thriller"],
            realisation: "Bong Joon Ho",
            titreVignette: "parasite.jpg",
        };
        const { container } = render(<TuileFilm film={film}></TuileFilm>);
        const titre = container.querySelector(".tuile-infos");

        expect(titre.textContent).toBe("");
    });
});
