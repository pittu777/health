"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { addItem } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({
    product,
}: ProductDetailClientProps) {
    const dispatch = useAppDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        for (let index = 0; index < quantity; index += 1) {
            dispatch(addItem(product));
        }
    };

    return (
        <StoreLayoutShell
            header={<StoreLayoutHeader />}
        >
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Link href="/" className="hover:text-[#0d57a7]">
                        Home
                    </Link>
                    <span>/</span>
                    <span className="text-slate-800">{product.name}</span>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
                    <div className="flex items-center justify-center rounded-[24px] bg-[#f8fbff] p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <Image
                            src={product.image}
                            alt={product.name}
                            width={720}
                            height={720}
                            className="max-h-[460px] w-full object-contain"
                        />
                    </div>

                    <div className="rounded-[24px] bg-white p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <div className="inline-flex rounded-full bg-[#edf4ff] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#0d57a7]">
                            {product.category}
                        </div>
                        <h1 className="mt-5 text-4xl font-semibold text-slate-900">
                            {product.name}
                        </h1>
                        <p className="mt-3 text-3xl font-semibold text-slate-900">
                            ${product.price}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-[#184f98]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-4 w-4 fill-current" />
                            ))}
                            <span className="ml-2 text-sm text-slate-600">
                                {product.rating}
                            </span>
                        </div>

                        <p className="mt-6 text-sm leading-7 text-slate-600">
                            {product.description}
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-700">
                                    Quantity
                                </span>
                                <div className="inline-flex items-center rounded-full bg-[#edf4ff] px-3 py-2">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setQuantity((current) => Math.max(1, current - 1))
                                        }
                                        className="rounded-full bg-white px-3 py-1 text-slate-900"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center text-sm font-semibold text-slate-900">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity((current) => current + 1)}
                                        className="rounded-full bg-[#0d57a7] px-3 py-1 text-white"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#0d57a7] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0b4b90]"
                            >
                                <ShoppingBag className="h-5 w-5" />
                                Add to Cart
                            </button>
                        </div>

                        <div className="mt-8 rounded-[20px] bg-[#f8fbff] p-5">
                            <h2 className="text-lg font-semibold text-slate-900">
                                Reviews
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-slate-600">
                                Loved by shoppers for quality, fit, and performance.
                                Rated highly for comfort and value across all categories.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayoutShell>
    );
}
