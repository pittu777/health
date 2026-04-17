"use client";

import { useState } from "react";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import Link from "next/link";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i += 1) {
            dispatch(addItem(product));
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-3 text-sm text-slate-400">
                    <Link href="/" className="hover:text-white">Home</Link>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="overflow-hidden rounded-[2rem] border border-slate-800/90 bg-slate-900/80 shadow-2xl shadow-slate-950/40">
                        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="space-y-6 rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/90 px-4 py-2 text-xs uppercase tracking-[0.32em] text-slate-400">
                                {product.category}
                            </div>
                            <h1 className="text-4xl font-semibold text-white">{product.name}</h1>
                            <div className="flex items-center gap-3 text-slate-400">
                                <span className="inline-flex items-center gap-1 text-amber-400">
                                    <Star className="h-4 w-4" /> {product.rating}
                                </span>
                                <span>{product.brand}</span>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-slate-950/80 p-6 text-white">
                            <p className="text-3xl font-semibold">${product.price.toFixed(0)}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-300">{product.description}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-3 sm:grid-cols-[120px_minmax(0,1fr)] sm:items-center">
                                <label className="text-sm text-slate-400">Quantity</label>
                                <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-800/90 px-4 py-3">
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                        className="rounded-full bg-slate-700 px-3 text-white transition hover:bg-slate-600"
                                    >
                                        -
                                    </button>
                                    <span className="w-10 text-center text-base font-semibold text-white">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => current + 1)}
                                        className="rounded-full bg-blue-600 px-3 text-white transition hover:bg-blue-500"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-blue-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-blue-500"
                            >
                                <ShoppingBag className="h-5 w-5" /> Add to Cart
                            </button>
                        </div>

                        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/80 p-6">
                            <h2 className="text-lg font-semibold text-white">Reviews</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Loved by shoppers for quality, fit, and performance. Rated highly for comfort and value across all categories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
