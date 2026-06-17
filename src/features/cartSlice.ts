import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../types/Product";
import type { CartItem } from "../types/CartItem";

const CART_STORAGE_KEY = "cart";

function loadCartFromSessionStorage(): CartItem[] {
    const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);

    if (storedCart) {
        return JSON.parse(storedCart);
    }

    return [];
}

function saveCartToSessionStorage(cart:CartItem[]) {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

interface CartState {
    items: CartItem[];
    checkoutMessage: string;
}

const initialState: CartState = {
    items: loadCartFromSessionStorage(),
    checkoutMessage: "",
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            state.checkoutMessage = "";

            const existingItem = state.items.find(
                (item) => item.id === action.payload.id
            );

            if (existingItem) {
                existingItem.count += 1;
            } else {
              state.items.push({
                ...action.payload,
                count: 1,
              });
            }

            saveCartToSessionStorage(state.items);
          },

          removeFromCart(state, action: PayloadAction<string>) {
            const existingItem = state.items.find(
                (item) => item.id === action.payload
            );

            if (!existingItem) {
                return;
            }

            if (existingItem.count > 1) {
              existingItem.count -= 1;
            } else {
              state.items = state.items.filter(
                (item) => item.id !== action.payload
              );
            }

            saveCartToSessionStorage(state.items);
          },

          clearCart(state) {
            state.items = [];
            state.checkoutMessage =
                "Checkout successful! Your cart has been cleared.";

            sessionStorage.removeItem(CART_STORAGE_KEY);
          },

          clearCheckoutMessage(state) {
            state.checkoutMessage = "";
          },
    },
});

export const { addToCart, removeFromCart, clearCart, clearCheckoutMessage } = cartSlice.actions;
export default cartSlice.reducer;