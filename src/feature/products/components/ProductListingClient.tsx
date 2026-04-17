"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Product } from "@/lib/products";
import { getUniqueBrands, getUniqueCategories } from "@/lib/products";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import ProductCard from "./ProductCard";

interface ProductListingClientProps {
    products: Product[];
}

const DEFAULT_MAX_PRICE = 1000;

export default function ProductListingClient({
    products,
}: ProductListingClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const [localSearch, setLocalSearch] = useState(
        () => params.get("search") ?? ""
    );
    const [priceRange, setPriceRange] = useState(
        () => Number(params.get("price") ?? String(DEFAULT_MAX_PRICE))
    );
    const [category, setCategory] = useState(
        () => params.get("category") ?? "All"
    );
    const [brand, setBrand] = useState(() => params.get("brand") ?? "All");

    const categories = ["All", ...getUniqueCategories()];
    const brands = ["All", ...getUniqueBrands()];

    const filteredProducts = useMemo(() => {
        const searchQuery = localSearch.toLowerCase();

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
    }, [products, localSearch, category, brand, priceRange]);

    function pushFilters(filters: Record<string, string | undefined>) {
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (!value) return;
            if ((key === "category" || key === "brand") && value === "All") return;
            if (key === "search" && value.trim() === "") return;
            searchParams.set(key, value);
        });

        const query = searchParams.toString();
        router.push(`${pathname}${query ? `?${query}` : ""}`);
    }

    const handleSearchChange = (value: string) => {
        setLocalSearch(value);
        pushFilters({ category, brand, price: String(priceRange), search: value });
    };

    const handleCategoryChange = (selected: string) => {
        setCategory(selected);
        pushFilters({
            category: selected,
            brand,
            price: String(priceRange),
            search: localSearch,
        });
    };

    const handleBrandChange = (selected: string) => {
        setBrand(selected);
        pushFilters({
            category,
            brand: selected,
            price: String(priceRange),
            search: localSearch,
        });
    };

    const handlePriceChange = (value: number) => {
        setPriceRange(value);
    };

    return (
        <StoreLayoutShell
            header={
                <StoreLayoutHeader
                    searchValue={localSearch}
                    onSearchChange={handleSearchChange}
                />
            }
        >
            <div className="grid gap-8 xl:grid-cols-[220px_minmax(0,1fr)]">
                <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
                    <div className="rounded-[14px] bg-[#0d57a7] p-5 text-white shadow-[0_20px_35px_-30px_rgba(13,87,167,0.95)]">
                        <h2 className="text-[2rem] font-semibold leading-none">Filters</h2>

                        <div className="mt-6 space-y-3">
                            <p className="text-lg font-semibold">Category</p>
                            {categories.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleCategoryChange(option)}
                                    className="flex items-center gap-3 text-left text-sm text-white/95"
                                >
                                    <span
                                        className={`h-4 w-4 rounded-full border ${category === option
                                                ? "border-white bg-white shadow-[inset_0_0_0_4px_#0d57a7]"
                                                : "border-white/60"
                                            }`}
                                    />
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8">
                            <p className="text-lg font-semibold">Price</p>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange}
                                onChange={(e) =>
                                    handlePriceChange(Number(e.target.value))
                                }
                                onMouseUp={() =>
                                    pushFilters({
                                        category,
                                        brand,
                                        price: String(priceRange),
                                        search: localSearch,
                                    })
                                }
                                className="mt-4 w-full accent-white"
                            />
                            <div className="mt-1 flex justify-between text-sm text-white">
                                <span>0</span>
                                <span>₹{priceRange}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[14px] bg-white p-5 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <h2 className="text-[2rem] font-semibold leading-none text-slate-900">
                            Category
                        </h2>

                        <div className="mt-6 space-y-3">
                            <p className="text-lg font-semibold text-slate-900">
                                {brand === "All" ? "All" : "Brand"}
                            </p>
                            {brands.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => handleBrandChange(option)}
                                    className="flex items-center gap-3 text-left text-sm text-slate-700"
                                >
                                    <span
                                        className={`h-4 w-4 rounded-full border ${brand === option
                                                ? "border-[#0d57a7] bg-white shadow-[inset_0_0_0_4px_#0d57a7]"
                                                : "border-slate-300"
                                            }`}
                                    />
                                    {option}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8">
                            <p className="text-lg font-semibold text-slate-900">Price</p>
                            <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500">
                                ₹{priceRange}
                            </div>
                        </div>
                    </div>
                </aside>

                <section className="pr-2">
                    <h1 className="text-[2.2rem] font-semibold leading-none text-slate-900">
                        Product Listing
                    </h1>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredProducts.length > 0 ? (
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
            </div>
        </StoreLayoutShell>
    );
}