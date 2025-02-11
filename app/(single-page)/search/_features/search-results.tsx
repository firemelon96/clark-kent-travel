"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const SearchResults = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searhcParams = useSearchParams();

  return <div>search result will bee here in the client</div>;
};
