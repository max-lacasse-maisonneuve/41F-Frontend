import ListeFilms from "./ListeFilms";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useNavigate } from "react-router-dom";

import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
vi.mock("react-router-dom", () => ({
    useNavigate: vi.fn(), // Mock useNavigate
}));
describe("ListeFilm", () => {
    beforeEach(() => {
        globalThis.fetch = vi.fn();
    });

    afterEach(() => {
        vi.resetAllMocks();
    });

    it("should fetch a list", async () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        globalThis.fetch.mockResolvedValueOnce({
            json: async () => [
                {
                    id: "1",
                    titre: "Parasite",
                    description:
                        "Toute la famille de Ki-taek est au chômage, et s'intéresse fortement au train de vie de la richissime famille Park, jusqu'à ce qu'ils soient impliqués dans un incident inattendu.",
                    annee: "2019",
                    genres: ["Drame", "Thriller"],
                    realisation: "Bong Joon Ho",
                    titreVignette: "parasite.jpg",
                },
            ],
        });
        const { container } = render(<ListeFilms></ListeFilms>);
        expect(document.querySelector(".spinner")).toBeInTheDocument();

        await waitFor(async () => {
            expect(container.querySelectorAll(".liste-films__element").length).toBe(1);
            const premierElement = container.querySelectorAll(".liste-films__element")[0];
            expect(document.querySelector(".spinner")).toBe(null);
            await userEvent.click(premierElement);
            expect(mockNavigate).toHaveBeenCalledWith("/films/1");
        });
    });

    it("should show an error", async () => {
        const mockNavigate = vi.fn();
        useNavigate.mockReturnValue(mockNavigate);
        globalThis.fetch.mockRejectedValueOnce(new Error("Échec de la requête"));

        render(<ListeFilms></ListeFilms>);

        await waitFor(() => {
            expect(screen.getByText("Une erreur est survenue")).toBeInTheDocument();
        });
    });
});
