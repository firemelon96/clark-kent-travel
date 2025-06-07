import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFullTours } from "@/lib/data";
import Link from "next/link";

const TourPage = async () => {
  const tours = await getFullTours();

  console.log(tours);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex justify-between space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Tours</h1>
          <p className="text-muted-foreground text-xs">
            Manage your tour listings.
          </p>
        </div>
        <Button asChild>
          <Link href="/profile/tours/create">Create</Link>
        </Button>
      </div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TourPage;
