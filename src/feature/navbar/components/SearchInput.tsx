"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export default function SearchInput({
    value,
    onChange,
    placeholder = "Search for products...",
    className = ""
}: SearchInputProps) {
    return (
        <div className={`relative ${className}`}>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/80" />
            <input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="h-11 w-full rounded-lg border border-white/25 bg-[#165fb5] pl-11 pr-4 text-sm text-white outline-none placeholder:text-blue-100/80 focus:border-white/40"
            />
        </div>
    );
}