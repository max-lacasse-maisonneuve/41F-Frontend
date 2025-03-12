import DetailFilm from "./DetailFilm";
import { render } from "@testing-library/react";
// import { useParams, useNavigate } from "react-router-dom";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

import { MemoryRouter } from "react-router-dom";
describe("DetailFlm", () => {
    it("should render the component", () => {
        // Mock useParams and useNavigate
        let useNavigate = vi.fn();
        let useParams = vi.fn();
        // const mockUseParams = vi.spyOn(require("react-router-dom"), "useParams");
        // const mockUseNavigate = vi.spyOn(require("react-router-dom"), "useNavigate");

        let mockUseParams = vi.fn();
        let mockUseNavigate = vi.fn();
        mockUseNavigate.mockReturnValue({ id: "1" });

        const mockNavigate = vi.fn();
        mockUseParams.mockReturnValue(mockNavigate);

        const { getByText } = render(
            <MemoryRouter>
                <DetailFilm />
            </MemoryRouter>
        );
        expect(getByText(/Détails du film/i)).toBeInTheDocument();
    });
});
