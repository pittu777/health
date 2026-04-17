import type { Metadata } from "next";
import CartPageClient from "@/feature/cart/components/CartPageClient";

export const metadata: Metadata = {
    title: "Cart | Health Shop",
    description: "Review your cart contents, update quantities, and prepare to checkout.",
};

export default function CartPage() {
    return <CartPageClient />;
}
