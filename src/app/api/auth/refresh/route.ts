import { connectDB } from "@/config/db";
import {
    clearAuthCookies,
    getRefreshTokenFromCookies,
    setAuthCookies,
    verifyRefreshToken,
} from "@/lib/auth/session";
import userModel from "@/models/user.model";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const refreshToken = getRefreshTokenFromCookies(cookieStore);

        if (!refreshToken) {
            clearAuthCookies(cookieStore);
            return NextResponse.json({ error: "Refresh token missing" }, { status: 401 });
        }

        const { userId } = verifyRefreshToken(refreshToken);

        await connectDB();
        const user = await userModel.findById(userId).select("_id");

        if (!user) {
            clearAuthCookies(cookieStore);
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        setAuthCookies(cookieStore, { userId: user._id.toString() });

        return NextResponse.json({ message: "Session refreshed" });
    } catch {
        const cookieStore = await cookies();
        clearAuthCookies(cookieStore);
        return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }
}
