"use client";

import * as React from "react";
import Link from "next/link";

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
import { Menu } from "lucide-react";
import { Logo } from "@/app/components/logo";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "./ui/button";

export const menuItems = [
  {
    title: "Clark kent",
    items: [
      {
        title: "Clark Kent",
        description: "Travel and Tours Services",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
        description: "See what our company is about",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Easiest way to contact us",
      },
      {
        title: "Legalities",
        href: "/legalities",
        description: "See our legal documents for legitamacy",
      },
    ],
  },
  {
    title: "Services",
    items: [
      {
        title: "Travel and Tours",
        href: "/travel-and-tours",
        description:
          "Explore the Beauty of Palawan with our Travel and Tour Services",
      },
      {
        title: "Transfers",
        href: "/transfers",
        description: "Book a transfer with us, from airport, land, and water",
      },
      {
        title: "Rentals",
        href: "/rentals",
        description:
          "A Budget friendly rentals that can cater to your needs. Book with us now",
      },
      {
        title: "Accomodations",
        href: "/accomodations",
        description:
          "From 5 star accomodation to budget friendly that will suit your needs!",
      },
    ],
  },
  { title: "Pricing", href: "/pricing" },
];

export function NewNavbar() {
  return (
    <div className="bg-white">
      <div className="container mx-auto flex h-12 items-center justify-between px-4 md:px-20">
        <Logo />

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {menuItems.slice(0, 1).map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <Logo size="lg" />
                          <div className="mb-2 mt-4 text-lg font-medium uppercase">
                            {item.items?.[0].title}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {item.items?.[0].description}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    {item.items?.slice(1).map((subItem) => (
                      <ListItem href={subItem.href} title={subItem.title}>
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {menuItems.slice(1, 3).map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
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
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
                      <span className="text-lg font-semibold">
                        {item.title}
                      </span>
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
