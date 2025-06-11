import { formatPeso } from "@/app/lib/helpers";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User2Icon } from "lucide-react";

interface RoomTableProps {
  rooms: {
    roomId: string;
    type: string;
    description: string;
    maxOccupancy: number;
    bedType: string;
    pricing: {
      currency: string;
      baseRate: number;
      extraPersonCharge: number;
    };
  }[];
}

export const RoomTable = ({ rooms }: RoomTableProps) => {
  return (
    <div className="border-y">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-52">Room</TableHead>
            <TableHead className="w-40">Number of person</TableHead>
            <TableHead className="text-center">Bed Type</TableHead>
            <TableHead className="w-52">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow className="h-52 px-2" key={room.roomId}>
              <TableCell className="w-80">
                <div className="flex flex-col">
                  <p className="text-xl font-semibold">{room.type}</p>
                  <span className="text-wrap text-slate-500">
                    {room.description}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: room.maxOccupancy }).map((_, i) => (
                    <User2Icon key={i} className="size-5" />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-center">{room.bedType}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-lg">Price:</p>
                    <p className="text-xl font-semibold">
                      {formatPeso(room.pricing.baseRate)}{" "}
                    </p>
                  </div>
                  <Button>Select</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
