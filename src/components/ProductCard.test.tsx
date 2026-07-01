import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCard from "./ProductCard";
import cartReducer from "../features/cartSlice";

const mockProduct = {
    id: "1",
    title: "Test Backpack",
    price: 29.99,
    description: "A useful test backpack",
    category: "accessories",
    image: "https://example.com/backpack.jpg",
    rating: {
        rate: 4.5,
        count: 100,
    },
};

function renderWithStore() {
    const store = configureStore({
        reducer: {
            cart: cartReducer,
        },
    });

    render(
        <Provider store={store}>
            <ProductCard product={mockProduct} />
        </Provider>
    );

    return store;
}

describe("ProductCard", () => {
    it("renders product details", () => {
        renderWithStore();

        expect(screen.getByText("Test Backpack")).toBeInTheDocument();
        expect(screen.getByText("$29.99")).toBeInTheDocument();
        expect(screen.getByText("accessories")).toBeInTheDocument();
        expect(screen.getByText("A useful test backpack")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    });

    it("adds product to cart when Add to Cart is clicked", async () => {
        const user = userEvent.setup();
        const store = renderWithStore();

        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        const state = store.getState();

        expect(state.cart.items).toHaveLength(1);
        expect(state.cart.items[0].title).toBe("Test Backpack");
    });
});