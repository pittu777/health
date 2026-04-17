import type { PropsWithChildren } from "react";
import StoreLayoutFooter from "./StoreLayoutFooter";

interface StoreLayoutShellProps extends PropsWithChildren {
    header: React.ReactNode;
}

export default function StoreLayoutShell({
    header,
    children,
}: StoreLayoutShellProps) {
    return (
        <div className="h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#ffffff_0%,#edf3fb_55%,#e9eff8_100%)] px-4 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto flex h-full max-w-[1160px] flex-col">
                {header}
                <div className="min-h-0 flex-1 overflow-hidden bg-white px-6 py-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)] sm:px-8 sm:py-8">
                    {children}
                </div>
                <StoreLayoutFooter />
            </div>
        </div>
    );
}
