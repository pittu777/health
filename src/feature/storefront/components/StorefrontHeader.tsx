"use client";

import Link from "next/link";
import { Search, ShoppingCart, UserCircle2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface StorefrontHeaderProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export default function StorefrontHeader({
    searchValue = "",
    onSearchChange,
}: StorefrontHeaderProps) {
    const cartQuantity = useAppSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userInitial = currentUser?.name?.trim().charAt(0).toUpperCase() ?? "U";

    return (
        <header className="rounded-t-[24px] bg-[#0d57a7] px-6 py-5 text-white shadow-[0_22px_40px_-28px_rgba(13,87,167,0.8)]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <Link href="/" className="text-[2rem] font-bold leading-none tracking-tight">
                    Logo
                </Link>

                <div className="flex-1 lg:px-8">
                    <div className="relative mx-auto max-w-md">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/80" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => onSearchChange?.(event.target.value)}
                            placeholder="Search for products..."
                            className="h-11 w-full rounded-lg border border-white/25 bg-[#165fb5] pl-11 pr-4 text-sm text-white outline-none placeholder:text-blue-100/80 focus:border-white/40"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#093e82] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#08356f]"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        Cart
                        {cartQuantity > 0 ? (
                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-semibold text-[#0d57a7]">
                                {cartQuantity}
                            </span>
                        ) : null}
                    </Link>

                    <Link
                        href="/profile"
                        aria-label="Open profile"
                        className="flex h-11 min-w-11 items-center justify-center rounded-full bg-[#093e82] px-3 text-white transition hover:bg-[#08356f]"
                    >
                        {currentUser ? (
                            <span className="text-sm font-semibold">{userInitial}</span>
                        ) : (
                            <UserCircle2 className="h-5 w-5" />
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
