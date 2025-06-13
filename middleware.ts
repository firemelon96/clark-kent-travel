import { auth } from "@/auth";

export default auth((req) => {
  const admin = req.auth?.user.role === "ADMIN";
  const user = req.auth?.user.role === "USER";

  if (!req.auth && req.nextUrl.pathname.startsWith("/dashboard")) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    const newUrl = new URL("/dashboard", req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
