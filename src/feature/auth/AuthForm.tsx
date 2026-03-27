"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import { Input } from "@/components/ui/input";
import Link from "next/link";


interface AuthFormProps {
    type: 'login' | 'register'
}

export default function AuthForm({ type }: AuthFormProps) {
    const isLogin = type === "login";

    const config = {
        endpoint: isLogin ? '/api/auth/login' : "/api/auth/register",
        redirect: isLogin ? '/' : '/login',
        title: isLogin ? 'Welcome back' : 'create account',
        buttonText: isLogin ? "Login" : "Register",
    };

    const { error, loading, handleChange, handleSubmit } = useAuth(config.endpoint, config.redirect);

    return (
        <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h1>{config.title}</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {!isLogin && (
                    <Input name="name" type="text" placeholder="Full Name" required onChange={handleChange} />
                )}
                <Input name="email" type="email" placeholder="Email" required onChange={handleChange} />
                <Input name="password" type="password" placeholder="Password" required onChange={handleChange} />

                <Button type="submit" disabled={loading} style={{ padding: '10px', cursor: 'pointer' }}>
                    {loading ? 'Processing...' : config.buttonText}
                </Button>
            </form>

            <p style={{ marginTop: '15px', fontSize: '14px' }}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link href={isLogin ? '/register' : '/login'} style={{ color: 'blue' }}>
                    {isLogin ? 'Register here' : 'Login here'}
                </Link>
            </p>
        </div>
    );
}