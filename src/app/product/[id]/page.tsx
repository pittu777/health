import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/components/ProductDetailClient";
import { getProductById } from "@/lib/products";

interface ProductPageProps {
    params: {
        id: string;
    };
}

export const metadata: Metadata = {
    title: "Product Details | Health Shop",
    description: "View detailed product information, pricing, and reviews.",
};

export default function ProductPage({ params }: ProductPageProps) {
    const product = getProductById(params.id);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
