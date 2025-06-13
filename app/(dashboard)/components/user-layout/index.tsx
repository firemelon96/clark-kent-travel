import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./app-sidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto max-w-5xl">
      <SidebarProvider>
        <AppSidebar />
        <main className="my-2 mr-2 w-full">
          <header className="mb-2 flex w-full justify-end gap-2 rounded-xl border p-4 shadow-sm">
            Role
          </header>
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
};

export default UserLayout;
