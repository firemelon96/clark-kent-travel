import Image from "next/image";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const logoVariants = cva("shink-0", {
  variants: {
    size: {
      default: "size-10",
      sm: "size-20",
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
    <div className={cn(logoVariants({ size }), "relative")}>
      <Image fill src="/resources/logo.png" alt="clark kent travel logo" />
    </div>
  );
};
