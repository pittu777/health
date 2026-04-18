import Link from "next/link"
import { Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-10 text-slate-900">
            <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-white/90 p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <Search className="h-8 w-8 text-slate-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="mt-6 space-y-3">
                        <Button asChild className="w-full">
                            <Link href="/">
                                <Home className="mr-2 h-4 w-4" />
                                Go to Home
                            </Link>
                        </Button>
                        <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                            Go Back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}