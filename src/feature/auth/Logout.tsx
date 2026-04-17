"use client";
import { useRouter } from "next/navigation";
import { clearUser } from "@/store/userSlice";
import { useAppDispatch } from "@/store/hooks";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            dispatch(clearUser());
            router.push("/login");
            router.refresh();
        }
    };

    return (
        <Button
            type="button"
            onClick={handleLogout}
            className="h-11 rounded-full bg-blue-600 px-5 text-sm font-semibold text-white hover:bg-blue-500"
        >
            Logout
        </Button>
    );
}
