import NextAuth from "next-auth";
import authConfig from "@/lib/auth/auth.config";

export const { auth: middleware } = NextAuth(authConfig);

export default middleware((request) => {
  const isLoggedIn = Boolean(request.auth);

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/projects") ||
    request.nextUrl.pathname.startsWith("/api/projects");

  if (isProtectedRoute && !isLoggedIn) {
    const loginUrl = new URL("/login", request.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/projects/:path*",
    "/api/projects/:path*",
  ],
};
