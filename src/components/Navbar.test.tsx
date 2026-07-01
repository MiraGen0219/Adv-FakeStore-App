import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

vi.mock("firebase/auth", () => ({
    onAuthStateChanged: vi.fn((_auth, callback) => {
        callback(null);
        return vi.fn();
    }),
    signOut: vi.fn(),
}));

vi.mock("../firebase", () => ({
    auth: {},
}));

describe("Navbar", () => {
    it("renders navigation links for logged-out users", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        expect(screen.getByText("Products")).toBeInTheDocument();
        expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Order History")).toBeInTheDocument();
    });
});