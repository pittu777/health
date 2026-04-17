"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    ChevronRight,
    Facebook,
    Instagram,
    LockKeyhole,
    Mail,
    Search,
    ShoppingCart,
    Twitter,
    User,
} from "lucide-react";


interface AuthFormProps {
    type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === "login";

    const config = {
        endpoint: isLogin ? '/api/auth/login' : "/api/auth/register",
        redirect: isLogin ? '/' : '/login',
        title: isLogin ? 'Welcome back' : 'Create account',
        buttonText: isLogin ? "Login" : "Register",
        eyebrow: isLogin ? "Sign in" : "Join now",
        description: isLogin
            ? "Access your cart, saved products, and checkout flow with the same clean storefront experience."
            : "Create your account to save your cart, explore products, and continue building the store experience.",
    };

    const { error, loading, handleChange, handleSubmit } = useAuth(config.endpoint, config.redirect);

    return (
        <div className="min-h-screen bg-[#eef5ff] text-slate-900">
            <div className="mx-auto flex min-h-screen max-w-[1280px] flex-col px-4 py-6 sm:px-6 lg:px-10">
                <header className="rounded-t-[28px] bg-[#0f4fa8] px-6 py-5 text-white shadow-[0_18px_45px_-28px_rgba(15,79,168,0.75)] sm:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <span className="text-3xl font-bold tracking-tight">Logo</span>
                        </Link>

                        <div className="flex flex-1 justify-center lg:px-8">
                            <div className="relative w-full max-w-md">
                                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-100/80" />
                                <Input
                                    type="search"
                                    placeholder="Search for products..."
                                    readOnly
                                    aria-label="Search preview"
                                    className="h-12 rounded-xl border border-white/20 bg-[#135cbc] pl-11 text-sm text-white placeholder:text-blue-100/80"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 self-start lg:self-auto">
                            <div className="inline-flex items-center gap-2 rounded-xl bg-[#0b3f87] px-5 py-3 text-sm font-semibold text-white">
                                <ShoppingCart className="h-4 w-4" />
                                Cart
                            </div>
                            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/20">
                                <User className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 bg-white/70 px-6 py-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.3)] backdrop-blur sm:px-8 lg:px-10 lg:py-10">
                    <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
                        <aside className="space-y-6">
                            <div className="rounded-3xl bg-[#0f4fa8] p-6 text-white shadow-[0_24px_45px_-30px_rgba(15,79,168,0.9)]">
                                <p className="text-2xl font-semibold">Filters</p>

                                <div className="mt-6 space-y-3">
                                    <p className="text-base font-medium">Category</p>
                                    {["All", "Electronics", "Clothing", "Home"].map((item, index) => (
                                        <div key={item} className="flex items-center gap-3 text-sm text-blue-50">
                                            <span className={`h-4 w-4 rounded-full border ${index === 0 ? "border-white bg-white shadow-[inset_0_0_0_4px_#0f4fa8]" : "border-blue-200/70"}`} />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <div className="mb-4 flex items-center justify-between text-base font-medium">
                                        <span>Price</span>
                                        <span className="text-sm text-blue-100">0 - 1000</span>
                                    </div>
                                    <div className="h-1 rounded-full bg-white/35">
                                        <div className="relative h-1 rounded-full bg-white">
                                            <span className="absolute -right-1.5 -top-1.5 h-4 w-4 rounded-full border-2 border-white bg-[#0f4fa8]" />
                                        </div>
                                    </div>
                                    <div className="mt-3 flex justify-between text-sm text-blue-100">
                                        <span>0</span>
                                        <span>1000</span>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)]">
                                <p className="text-2xl font-semibold text-slate-900">{config.eyebrow}</p>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{config.description}</p>
                            </div>
                        </aside>

                        <section className="flex items-start justify-center">
                            <div className="w-full max-w-5xl rounded-[30px] bg-white p-6 shadow-[0_28px_70px_-45px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
                                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f4fa8]">{config.eyebrow}</p>
                                            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">{config.title}</h1>
                                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                                                Continue with a storefront-inspired account experience that matches the product listing interface.
                                            </p>
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                                <p className="text-base font-semibold text-slate-900">Fast access</p>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    Jump back into browsing, filtering, and cart updates without losing flow.
                                                </p>
                                            </div>
                                            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                                <p className="text-base font-semibold text-slate-900">Clean layout</p>
                                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                                    A simple, product-style composition that fits the UI direction from your reference.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-[28px] border border-slate-200 bg-[#f7faff] p-6 shadow-[0_24px_60px_-40px_rgba(15,79,168,0.45)]">
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-semibold text-slate-950">{config.buttonText}</h2>
                                            <p className="mt-2 text-sm text-slate-600">
                                                {isLogin ? "Enter your details to continue shopping." : "Fill in your details to get started."}
                                            </p>
                                        </div>

                                        {error ? (
                                            <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                                {error}
                                            </div>
                                        ) : null}

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            {!isLogin && (
                                                <div className="space-y-2">
                                                    <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
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
                                                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
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
                                                <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
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
                                                {loading ? 'Processing...' : config.buttonText}
                                                {!loading ? <ChevronRight className="h-4 w-4" /> : null}
                                            </Button>
                                        </form>

                                        <p className="mt-5 text-sm text-slate-600">
                                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                                            <Link href={isLogin ? '/register' : '/login'} className="font-semibold text-[#0f4fa8] hover:underline">
                                                {isLogin ? 'Register here' : 'Login here'}
                                            </Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>

                <footer className="rounded-b-[28px] bg-[#0a2f6f] px-6 py-10 text-white sm:px-8">
                    <div className="grid gap-8 sm:grid-cols-3">
                        <div>
                            <p className="text-2xl font-semibold">Filters</p>
                            <div className="mt-5 flex flex-wrap gap-4 text-sm text-blue-100">
                                <span>All</span>
                                <span>ElecEtronk</span>
                            </div>
                            <p className="mt-8 text-sm text-blue-100">© 2024 American</p>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold">About Us</p>
                            <div className="mt-5 space-y-3 text-sm text-blue-100">
                                <p>About Us</p>
                                <p>Contact</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-2xl font-semibold">Follow Us</p>
                            <div className="mt-5 flex items-center gap-3">
                                {[Facebook, Twitter, Instagram].map((Icon, index) => (
                                    <span
                                        key={index}
                                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0f4fa8]"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
