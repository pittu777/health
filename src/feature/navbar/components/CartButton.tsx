"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useIsMounted } from "@/hooks/useIsMounted";

interface CartButtonProps {
    isMobile?: boolean;
    onMobileClick?: () => void;
}

export default function CartButton({ isMobile = false, onMobileClick }: CartButtonProps) {
    const isMounted = useIsMounted();

    const cartQuantity = useAppSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );

    const baseClasses = isMobile
        ? "inline-flex items-center justify-center gap-2 rounded-lg bg-[#093e82] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#08356f]"
        : "inline-flex items-center gap-2 rounded-lg bg-[#093e82] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#08356f] lg:px-5";

    const cartText = isMobile ? "Cart" : "Cart";

    return (
        <Link
            href="/cart"
            onClick={onMobileClick}
            className={baseClasses}
        >
            <ShoppingCart className="h-4 w-4" />
            {!isMobile && <span className="hidden lg:inline">{cartText}</span>}
            {isMobile && cartText}
            {isMounted && cartQuantity > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-[#0d57a7]">
                    {cartQuantity}
                </span>
            )}
        </Link>
    );
}