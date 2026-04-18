"use client";

export default function EmptyCart() {
    return (
        <div className="rounded-[18px] bg-[#f8fbff] p-12 text-center">
            <p className="text-lg font-semibold text-slate-900">
                Your cart is empty
            </p>
            <p className="mt-2 text-sm text-slate-600">
                Add a product from the store and it will appear here.
            </p>
        </div>
    );
}