
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { clearAuthCookies } from "@/lib/auth/session";

export async function POST() {
    try {
        const cookieStore = await cookies();
        clearAuthCookies(cookieStore);

        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Failed to logout" },
            { status: 500 }
        );
    }
}
