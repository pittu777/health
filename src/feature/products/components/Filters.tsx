

"use client";

import { useProductListing } from "./ProductListingClient";

export default function Filters() {
    const {
        categories,
        category,
        brand,
        brands,
        handleBrandChange,
        handleCategoryChange,
        handlePriceChange,
        priceRange,
        pushFilters,
        localSearch,
    } = useProductListing();

    return (
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
    );
}