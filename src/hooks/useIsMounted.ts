"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook to track if a component has mounted on the client side.
 * Useful for preventing hydration mismatches by conditionally rendering
 * client-only content.
 *
 * @returns {boolean} True if the component has mounted, false otherwise
 */
export function useIsMounted(): boolean {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted;
}