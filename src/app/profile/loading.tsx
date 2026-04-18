import { Mail, ShieldCheck, UserRound } from "lucide-react";
import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <StoreLayoutShell header={<StoreLayoutHeader />}>
            <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
                <div className="rounded-4xl bg-white p-5 sm:p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-center gap-3 sm:gap-4">
                            <Skeleton className="h-12 w-12 sm:h-16 sm:w-16 rounded-full" />
                            <div>
                                <Skeleton className="h-3 w-12 sm:w-16" />
                                <Skeleton className="h-6 w-32 sm:h-8 sm:w-48 mt-2" />
                            </div>
                        </div>

                        <Skeleton className="h-10 w-24 sm:w-32" />
                    </div>

                    <div className="mt-6 sm:mt-8 grid gap-3 sm:gap-4 sm:grid-cols-2">
                        <div className="rounded-3xl bg-[#f8fbff] p-4 sm:p-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-[#0d57a7]" />
                                <Skeleton className="h-3 w-16 sm:w-20" />
                            </div>
                            <Skeleton className="h-4 w-24 sm:h-5 sm:w-32 mt-2 sm:mt-4" />
                        </div>

                        <div className="rounded-3xl bg-[#f8fbff] p-4 sm:p-5">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[#0d57a7]" />
                                <Skeleton className="h-3 w-12 sm:w-16" />
                            </div>
                            <Skeleton className="h-4 w-32 sm:h-5 sm:w-40 mt-2 sm:mt-4" />
                        </div>

                        <div className="rounded-3xl bg-[#f8fbff] p-4 sm:p-5 sm:col-span-2">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-[#0d57a7]" />
                                <Skeleton className="h-3 w-24 sm:w-32" />
                            </div>
                            <Skeleton className="h-4 w-48 sm:h-5 sm:w-64 mt-2 sm:mt-4" />
                            <Skeleton className="h-3 w-full mt-1 sm:mt-2" />
                            <Skeleton className="h-3 w-3/4 mt-1" />
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayoutShell>
    );
}