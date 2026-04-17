import type { PropsWithChildren } from "react";
import StorefrontFooter from "./StorefrontFooter";

interface StorefrontShellProps extends PropsWithChildren {
    header: React.ReactNode;
}

export default function StorefrontShell({
    header,
    children,
}: StorefrontShellProps) {
    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,#ffffff_0%,#edf3fb_55%,#e9eff8_100%)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-[1160px]">
                {header}
                <div className="bg-white px-6 py-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.45)] sm:px-8 sm:py-8">
                    {children}
                </div>
                <StorefrontFooter />
            </div>
        </div>
    );
}
