"use client";

import Link from "next/link";
import { ChevronRight, LockKeyhole, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../hooks/useAuth";

interface AuthFormProps {
    type: "login" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === "login";

    const config = {
        endpoint: isLogin ? "/api/auth/login" : "/api/auth/register",
        redirect: isLogin ? "/" : "/login",
        title: isLogin ? "Welcome back" : "Create account",
        buttonText: isLogin ? "Login" : "Register",
        description: isLogin
            ? "Sign in to access the store."
            : "Create an account to continue.",
    };

    const { error, loading, handleChange, handleSubmit } = useAuth(
        config.endpoint,
        config.redirect
    );

    return (
        <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#dbeafe,transparent_55%),linear-gradient(180deg,#eff6ff_0%,#f8fafc_100%)] px-4 py-10 text-slate-900 sm:px-6">
            <div className="w-full max-w-md rounded-[28px] border border-white/70 bg-white/90 p-7 shadow-[0_24px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur sm:p-8">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-[#0f4fa8] px-5 py-2 text-sm font-semibold text-white"
                    >
                        Health Shop
                    </Link>
                    <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
                        {config.title}
                    </h1>
                    <p className="mt-2 text-sm text-slate-600">{config.description}</p>
                </div>

                {error ? (
                    <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-slate-700">
                                Full Name
                            </label>
                            <div className="relative">
                                <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Full Name"
                                    required
                                    onChange={handleChange}
                                    className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-sm shadow-none"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-sm shadow-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-slate-700">
                            Password
                        </label>
                        <div className="relative">
                            <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                                onChange={handleChange}
                                className="h-12 rounded-2xl border-slate-200 bg-white pl-11 text-sm shadow-none"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full rounded-2xl bg-[#0f4fa8] text-sm font-semibold text-white hover:bg-[#0b438d]"
                    >
                        {loading ? "Processing..." : config.buttonText}
                        {!loading ? <ChevronRight className="h-4 w-4" /> : null}
                    </Button>

                </form>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full bg-[#0f4fa8] px-5 py-2 mt-2 text-sm font-semibold text-white w-full"
                >
                    Skip login for now..!
                </Link>

                <p className="mt-6 text-center text-sm text-slate-600">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Link
                        href={isLogin ? "/register" : "/login"}
                        className="font-semibold text-[#0f4fa8] hover:underline"
                    >
                        {isLogin ? "Register here" : "Login here"}
                    </Link>
                </p>

            </div>
        </div>
    );
}
