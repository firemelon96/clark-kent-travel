import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useUrlParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const params = new URLSearchParams(searchParams.toString());

  const eachParams = Object.fromEntries(params);

  return {
    params,
    eachParams,
    router,
    pathname,
  };
};
