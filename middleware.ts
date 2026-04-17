import { NextRequest, NextResponse } from "next/server";

const AUTH_ROUTES = new Set(["/login", "/register"]);

function isPublicAsset(pathname: string) {
    return pathname.startsWith("/_next") || pathname.includes(".");
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api") || isPublicAsset(pathname)) {
        return NextResponse.next();
    }

    const hasSession =
        Boolean(request.cookies.get("accessToken")?.value) ||
        Boolean(request.cookies.get("refreshToken")?.value);

    if (!hasSession && !AUTH_ROUTES.has(pathname)) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (hasSession && AUTH_ROUTES.has(pathname)) {
        const homeUrl = new URL("/", request.url);
        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
