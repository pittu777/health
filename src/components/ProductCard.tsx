"use client";

import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

    return (
        <article className="group overflow-hidden rounded-3xl border border-slate-800/90 bg-slate-950/95 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.7)] transition hover:-translate-y-1 hover:border-blue-600/30">
            <Link href={`/product/${product.id}`} className="block overflow-hidden">
                <img src={product.image} alt={product.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
            </Link>
            <div className="space-y-4 p-5">
                <div className="flex items-center justify-between text-sm text-slate-400">
                    <span className="rounded-full bg-slate-800/90 px-3 py-1">{product.brand}</span>
                    <div className="inline-flex items-center gap-1 text-amber-400">
                        <Star className="h-4 w-4" />
                        <span>{product.rating}</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="text-base font-semibold text-white">{product.name}</div>
                    <p className="text-sm text-slate-400 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <div>
                        <p className="text-sm text-slate-400">Price</p>
                        <p className="text-xl font-semibold text-white">${product.price.toFixed(0)}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => dispatch(addItem(product))}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
                    >
                        <ShoppingBag className="h-4 w-4" /> Add to Cart
                    </button>
                </div>
            </div>
        </article>
    );
}
