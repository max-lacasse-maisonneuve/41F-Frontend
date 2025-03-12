import "@testing-library/jest-dom";

import { d } from "./fonctions";
import { describe, expect } from "vitest";

describe("fonction utilitaires", () => {
    it("devrait décoder les caractères HTML", () => {
        expect(d("&amp;")).toBe("&");
        expect(d("&lt;")).toBe("<");
        expect(d("&gt;")).toBe(">");
        expect(d("L&apos;école")).toBe("L'école");
    });

    it("devrait retourner la chaîne non modifiée si elle ne contient pas de caractères spéciaux", () => {
        expect(d("Bonjour")).toBe("Bonjour");
        expect(d("Test123")).toBe("Test123");
    });

    it("devrait retourner une chaîne vide si le paramètre est undefined", () => {
        expect(d(undefined)).toBe("");
    });
});
