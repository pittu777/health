"use client";

import SearchInput from "./SearchInput";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";

interface MobileMenuProps {
    isOpen: boolean;
    searchValue: string;
    onSearchChange: (value: string) => void;
    onClose: () => void;
}

export default function MobileMenu({ isOpen, searchValue, onSearchChange, onClose }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <div className="mt-4 space-y-4 rounded-2xl bg-[#0a478d] p-4 md:hidden">
            <SearchInput
                value={searchValue}
                onChange={onSearchChange}
                className="border-white/20"
            />

            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                <CartButton isMobile onMobileClick={onClose} />
                <ProfileButton isMobile onMobileClick={onClose} />
            </div>
        </div>
    );
}