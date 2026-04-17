import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import ProfilePageContent from "@/feature/profile/ProfilePage";

export const metadata: Metadata = {
    title: "Profile | Health Shop",
    description: "View your account details and manage your session.",
};

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return <ProfilePageContent user={user} />;
}
