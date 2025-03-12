import Footer from "./Footer";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect } from "vitest";

describe("Footer", () => {
    it("Should have a copyright and the year", () => {
        render(<Footer></Footer>);
        const year = new Date().getFullYear();
        expect(screen.getByText(`Tous droits réservés - ${year}`)).toBeInTheDocument();
    });
});
