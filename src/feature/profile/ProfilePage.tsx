import { Mail, ShieldCheck, UserRound } from "lucide-react";
import LogoutButton from "@/feature/auth/Logout";
import type { AuthenticatedUser } from "@/lib/auth";
import StoreLayoutHeader from "@/feature/layout/components/StoreLayoutHeader";
import StoreLayoutShell from "@/feature/layout/components/StoreLayoutShell";

interface ProfilePageProps {
    user: AuthenticatedUser;
}

export default function ProfilePage({ user }: ProfilePageProps) {
    return (
        <StoreLayoutShell
            header={<StoreLayoutHeader />}
        >
            <div className="mx-auto max-w-3xl">
                <div className="rounded-[24px] bg-white p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0d57a7] text-2xl font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-[0.32em] text-[#0d57a7]">
                                    Profile
                                </p>
                                <h1 className="mt-2 text-4xl font-semibold text-slate-900">
                                    {user.name}
                                </h1>
                            </div>
                        </div>

                        <LogoutButton />
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[18px] bg-[#f8fbff] p-5">
                            <div className="flex items-center gap-3 text-[#0d57a7]">
                                <UserRound className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">Full Name</p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-slate-900">
                                {user.name}
                            </p>
                        </div>

                        <div className="rounded-[18px] bg-[#f8fbff] p-5">
                            <div className="flex items-center gap-3 text-[#0d57a7]">
                                <Mail className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">Email</p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-slate-900">
                                {user.email}
                            </p>
                        </div>

                        <div className="rounded-[18px] bg-[#f8fbff] p-5 sm:col-span-2">
                            <div className="flex items-center gap-3 text-[#0d57a7]">
                                <ShieldCheck className="h-5 w-5" />
                                <p className="text-sm uppercase tracking-[0.2em]">
                                    Account Status
                                </p>
                            </div>
                            <p className="mt-4 text-lg font-medium text-slate-900">
                                Authenticated and ready to shop
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                Your account is active. You can browse products,
                                manage your cart, and continue building the rest of
                                the storefront flow.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayoutShell>
    );
}
