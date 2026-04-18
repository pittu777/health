"use client";

import { useMemo, useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";

export function useCart() {
    const items = useAppSelector((state) => state.cart.items);
    const [isMounted, setIsMounted] = useState(false);

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    const itemCount = useMemo(
        () => items.reduce((sum, item) => sum + item.quantity, 0),
        [items]
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return {
        items,
        subtotal,
        itemCount,
        isMounted,
    };
}