import Footer from "./Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
    it("should have the current year", () => {
        const annee = new Date().getFullYear();
        const { container } = render(<Footer></Footer>);
        expect(screen.getByText(`Tous droits réservés - ${annee}`)).toBeInTheDocument();
        expect(container.querySelector("footer")).toBeTruthy();
    });
});
