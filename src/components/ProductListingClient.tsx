"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/products";
import { getUniqueBrands, getUniqueCategories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import TopNav from "@/components/TopNav";

interface ProductListingClientProps {
    products: Product[];
}

const DEFAULT_MAX_PRICE = 1000;

export default function ProductListingClient({ products }: ProductListingClientProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    const [localSearch, setLocalSearch] = useState(() => params.get("search") ?? "");
    const [priceRange, setPriceRange] = useState(() => Number(params.get("price") ?? String(DEFAULT_MAX_PRICE)));
    const [category, setCategory] = useState(() => params.get("category") ?? "All");
    const [brand, setBrand] = useState(() => params.get("brand") ?? "All");

    const categories = ["All", ...getUniqueCategories()];
    const brands = ["All", ...getUniqueBrands()];

    const filteredProducts = useMemo(() => {
        const searchQuery = (params.get("search") ?? "").toLowerCase();
        const selectedCategory = params.get("category") ?? "All";
        const selectedBrand = params.get("brand") ?? "All";
        const rawPrice = Number(params.get("price") ?? String(DEFAULT_MAX_PRICE));

        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
            const matchesPrice = product.price <= rawPrice;
            return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
        });
    }, [products, params]);

    function pushFilters(filters: Record<string, string | undefined>) {
        const searchParams = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value && value !== "All") {
                searchParams.set(key, value);
            }
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
        pushFilters({ category: selected, brand, price: String(priceRange), search: localSearch });
    };

    const handleBrandChange = (selected: string) => {
        setBrand(selected);
        pushFilters({ category, brand: selected, price: String(priceRange), search: localSearch });
    };

    const handlePriceChange = (value: number) => {
        setPriceRange(value);
        pushFilters({ category, brand, price: String(value), search: localSearch });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <TopNav searchValue={localSearch} onSearchChange={handleSearchChange} />
            <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-blue-300/80">Product Listing</p>
                        <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">Discover your next purchase</h1>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-5 py-3 text-sm text-slate-300 shadow-lg shadow-slate-950/20">
                        <span className="font-semibold text-white">{filteredProducts.length}</span> products found
                        <ChevronRight className="h-4 w-4 text-blue-400" />
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
                    <aside className="space-y-8 rounded-3xl border border-slate-800/90 bg-slate-900/90 p-6 shadow-2xl shadow-slate-950/40">
                        <div className="space-y-4">
                            <h2 className="text-lg font-semibold text-white">Filters</h2>
                            <div className="space-y-3">
                                <p className="text-sm text-slate-400">Category</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleCategoryChange(option)}
                                            className={`rounded-full px-4 py-2 text-sm transition ${category === option ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm text-slate-400">
                                    <p>Max price</p>
                                    <span className="font-semibold text-white">${priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={priceRange}
                                    onChange={(event) => handlePriceChange(Number(event.target.value))}
                                    className="w-full accent-blue-500"
                                />
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm text-slate-400">Brand</p>
                                <div className="grid gap-2">
                                    {brands.map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => handleBrandChange(option)}
                                            className={`w-full rounded-2xl px-4 py-3 text-left text-sm transition ${brand === option ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-800/90 bg-slate-950/95 p-5">
                            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Brand story</p>
                            <p className="mt-3 text-sm leading-6 text-slate-300">
                                Shop the best curated products with smart filters, rapid checkout, and on-demand cart management.
                            </p>
                        </div>
                    </aside>

                    <section className="space-y-6">
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
                            ) : (
                                <div className="col-span-full rounded-3xl border border-dashed border-slate-700/80 bg-slate-900/80 p-12 text-center text-slate-300">
                                    <p className="text-lg font-semibold text-white">No products found</p>
                                    <p className="mt-3 text-sm leading-6">Try adjusting search, price, or category filters to find the right product.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>

            <footer className="border-t border-slate-800/80 bg-slate-950/95 py-8 text-slate-400">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
                    <p>© 2026 American. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-sm">
                        <a href="#" className="hover:text-white">About Us</a>
                        <a href="#" className="hover:text-white">Contact</a>
                        <span className="inline-flex items-center gap-2 text-slate-500">Follow us <ArrowRight className="h-4 w-4" /></span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
