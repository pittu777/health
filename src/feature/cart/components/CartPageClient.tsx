"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import { useCart } from "../hooks/useCart";
import type { CartItem as CartItemType } from "@/store/cartSlice";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import CartSkeleton from "./CartSkeleton";
import EmptyCart from "./EmptyCart";

export default function CartPageClient() {
    const { items, subtotal, itemCount, isMounted } = useCart();

    return (
        <StoreLayoutShell header={<StoreLayoutHeader />}>
            <div className="space-y-8">
                <CartHeader itemCount={itemCount} />

                <div className="grid gap-6 lg:grid-cols-[1.55fr_0.8fr]">
                    <CartItemsList
                        items={items}
                        isMounted={isMounted}
                    />
                    <CartSummary
                        subtotal={subtotal}
                        itemCount={itemCount}
                        isMounted={isMounted}
                    />
                </div>
            </div>
        </StoreLayoutShell>
    );
}

function CartHeader({ itemCount }: { itemCount: number }) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#0d57a7]">
                    Shopping Cart
                </p>
                <h1 className="mt-2 text-4xl font-semibold text-slate-900">
                    Your selected items {itemCount}
                </h1>
            </div>

            <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0d57a7] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0b4b90]"
            >
                <ShoppingCart className="h-4 w-4" />
                Continue shopping
            </Link>
        </div>
    );
}

function CartItemsList({ items, isMounted }: { items: CartItemType[]; isMounted: boolean }) {
    return (
        <section className="rounded-[22px] bg-white p-6 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
            {!isMounted ? (
                <CartSkeleton />
            ) : items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                </div>
            )}
        </section>
    );
}
