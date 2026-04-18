"use client";

import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useIsMounted } from "@/hooks/useIsMounted";

interface ProfileButtonProps {
    isMobile?: boolean;
    onMobileClick?: () => void;
}

export default function ProfileButton({ isMobile = false, onMobileClick }: ProfileButtonProps) {
    const isMounted = useIsMounted();

    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userInitial = currentUser?.name?.trim().charAt(0).toUpperCase() ?? "U";

    const baseClasses = isMobile
        ? "flex h-11 min-w-11 items-center justify-center rounded-full bg-[#093e82] px-3 text-white transition hover:bg-[#08356f]"
        : "flex h-11 min-w-11 items-center justify-center rounded-full bg-[#093e82] px-3 text-white transition hover:bg-[#08356f]";

    return (
        <Link
            href="/profile"
            onClick={onMobileClick}
            aria-label="Open profile"
            className={baseClasses}
        >
            {isMounted && currentUser ? (
                <span className="text-sm font-semibold">{userInitial}</span>
            ) : (
                <UserCircle2 className="h-5 w-5" />
            )}
        </Link>
    );
}