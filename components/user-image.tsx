"use client";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const UserImage = () => {
  const { data: session } = useSession();

  if (!session?.user) return null;
  return (
    <Avatar className="size-36">
      <AvatarImage src={session.user.image || ""} alt="@shadcn" />
      <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
    </Avatar>
  );
};
