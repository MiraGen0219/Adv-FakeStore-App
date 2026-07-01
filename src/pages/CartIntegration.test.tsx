import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import ProductCard from "../components/ProductCard";
import Cart from "./Cart";
import cartReducer from "../features/cartSlice";

vi.mock("../api/productsApi", () => ({
    deleteProduct: vi.fn(),
    updateProduct: vi.fn(),
}));

vi.mock("../api/ordersApi", () => ({
    createOrder: vi.fn(),
}));

vi.mock("../firebase", () => ({
    auth: {
        currentUser: null,
    },
}));

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
            <Cart />
        </Provider>
    );

    return store;
}

describe("Cart integration", () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it("updates the cart when a product is added", async () => {
        const user = userEvent.setup();

        renderWithStore();

        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();

        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
        expect(screen.getByText("Price: $29.99")).toBeInTheDocument();
        expect(screen.getByText("Total Items: 1")).toBeInTheDocument();
        expect(screen.getByText("Total Price: $29.99")).toBeInTheDocument();
    });
});