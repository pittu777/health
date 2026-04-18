"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-[18px] bg-[#f8fbff] p-5">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-24 w-24 rounded-[18px]" />
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}