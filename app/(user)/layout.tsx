import { auth } from "@/auth";
import AdminLayout from "./components/admin-layout";
import UserLayout from "./components/user-layout";

const ProfileLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  const role = session?.user.role;

  return role === "ADMIN" ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <UserLayout>{children}</UserLayout>
  );
};

export default ProfileLayout;
