import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailClient from "@/feature/products/components/ProductDetailClient";
import { getProductById } from "@/lib/products";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export const metadata: Metadata = {
    title: "Product Details | Health Shop",
    description: "View detailed product information, pricing, and reviews.",
};

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = getProductById(id);

    if (!product) {
        notFound();
    }

    return <ProductDetailClient product={product} />;
}
