import { User } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
interface UserAvatarProps {
  user: User;
}
export const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar>
          <AvatarImage src={user.image || ""} alt="@shadcn" />
          <AvatarFallback>{user.name?.[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex justify-between">
            <Link href="/profile" className={"flex w-full justify-between"}>
              Profile
              <UserIcon />
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onClick={() => signOut()}
        >
          Log out
          <LogOutIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
