import { Mail, ShieldCheck, UserRound } from "lucide-react";
import LogoutButton from "@/feature/auth/Logout";
import type { AuthenticatedUser } from "@/lib/auth";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";

interface ProfilePageProps {
    user: AuthenticatedUser;
}

export default function ProfilePage({ user }: ProfilePageProps) {
    return (
        <StoreLayoutShell header={<StoreLayoutHeader />}>
            <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                <div className="rounded-[20px] bg-white p-5 sm:p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">

                    {/* HEADER */}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        {/* USER INFO */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0d57a7] text-lg sm:text-2xl font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.32em] text-[#0d57a7]">
                                    Profile
                                </p>
                                <h1 className="mt-1 sm:mt-2 text-2xl sm:text-4xl font-semibold text-slate-900">
                                    {user.name}
                                </h1>
                            </div>
                        </div>

                        {/* LOGOUT */}
                        <div className="w-full sm:w-auto">
                            <LogoutButton />
                        </div>
                    </div>

                    {/* INFO CARDS */}
                    <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2">

                        {/* NAME */}
                        <div className="rounded-[16px] bg-[#f8fbff] p-4 sm:p-5">
                            <div className="flex items-center gap-2 sm:gap-3 text-[#0d57a7]">
                                <UserRound className="h-4 w-4 sm:h-5 sm:w-5" />
                                <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                    Full Name
                                </p>
                            </div>
                            <p className="mt-2 sm:mt-4 text-base sm:text-lg font-medium text-slate-900">
                                {user.name}
                            </p>
                        </div>

                        {/* EMAIL */}
                        <div className="rounded-[16px] bg-[#f8fbff] p-4 sm:p-5">
                            <div className="flex items-center gap-2 sm:gap-3 text-[#0d57a7]">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                                <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                    Email
                                </p>
                            </div>
                            <p className="mt-2 sm:mt-4 text-base sm:text-lg font-medium text-slate-900 break-all">
                                {user.email}
                            </p>
                        </div>

                        {/* STATUS */}
                        <div className="rounded-[16px] bg-[#f8fbff] p-4 sm:p-5 sm:col-span-2">
                            <div className="flex items-center gap-2 sm:gap-3 text-[#0d57a7]">
                                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5" />
                                <p className="text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                                    Account Status
                                </p>
                            </div>

                            <p className="mt-2 sm:mt-4 text-base sm:text-lg font-medium text-slate-900">
                                Authenticated and ready to shop
                            </p>

                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-slate-600">
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