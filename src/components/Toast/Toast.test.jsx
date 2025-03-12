import Toast from "./Toast";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";

describe("Toast", () => {
    it("should have the class toast with message", () => {
        const { container } = render(<Toast message="allo" />);

        expect(container.textContent).toBe("allo");
    });
});
