import NextAuth from "next-auth";
import authConfig from "@/lib/auth/auth.config";
export const { auth: middleware } = NextAuth(authConfig);
export default middleware((request) => {
  const isLoggedIn=Boolean(request.auth);
  const path=request.nextUrl.pathname;
  const publicPaths=["/","/login","/api/auth"];
  const isPublic=publicPaths.some(p=>path===p||path.startsWith(p+"/"));
  const protectedRoute=!isPublic&&!path.startsWith("/_next")&&!path.includes(".");
  if(protectedRoute&&!isLoggedIn){const loginUrl=new URL("/login",request.nextUrl.origin);loginUrl.searchParams.set("callbackUrl",path);return Response.redirect(loginUrl);}
});
export const config={matcher:["/((?!_next/static|_next/image|favicon.ico).*)"]};
