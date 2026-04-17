"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Menu,
    Search,
    ShoppingCart,
    UserCircle2,
    X,
} from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface StoreLayoutHeaderProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export default function StoreLayoutHeader({
    searchValue = "",
    onSearchChange,
}: StoreLayoutHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const cartQuantity = useAppSelector((state) =>
        state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
    );
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userInitial = currentUser?.name?.trim().charAt(0).toUpperCase() ?? "U";

    const handleSearchInput = (value: string) => {
        onSearchChange?.(value);
    };

    return (
        <header className="sticky top-0 z-30 bg-[#0d57a7] px-4 py-4 text-white shadow-[0_22px_40px_-28px_rgba(13,87,167,0.8)] sm:px-6 sm:py-5">
            <div className="flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="shrink-0 text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2rem]"
                >
                    Logo
                </Link>

                <div className="hidden min-w-0 flex-1 md:block md:px-4 lg:px-8">
                    <div className="relative mx-auto max-w-md lg:max-w-xl">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/80" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => handleSearchInput(event.target.value)}
                            placeholder="Search for products..."
                            className="h-11 w-full rounded-lg border border-white/25 bg-[#165fb5] pl-11 pr-4 text-sm text-white outline-none placeholder:text-blue-100/80 focus:border-white/40"
                        />
                    </div>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    <Link
                        href="/cart"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#093e82] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#08356f] lg:px-5"
                    >
                        <ShoppingCart className="h-4 w-4" />
                        <span className="hidden lg:inline">Cart</span>
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

                <button
                    type="button"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setIsMobileMenuOpen((current) => !current)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#093e82] text-white transition hover:bg-[#08356f] md:hidden"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            {isMobileMenuOpen ? (
                <div className="mt-4 space-y-4 rounded-2xl bg-[#0a478d] p-4 md:hidden">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/80" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => handleSearchInput(event.target.value)}
                            placeholder="Search for products..."
                            className="h-11 w-full rounded-lg border border-white/20 bg-[#165fb5] pl-11 pr-4 text-sm text-white outline-none placeholder:text-blue-100/80 focus:border-white/40"
                        />
                    </div>

                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                        <Link
                            href="/cart"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#093e82] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#08356f]"
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
                            onClick={() => setIsMobileMenuOpen(false)}
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
            ) : null}
        </header>
    );
}
