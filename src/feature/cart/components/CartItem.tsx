"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { removeItem, updateQuantity } from "@/store/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";
import type { CartItem as CartItemType } from "@/store/cartSlice";

interface CartItemProps {
    item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
    const dispatch = useAppDispatch();

    return (
        <div className="rounded-[18px] bg-[#f8fbff] p-5">
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
                                        quantity: Math.max(1, item.quantity - 1),
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
                        onClick={() => dispatch(removeItem(item.product.id))}
                        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-700 cursor-pointer"
                    >
                        <Trash2 className="h-4 w-4" />
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}