import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const logoVariants = cva("shink-0", {
  variants: {
    size: {
      default: "size-10",
      lg: "size-70",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LogoProps extends VariantProps<typeof logoVariants> {
  className?: string;
}

export const Logo = ({ size, className }: LogoProps) => {
  return (
    <Link href={"/"}>
      <Image
        width={140}
        height={140}
        src="/resources/logo.png"
        alt="clark kent travel logo"
        className={cn(logoVariants({ size }), className)}
      />
    </Link>
  );
};
