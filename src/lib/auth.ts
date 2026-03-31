
import { cookies } from "next/headers";
import userModel from "@/models/user.model";
import { connectDB } from "@/config/db";
import {
    getAccessTokenFromCookies,
    getRefreshTokenFromCookies,
    isTokenExpiredError,
    verifyAccessToken,
    verifyRefreshToken,
} from "@/lib/auth/session";

export async function getCurrentSession() {
    const cookieStore = await cookies();
    const accessToken = getAccessTokenFromCookies(cookieStore);
    const refreshToken = getRefreshTokenFromCookies(cookieStore);

    if (!accessToken && !refreshToken) {
        return { user: null, shouldRefreshTokens: false };
    }

    let userId: string | null = null;
    let shouldRefreshTokens = false;

    if (accessToken) {
        try {
            userId = verifyAccessToken(accessToken).userId;
        } catch (error) {
            if (!isTokenExpiredError(error)) {
                return { user: null, shouldRefreshTokens: false };
            }
        }
    }

    if (!userId && refreshToken) {
        try {
            userId = verifyRefreshToken(refreshToken).userId;
            shouldRefreshTokens = true;
        } catch {
            return { user: null, shouldRefreshTokens: false };
        }
    }

    if (!userId) {
        return { user: null, shouldRefreshTokens: false };
    }

    await connectDB();
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
        return { user: null, shouldRefreshTokens: false };
    }

    return { user, shouldRefreshTokens };
}

export async function getCurrentUser() {
    try {
        const { user } = await getCurrentSession();
        return user;
    } catch {
        return null;
    }
}
