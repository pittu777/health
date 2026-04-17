"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { loadCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const CART_STORAGE_KEY = "health-cart";

function CartStorageSync() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    useEffect(() => {
        const raw = window.localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) {
            return;
        }

        try {
            const parsed = JSON.parse(raw) as unknown;
            if (Array.isArray(parsed)) {
                dispatch(loadCart(parsed));
            }
        } catch {
            // ignore invalid storage data
        }
    }, [dispatch]);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    return null;
}

export default function ReduxProvider({ children }: PropsWithChildren<{}>) {
    return (
        <Provider store={store}>
            <CartStorageSync />
            {children}
        </Provider>
    );
}
