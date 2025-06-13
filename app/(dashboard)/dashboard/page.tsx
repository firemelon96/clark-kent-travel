import { auth } from "@/auth";
import { redirect } from "next/navigation";

const ProtectedRoute = async () => {
  const session = await auth();

  if (session?.user.role === "ADMIN") {
    return redirect("/dashboard/tours");
  }

  return redirect("/dashboard/bookings");
};

export default ProtectedRoute;
