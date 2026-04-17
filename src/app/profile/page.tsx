import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import LogoutButton from "@/feature/auth/Logout";
import { getCurrentUser } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Profile | Health Shop",
    description: "View your account details and manage your session.",
};

export default async function ProfilePage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                <div className="rounded-[2rem] border border-slate-800/90 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/40">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">Profile</p>
                                <h1 className="mt-2 text-3xl font-semibold text-white">{user.name}</h1>
                            </div>
                        </div>
                        <LogoutButton />
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                            <div className="flex items-center gap-3 text-blue-300">
                                <UserRound className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">Full Name</p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-white">{user.name}</p>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5">
                            <div className="flex items-center gap-3 text-blue-300">
                                <Mail className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">Email</p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-white">{user.email}</p>
                        </div>

                        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-5 sm:col-span-2">
                            <div className="flex items-center gap-3 text-blue-300">
                                <ShieldCheck className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">Account Status</p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-white">Authenticated and ready to shop</p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Your account is active. You can browse products, manage your cart, and continue building the rest of the flow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
