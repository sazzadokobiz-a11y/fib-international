import { NextRequest, NextResponse } from "next/server";
import { getAdmin } from "./services/admin";

export async function proxy(request: NextRequest) {
    const { pathname, origin } = request.nextUrl;

    // login page allow
    if (pathname === "/login") {
        return NextResponse.next();
    }

    const admin = await getAdmin();

    if (!admin) {
        return NextResponse.redirect(
            new URL(`/login?redirect=${pathname}`, origin)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico).*)"],
};