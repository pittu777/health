import jwt, { JwtPayload, SignOptions, TokenExpiredError } from "jsonwebtoken";

type CookieOptions = {
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: "lax" | "strict" | "none";
    path?: string;
    maxAge?: number;
};

type CookieStore = {
    get(name: string): { value: string } | undefined;
    set(name: string, value: string, options?: CookieOptions): void;
    delete(name: string): void;
};

type SessionTokenPayload = JwtPayload & {
    sub: string;
    type: "access" | "refresh";
};

type SessionUserPayload = {
    userId: string;
};

export const ACCESS_TOKEN_COOKIE = "accessToken";
export const REFRESH_TOKEN_COOKIE = "refreshToken";

const ACCESS_TOKEN_TTL_SECONDS = 60 * 15;
const REFRESH_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;

function getCookieOptions(maxAge: number): CookieOptions {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge,
    };
}

function signToken(
    payload: SessionUserPayload,
    secret: string,
    type: SessionTokenPayload["type"],
    expiresIn: number
) {
    const options: SignOptions = {
        subject: payload.userId,
        expiresIn,
    };

    return jwt.sign({ type }, secret, options);
}

function verifyToken(
    token: string,
    secret: string,
    expectedType: SessionTokenPayload["type"]
) {
    const payload = jwt.verify(token, secret) as SessionTokenPayload;

    if (payload.type !== expectedType || !payload.sub) {
        throw new Error("Invalid token payload");
    }

    return { userId: payload.sub };
}

export function createAccessToken(payload: SessionUserPayload) {
    return signToken(payload, process.env.JWT_SECRET!, "access", ACCESS_TOKEN_TTL_SECONDS);
}

export function createRefreshToken(payload: SessionUserPayload) {
    return signToken(
        payload,
        process.env.REFRESH_TOKEN_SECRET!,
        "refresh",
        REFRESH_TOKEN_TTL_SECONDS
    );
}

export function verifyAccessToken(token: string) {
    return verifyToken(token, process.env.JWT_SECRET!, "access");
}

export function verifyRefreshToken(token: string) {
    return verifyToken(token, process.env.REFRESH_TOKEN_SECRET!, "refresh");
}

export function setAuthCookies(cookieStore: CookieStore, payload: SessionUserPayload) {
    cookieStore.set(
        ACCESS_TOKEN_COOKIE,
        createAccessToken(payload),
        getCookieOptions(ACCESS_TOKEN_TTL_SECONDS)
    );
    cookieStore.set(
        REFRESH_TOKEN_COOKIE,
        createRefreshToken(payload),
        getCookieOptions(REFRESH_TOKEN_TTL_SECONDS)
    );
}

export function clearAuthCookies(cookieStore: CookieStore) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
}

export function getAccessTokenFromCookies(cookieStore: CookieStore) {
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
}

export function getRefreshTokenFromCookies(cookieStore: CookieStore) {
    return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
}

export function isTokenExpiredError(error: unknown) {
    return error instanceof TokenExpiredError;
}
