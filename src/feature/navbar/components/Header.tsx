"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useHeaderState } from "../hooks/useHeaderState";
import { useIsMounted } from "@/hooks/useIsMounted";
import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import MobileMenu from "./MobileMenu";

interface StoreLayoutHeaderProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
}

export default function StoreLayoutHeader({
    searchValue = "",
    onSearchChange,
}: StoreLayoutHeaderProps) {
    const isMounted = useIsMounted();
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useHeaderState();

    const handleSearchInput = (value: string) => {
        onSearchChange?.(value);
    };

    return (
        <header className="sticky top-0 z-30 bg-[#0d57a7] px-4 py-4 text-white shadow-[0_22px_40px_-28px_rgba(13,87,167,0.8)] sm:px-6 sm:py-5">
            <div className="flex items-center justify-between gap-4">
                <Link
                    href="/"
                    className="shrink-0 text-[1.75rem] font-bold leading-none tracking-tight sm:text-[2rem]"
                >
                    Logo
                </Link>

                <div className="hidden min-w-0 flex-1 md:block md:px-4 lg:px-8">
                    <SearchInput
                        value={searchValue}
                        onChange={handleSearchInput}
                        className="relative mx-auto max-w-md lg:max-w-xl"
                    />
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {isMounted && (
                        <>
                            <CartButton />
                            <ProfileButton />
                        </>
                    )}
                </div>

                <button
                    type="button"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    onClick={toggleMobileMenu}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[#093e82] text-white transition hover:bg-[#08356f] md:hidden"
                >
                    {isMobileMenuOpen ? (
                        <X className="h-5 w-5" />
                    ) : (
                        <Menu className="h-5 w-5" />
                    )}
                </button>
            </div>

            <MobileMenu
                isOpen={isMobileMenuOpen}
                searchValue={searchValue}
                onSearchChange={handleSearchInput}
                onClose={closeMobileMenu}
            />
        </header>
    );
}
