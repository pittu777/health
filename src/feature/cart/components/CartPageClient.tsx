"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import { Button } from "@/components/ui/button";

export default function CartPageClient() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    return (
        <StoreLayoutShell
            header={<StoreLayoutHeader />}
        >
            <div className="space-y-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-[#0d57a7]">
                            Shopping Cart
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold text-slate-900">
                            Your selected items
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

                <div className="grid gap-6 lg:grid-cols-[1.55fr_0.8fr]">
                    <section className="rounded-[22px] bg-white p-6 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        {items.length === 0 ? (
                            <div className="rounded-[18px] bg-[#f8fbff] p-12 text-center">
                                <p className="text-lg font-semibold text-slate-900">
                                    Your cart is empty
                                </p>
                                <p className="mt-2 text-sm text-slate-600">
                                    Add a product from the store and it will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="rounded-[18px] bg-[#f8fbff] p-5"
                                    >
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-4">
                                                <Image
                                                    src={item.product.image}
                                                    alt={item.product.name}
                                                    width={96}
                                                    height={96}
                                                    className="h-24 w-24 rounded-[18px] bg-white object-contain p-2"
                                                />
                                                <div>
                                                    <p className="text-lg font-semibold text-slate-900">
                                                        {item.product.name}
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {item.product.brand}
                                                    </p>
                                                    <p className="mt-3 text-sm font-medium text-slate-800">
                                                        ${item.product.price} each
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start gap-3 sm:items-end">
                                                <div className="inline-flex items-center rounded-full bg-white px-3 py-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            dispatch(
                                                                updateQuantity({
                                                                    id: item.product.id,
                                                                    quantity: item.quantity - 1,
                                                                })
                                                            )
                                                        }
                                                        className="rounded-full bg-slate-100 px-3 py-1 text-slate-900 cursor-pointer"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-10 text-center text-sm font-semibold text-slate-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            dispatch(
                                                                updateQuantity({
                                                                    id: item.product.id,
                                                                    quantity: item.quantity + 1,
                                                                })
                                                            )
                                                        }
                                                        className="rounded-full bg-[#0d57a7] px-3 py-1 text-white cursor-pointer"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <Button
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(removeItem(item.product.id))
                                                    }
                                                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 cursor-pointer"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="rounded-[22px] bg-white p-6 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <p className="text-sm uppercase tracking-[0.32em] text-[#0d57a7]">
                            Summary
                        </p>

                        <div className="mt-6 space-y-4 text-sm text-slate-600">
                            <div className="flex items-center justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Shipping</span>
                                <span>$25</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Discount</span>
                                <span>-$0</span>
                            </div>
                        </div>

                        <div className="mt-6 rounded-[18px] bg-[#f8fbff] p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-slate-600">Total</span>
                                <span className="text-2xl font-semibold text-slate-900">
                                    ${subtotal + 25}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={items.length === 0}
                            className="mt-6 w-full rounded-lg bg-[#0d57a7] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0b4b90] disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Checkout
                        </button>
                    </aside>
                </div>
            </div>
        </StoreLayoutShell>
    );
}
