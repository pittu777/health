import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/lib/products";

export interface CartItem {
    product: Product;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<Product>) {
            const existing = state.items.find((item) => item.product.id === action.payload.id);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ product: action.payload, quantity: 1 });
            }
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.product.id !== action.payload);
        },
        updateQuantity(state, action: PayloadAction<{ id: string; quantity: number }>) {
            const existing = state.items.find((item) => item.product.id === action.payload.id);
            if (existing) {
                existing.quantity = Math.max(1, action.payload.quantity);
            }
        },
        loadCart(state, action: PayloadAction<CartItem[]>) {
            state.items = action.payload;
        },
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, updateQuantity, loadCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
