
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();

        // Delete the cookie named 'token'
        cookieStore.delete("token");

        return NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { error: "Failed to logout" },
            { status: 500 }
        );
    }
}
