"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { tourSelectSchema } from "@/types/drizzle-schema";
import Link from "next/link";
import { z } from "zod";
import { TourImage } from "./tour-image";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteTour } from "@/actions/admin/delete-tour";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import useConfirmationStore from "@/hooks/use-confirmation-store";

interface TourTableProps {
  tours: z.infer<typeof tourSelectSchema>[];
}

export const TourTable = ({ tours }: TourTableProps) => {
  const [isPending, startTransition] = useTransition();
  const { openConfirmation } = useConfirmationStore();
  const router = useRouter();

  const onDelete = (id: string) => {
    startTransition(async () => {
      await deleteTour(id);
      toast.success("Tour deleted successfully");
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="flex-1">Tours</TableHead>
          <TableHead className="w-20">Duration</TableHead>
          <TableHead className="text-center">Featured</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tours.map((tour) => (
          <TableRow key={tour.id}>
            <TableCell>
              <Link href={`/dashboard/tours/${tour.id}`}>
                <TourImage
                  image={tour.images[0]}
                  description={tour.description}
                  title={tour.title}
                />
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {tour.duration} {tour.durationUnit}
            </TableCell>
            <TableCell className="text-center">
              {tour.isFeatured ? (
                <Badge className="bg-emerald-500">True</Badge>
              ) : (
                <Badge className="bg-rose-500">False</Badge>
              )}
            </TableCell>
            <TableCell className="text-center">{tour.type}</TableCell>
            <TableCell className="">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={"secondary"}>
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="left" sideOffset={10}>
                    <DropdownMenuItem
                      onClick={() => {
                        openConfirmation({
                          title: "Delete this tour?",
                          description:
                            "Are you sure you want to delete this tour? This cannot be undone.",
                          cancelLabel: "Cancel",
                          actionLabel: "Delete",
                          onAction() {
                            onDelete(tour.id);
                          },
                          onCancel() {
                            router.back();
                          },
                        });
                      }}
                    >
                      <TrashIcon /> Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        window
                          .open(`/travel-and-tours/${tour.slug}`, "_blank")
                          ?.focus();
                      }}
                    >
                      <EyeIcon /> View
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
