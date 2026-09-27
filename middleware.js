import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { PUBLIC_ROUTES, LOGIN, ROOT } from "@/lib/routes";

const { auth } = NextAuth(authConfig);

const middleware = auth((req) => {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth;

    const isPublicRoute =
        PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) ||
        nextUrl.pathname === ROOT;

    if (!isAuthenticated && !isPublicRoute) {
        return NextResponse.redirect(new URL(LOGIN, nextUrl));
    }
    return NextResponse.next();
});

export default middleware;
export { middleware };

export const config = {
    matcher: [
      "/((?!api/auth|_next|favicon.ico|.*\\..*).*)",
      "/",
    ],
};
