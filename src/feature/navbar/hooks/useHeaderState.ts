"use client";

import { useState } from "react";

export function useHeaderState() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((current) => !current);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return {
        isMobileMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
    };
}