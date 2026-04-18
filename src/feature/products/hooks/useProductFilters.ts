import { useMemo, useState, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const DEFAULT_MAX_PRICE = 1000;

export function useProductFilters() {
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

    const pushFilters = useCallback((filters: Record<string, string | undefined>) => {
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
            if (!value) return;
            if ((key === "category" || key === "brand") && value === "All") return;
            if (key === "search" && value.trim() === "") return;
            searchParams.set(key, value);
        });

        const query = searchParams.toString();
        router.push(`${pathname}${query ? `?${query}` : ""}`);
    }, [router, pathname]);

    const handleSearchChange = useCallback((value: string) => {
        setLocalSearch(value);
        pushFilters({ category, brand, price: String(priceRange), search: value });
    }, [pushFilters, category, brand, priceRange]);

    const handleCategoryChange = useCallback((selected: string) => {
        setCategory(selected);
        pushFilters({
            category: selected,
            brand,
            price: String(priceRange),
            search: localSearch,
        });
    }, [pushFilters, brand, priceRange, localSearch]);

    const handleBrandChange = useCallback((selected: string) => {
        setBrand(selected);
        pushFilters({
            category,
            brand: selected,
            price: String(priceRange),
            search: localSearch,
        });
    }, [pushFilters, category, priceRange, localSearch]);

    const handlePriceChange = useCallback(
        (value: number) => {
            setPriceRange(value);
            pushFilters({
                category,
                brand,
                price: String(value),
                search: localSearch,
            });
        },
        [pushFilters, category, brand, localSearch]
    );

    return {
        localSearch,
        priceRange,
        category,
        brand,
        handleSearchChange,
        handleCategoryChange,
        handleBrandChange,
        handlePriceChange,
        pushFilters,
    };
}