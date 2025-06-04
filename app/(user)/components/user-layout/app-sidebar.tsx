"use client";
import * as React from "react";
import {
  HeartIcon,
  LogOutIcon,
  Package2Icon,
  Settings,
  User2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { UserImage } from "@/components/user-image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

// This is sample data.
const data = {
  nav: [
    {
      name: "Bookings",
      icon: Package2Icon,
      href: "/profile",
    },
    { name: "Wishlists", icon: HeartIcon, href: "/profile/wishlists" },
    { name: "Settings", icon: Settings, href: "/profile/settings" },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      {...props}
      collapsible="none"
      className="m-2 hidden shrink-0 rounded-xl border shadow-sm md:flex"
    >
      <SidebarContent>
        <SidebarHeader>
          <div className="flex flex-col items-center justify-center gap-2 p-4">
            <UserImage />
            <div className="text-center">
              <p>Namee of the user</p>
              <span className="text-muted-foreground text-xs">Role: User</span>
            </div>
          </div>
        </SidebarHeader>
        <Separator />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.nav.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Button
                      asChild
                      variant={item.href === pathname ? "default" : "ghost"}
                    >
                      <Link
                        href={item.href}
                        className={"flex items-start justify-start"}
                      >
                        <item.icon /> {item.name}
                      </Link>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    onClick={() => signOut()}
                    variant={"secondary"}
                    className="flex cursor-pointer items-start justify-start"
                  >
                    <LogOutIcon /> Logout
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
