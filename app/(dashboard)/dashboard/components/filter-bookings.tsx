"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface FilterProps {
  count: number;
}

export const FilterBookings = ({ count }: FilterProps) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 6;
  const perPage = Math.ceil(count / limit);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${+page - 1}`} />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`?page=${+page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
