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
import { useMedia } from "react-use";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

//TODO: Fix the navigation error

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
        title: "Mission & Vision",
        href: "/mission-vision",
        description: "Our mission and vision",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Easiest way to contact us",
      },
      {
        title: "Legalities",
        href: "/legalities",
        description: "Legal documents for legitamacy",
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
        title: "Accommodations",
        href: "/accommodations",
        description:
          "From 5 star accomodation to budget friendly that will suit your needs!",
      },
    ],
  },
  { title: "🇵🇭", href: "/currency" },
];

export function NewNavbar() {
  const { data: session } = useSession();

  const notMobile = useMedia("(min-width: 767px)", false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (notMobile) {
      setOpen(false);
    }
  }, [notMobile]);

  const onClose = () => {
    setOpen(false);
  };
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
                  <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col items-center justify-center rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <Logo size="sm" />
                          <div className="mt-2 text-center text-lg font-medium uppercase">
                            {item.items?.[0].title}
                          </div>
                          <p className="text-muted-foreground text-center text-sm leading-tight">
                            {item.items?.[0].description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <div>
                      {item.items?.slice(1).map((subItem) => (
                        <ListItem
                          key={subItem.title}
                          href={subItem.href}
                          title={subItem.title}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </div>
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
                  <Link
                    href={item.href}
                    className={navigationMenuTriggerStyle()}
                  >
                    {item.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          {/* Authentication */}
          <div>
            {session?.user ? (
              <div className="flex gap-2">
                <Button asChild>
                  <Link href={`/profile`}>Profile</Link>
                </Button>
                <Button onClick={() => signOut()}>Log out</Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant={"secondary"}>Register</Button>
                <Button variant={"secondary"}>Login</Button>
              </div>
            )}
          </div>
        </NavigationMenu>
        <Button
          variant="outline"
          onClick={() => setOpen(true)}
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <Sheet onOpenChange={onClose} open={open}>
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
                          onClick={onClose}
                          key={subItem.title}
                          href={subItem.href}
                          className="text-muted-foreground hover:text-primary text-sm"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      onClick={onClose}
                      href={item.href}
                      className="hover:text-primary text-lg font-semibold"
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
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors select-none",
            className,
          )}
          {...props}
        >
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
