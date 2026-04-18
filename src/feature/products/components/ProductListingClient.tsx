"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { getUniqueBrands, getUniqueCategories } from "@/lib/products";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductFilters } from "../hooks/useProductFilters";
import { useFilteredProducts } from "../hooks/useFilteredProducts";
import Filters from "./Filters";

interface ProductListingClientProps {
    products: Product[];
}

interface ProductListingContextType {
    localSearch: string;
    priceRange: number;
    category: string;
    brand: string;
    categories: string[];
    brands: string[];
    handleSearchChange: (value: string) => void;
    handleCategoryChange: (selected: string) => void;
    handleBrandChange: (selected: string) => void;
    handlePriceChange: (value: number) => void;
    pushFilters: (filters: Record<string, string | undefined>) => void;
    filteredProducts: Product[];
    isLoading: boolean;
}

const ProductListingContext = createContext<ProductListingContextType | null>(null);

export function useProductListing() {
    const context = useContext(ProductListingContext);
    if (!context) {
        throw new Error("useProductListing must be used within ProductListing");
    }
    return context;
}

function ProductCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-[18px] bg-white p-4 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
            <Skeleton className="aspect-square w-full rounded-lg" />
            <div className="mt-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
    );
}

function ProductListingFilters() {
    return <Filters />;
}

function ProductListingGrid() {
    const { filteredProducts, isLoading } = useProductListing();

    return (
        <section className="pr-2">
            <h1 className="text-[2.2rem] font-semibold leading-none text-slate-900">
                Product Listing
            </h1>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {isLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <ProductCardSkeleton key={i} />
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full rounded-[18px] bg-white p-10 text-center shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <p className="text-lg font-semibold text-slate-900">
                            No products found
                        </p>
                        <p className="mt-2 text-sm text-slate-600">
                            Try adjusting the search or filter options.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default function ProductListingClient({
    products,
}: ProductListingClientProps) {
    const [isLoading, setIsLoading] = useState(true);

    const {
        localSearch,
        priceRange,
        category,
        brand,
        handleSearchChange,
        handleCategoryChange,
        handleBrandChange,
        handlePriceChange,
        pushFilters,
    } = useProductFilters();

    const filteredProducts = useFilteredProducts(
        products,
        localSearch,
        category,
        brand,
        priceRange
    );

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const categories = ["All", ...getUniqueCategories()];
    const brands = ["All", ...getUniqueBrands()];

    const contextValue: ProductListingContextType = {
        localSearch,
        priceRange,
        category,
        brand,
        categories,
        brands,
        handleSearchChange,
        handleCategoryChange,
        handleBrandChange,
        handlePriceChange,
        pushFilters,
        filteredProducts,
        isLoading,
    };

    return (
        <ProductListingContext.Provider value={contextValue}>
            <StoreLayoutShell
                header={
                    <StoreLayoutHeader
                        searchValue={localSearch}
                        onSearchChange={handleSearchChange}
                    />
                }
            >
                <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)]">
                    <ProductListingFilters />
                    <ProductListingGrid />
                </div>
            </StoreLayoutShell>
        </ProductListingContext.Provider>
    );
}

ProductListingClient.Filters = ProductListingFilters;
ProductListingClient.Grid = ProductListingGrid;