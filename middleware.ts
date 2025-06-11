import { auth } from "@/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith("/profile")) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    const newUrl = new URL("/profile", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
