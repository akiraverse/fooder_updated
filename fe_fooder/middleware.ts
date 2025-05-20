import { NextResponse, NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
	const token = request.cookies.get("token")?.value;
	const role = request.cookies.get("role")?.value;

	if (request.nextUrl.pathname === "/") {
		const redirectAdmin = request.nextUrl.clone();
		redirectAdmin.pathname = "/login"
		return NextResponse.redirect(redirectAdmin);
	}

	if (request.nextUrl.pathname.startsWith("/manager")) {
		if (!token || !role) {
			const redirectAdmin = request.nextUrl.clone();
			redirectAdmin.pathname = "/login"
			return NextResponse.redirect(redirectAdmin);
		}

		if (role !== "MANAGER") {
			const redirectAdmin = request.nextUrl.clone();
			redirectAdmin.pathname = "/login"
			return NextResponse.redirect(redirectAdmin);
		}

		return NextResponse.next()
	}
}

export const config = {
	matcher: [
		"/manager/:path*",
		"/"
	]
}