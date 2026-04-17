"use client";

import Link from "next/link";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeItem, updateQuantity } from "@/store/cartSlice";

export default function CartPageClient() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.cart.items);

    const subtotal = useMemo(
        () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
        [items]
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-blue-300/80">Shopping Cart</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white">Your selected items</h1>
                    </div>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm text-slate-200 transition hover:bg-slate-800">
                        <ShoppingCart className="h-4 w-4" /> Continue shopping
                    </Link>
                </div>

                <div className="grid gap-8 xl:grid-cols-[1.5fr_0.8fr]">
                    <section className="space-y-6 rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40">
                        {items.length === 0 ? (
                            <div className="rounded-3xl border border-dashed border-slate-700/80 bg-slate-950/80 p-12 text-center text-slate-300">
                                <p className="text-lg font-semibold text-white">Your cart is empty</p>
                                <p className="mt-2 text-sm leading-6">Add a product from the store and it will appear here.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.product.id} className="rounded-3xl border border-slate-800/90 bg-slate-950/90 p-5">
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex items-center gap-4">
                                                <img src={item.product.image} alt={item.product.name} className="h-24 w-24 rounded-3xl object-cover" />
                                                <div>
                                                    <p className="font-semibold text-white">{item.product.name}</p>
                                                    <p className="mt-1 text-sm text-slate-400">{item.product.brand}</p>
                                                    <p className="mt-3 text-sm text-slate-300">${item.product.price.toFixed(0)} each</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-start justify-between gap-4 sm:items-end">
                                                <div className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-200">
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity - 1 }))}
                                                        className="rounded-full bg-slate-700 px-2 text-white transition hover:bg-slate-600"
                                                    >
                                                        -
                                                    </button>
                                                    <span>{item.quantity}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                                                        className="rounded-full bg-blue-600 px-2 text-white transition hover:bg-blue-500"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => dispatch(removeItem(item.product.id))}
                                                    className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
                                                >
                                                    <Trash2 className="h-4 w-4" /> Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
                        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Summary</p>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(0)}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Shipping</span>
                                <span>$25</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <span>Discount</span>
                                <span>-$0</span>
                            </div>
                            <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-5">
                                <div className="flex items-center justify-between text-sm text-slate-400">
                                    <span>Total</span>
                                    <span className="text-lg font-semibold text-white">${(subtotal + 25).toFixed(0)}</span>
                                </div>
                            </div>
                        </div>
                        <button
                            type="button"
                            disabled={items.length === 0}
                            className="mt-8 w-full rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
                        >
                            Checkout
                        </button>
                    </aside>
                </div>
            </div>
        </div>
    );
}
