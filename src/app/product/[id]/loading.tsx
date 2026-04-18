import StoreLayoutHeader from "@/feature/navbar/components/Header";
import StoreLayoutShell from "@/components/layout/StoreLayoutShell";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <StoreLayoutShell header={<StoreLayoutHeader />}>
            <div className="space-y-6">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Skeleton className="h-4 w-8" />
                    <span>/</span>
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">

                    <div className="flex items-center justify-center rounded-[24px] bg-[#f8fbff] p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <Skeleton className="h-[460px] w-full max-w-[720px] rounded-lg" />
                    </div>


                    <div className="rounded-[24px] bg-white p-8 shadow-[0_20px_35px_-30px_rgba(15,23,42,0.45)]">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-10 w-3/4 mt-5" />
                        <Skeleton className="h-8 w-24 mt-3" />
                        <div className="mt-3 flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 w-4" />
                            ))}
                            <Skeleton className="h-4 w-8 ml-2" />
                        </div>
                        <div className="mt-6 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-8 w-24 rounded-full" />
                            </div>
                            <Skeleton className="h-12 w-full" />
                        </div>

                        <div className="mt-8 rounded-[20px] bg-[#f8fbff] p-5">
                            <Skeleton className="h-6 w-20" />
                            <div className="mt-3 space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StoreLayoutShell>
    );
}