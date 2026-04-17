"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/cartSlice";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const dispatch = useAppDispatch();

    if (product.featured) {
        return (
            <article className="grid overflow-hidden rounded-[22px] bg-transparent md:col-span-2 md:grid-cols-[220px_minmax(0,1fr)]">
                <Link
                    href={`/product/${product.id}`}
                    className="flex items-center justify-center p-6"
                >
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={420}
                        height={420}
                        className="h-[280px] w-auto object-contain"
                    />
                </Link>
                <div className="flex flex-col justify-between p-6">
                    <div>
                        <h3 className="text-[2.15rem] font-semibold leading-tight text-slate-900">
                            {product.name}
                        </h3>
                        <p className="mt-2 text-[2rem] font-semibold text-slate-900">
                            ${product.price}
                        </p>
                        <div className="mt-2 flex items-center gap-1 text-[#184f98]">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-4 w-4 fill-current" />
                            ))}
                        </div>
                        <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
                            Lorem ipsum dolor amet, consectetur euisagend.
                        </p>
                        <div className="mt-5 space-y-2 text-sm text-slate-700">
                            <p>Category</p>
                            <p>{product.category}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => dispatch(addItem(product))}
                        className="mt-6 inline-flex w-full items-center justify-center rounded-lg bg-[#0d57a7] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#0b4b90]"
                    >
                        Add to Cart
                    </button>
                </div>
            </article>
        );
    }

    return (
        <article className="overflow-hidden rounded-[18px] bg-transparent">
            <Link
                href={`/product/${product.id}`}
                className="flex h-[150px] items-center justify-center p-4"
            >
                <Image
                    src={product.image}
                    alt={product.name}
                    width={260}
                    height={180}
                    className="h-full w-full object-contain"
                />
            </Link>
            <div className="space-y-2 px-4 pb-2 pt-1">
                <div>
                    <h3 className="text-[1.1rem] font-semibold leading-tight text-slate-900">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-[1.4rem] font-semibold text-slate-900">
                        ${product.price}
                    </p>
                </div>
                <Button
                    type="button"
                    onClick={() => dispatch(addItem(product))}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0d57a7] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0b4b90] w-full cursor-pointer"
                >

                    Add to Cart
                </Button>
            </div>
        </article>
    );
}
