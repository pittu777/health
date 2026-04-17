"use client";

import Link from "next/link";
import { ShoppingCart, Search, UserCircle2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";

interface TopNavProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export default function TopNav({ searchValue, onSearchChange }: TopNavProps) {
    const cartQuantity = useAppSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userInitial = currentUser?.name?.trim().charAt(0).toUpperCase() ?? "U";

    return (
        <header className="sticky top-0 z-20 bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
                <Link href="/" className="flex items-center gap-3 text-white">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-lg font-semibold shadow-lg shadow-blue-600/20">
                        A
                    </span>
                    <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Logo</p>
                        <p className="text-lg font-semibold text-white">Shop</p>
                    </div>
                </Link>

                <div className="flex-1">
                    <div className="relative mx-auto max-w-2xl">
                        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                            type="search"
                            value={searchValue}
                            onChange={(event) => onSearchChange(event.target.value)}
                            placeholder="Search for products..."
                            className="w-full rounded-full border border-slate-700/80 bg-slate-900/90 px-12 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/cart" className="relative inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-slate-100 transition hover:bg-slate-800">
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Cart
                        {cartQuantity > 0 ? (
                            <span className="ml-2 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-blue-500 px-2 text-xs font-semibold text-white">
                                {cartQuantity}
                            </span>
                        ) : null}
                    </Link>
                    <Link
                        href="/profile"
                        aria-label="Open profile"
                        className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-slate-900 px-3 text-slate-200 shadow-sm transition hover:bg-slate-800"
                    >
                        {currentUser ? (
                            <span className="text-sm font-semibold text-white">{userInitial}</span>
                        ) : (
                            <UserCircle2 className="h-6 w-6" />
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
