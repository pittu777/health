import { useMemo } from "react";
import type { Product } from "@/lib/products";

export function useFilteredProducts(
    products: Product[],
    search: string,
    category: string,
    brand: string,
    priceRange: number
) {
    return useMemo(() => {
        const searchQuery = search.toLowerCase();

        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchQuery) ||
                product.description.toLowerCase().includes(searchQuery);

            const matchesCategory =
                category === "All" || product.category === category;

            const matchesBrand =
                brand === "All" || product.brand === brand;

            const matchesPrice = product.price <= priceRange;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesBrand &&
                matchesPrice
            );
        });
    }, [products, search, category, brand, priceRange]);
}