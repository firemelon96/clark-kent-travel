"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  {
    title: "Products",
    items: [
      {
        title: "Analytics",
        href: "/products/analytics",
        description: "Measure and optimize your product performance",
      },
      {
        title: "Engagement",
        href: "/products/engagement",
        description: "Increase user interaction and satisfaction",
      },
      {
        title: "Security",
        href: "/products/security",
        description: "Protect your data and your customers",
      },
    ],
  },
  {
    title: "Solutions",
    items: [
      {
        title: "For Startups",
        href: "/solutions/startups",
        description: "Tailored solutions for growing businesses",
      },
      {
        title: "For Enterprise",
        href: "/solutions/enterprise",
        description: "Scalable options for large organizations",
      },
    ],
  },
  { title: "Pricing", href: "/pricing" },
  { title: "About", href: "/about" },
];

export function MainNav() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">MyCompany</span>
      </Link>
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {menuItems.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.items ? (
                <>
                  <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                      {item.items.map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          title={subItem.title}
                          href={subItem.href}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <Link href={item.href} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <div key={item.title}>
                {item.items ? (
                  <div className="flex flex-col space-y-2">
                    <span className="text-lg font-semibold">{item.title}</span>
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="text-lg font-semibold hover:text-primary"
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
