"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { stringToUppercase } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export const AppBreadcrumb = () => {
  const pathname = usePathname();

  const pathnameArray = pathname.split("/").slice(1);

  const lastItem = pathnameArray[pathnameArray.length - 1];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathnameArray.map((path) =>
          path === lastItem ? (
            <BreadcrumbItem key={path}>
              <BreadcrumbPage>{stringToUppercase(path)}</BreadcrumbPage>
            </BreadcrumbItem>
          ) : (
            <Fragment key={path}>
              <BreadcrumbItem>
                <BreadcrumbLink href={`${pathname}`}>
                  {stringToUppercase(path)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </Fragment>
          ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
