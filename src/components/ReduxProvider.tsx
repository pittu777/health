"use client";

import { PropsWithChildren, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { loadCart } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearUser, setUser, type AuthUser } from "@/store/userSlice";
import SessionRefresh from "@/feature/auth/SessionRefresh";

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

        }
    }, [dispatch]);

    useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    return null;
}

type SessionBootstrapProps = {
    initialUser: AuthUser | null;
};

function SessionBootstrap({ initialUser }: SessionBootstrapProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (initialUser) {
            dispatch(setUser(initialUser));
            return;
        }

        dispatch(clearUser());
    }, [dispatch, initialUser]);

    return null;
}

type ReduxProviderProps = PropsWithChildren<{
    initialUser: AuthUser | null;
    shouldRefreshSession: boolean;
}>;

export default function ReduxProvider({
    children,
    initialUser,
    shouldRefreshSession,
}: ReduxProviderProps) {
    return (
        <Provider store={store}>
            <SessionBootstrap initialUser={initialUser} />
            <CartStorageSync />
            <SessionRefresh enabled={shouldRefreshSession} />
            {children}
        </Provider>
    );
}
