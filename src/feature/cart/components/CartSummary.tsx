"use client";

interface CartSummaryProps {
    subtotal: number;
    itemCount: number;
    isMounted: boolean;
}

export default function CartSummary({ subtotal, itemCount, isMounted }: CartSummaryProps) {
    const shipping = 25;
    const discount = 0;
    const total = subtotal + shipping - discount;

    return (
        <aside className="rounded-[22px] bg-white p-6 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
            <p className="text-sm uppercase tracking-[0.32em] text-[#0d57a7]">
                Summary
            </p>

            <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>${isMounted ? subtotal.toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                </div>
            </div>

            <div className="mt-6 rounded-[18px] bg-[#f8fbff] p-5">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Total</span>
                    <span className="text-2xl font-semibold text-slate-900">
                        ${isMounted ? total.toFixed(2) : shipping.toFixed(2)}
                    </span>
                </div>
            </div>

            <button
                type="button"
                disabled={!isMounted || itemCount === 0}
                onClick={() => alert("Order placed successfully!")}
                className="mt-6 w-full rounded-lg bg-[#0d57a7] px-6 py-4 text-base font-semibold text-white transition hover:bg-[#0b4b90] disabled:cursor-not-allowed disabled:bg-slate-300 cursor-pointer"
            >
                Checkout
            </button>
        </aside>
    );
}