import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { BsGoogle } from "react-icons/bs";
import { IconType } from "react-icons";

interface LoginButtonProps {
  provider: string;
  icon: IconType;
}

export const LoginButton = ({ provider, icon: Icon }: LoginButtonProps) => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => signIn(provider, { redirectTo: "/" })}
    >
      <Icon />
      Login with {provider}
    </Button>
  );
};
