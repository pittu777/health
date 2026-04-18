"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 to-red-100 px-4 py-10 text-slate-900">
            <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white/90 p-7 shadow-[0_24px_70px_-45px_rgba(244,63,94,0.45)] backdrop-blur sm:p-8">
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
                    <p className="mt-2 text-sm text-slate-600">
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <div className="mt-6 space-y-3">
                        <Button
                            onClick={reset}
                            className="w-full bg-red-600 hover:bg-red-700"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Try again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => window.location.href = "/"}
                            className="w-full"
                        >
                            Go to Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}