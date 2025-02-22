import Image from "next/image";
import { Card, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { BiHorizontalCenter, BiMap } from "react-icons/bi";
import { LineIcon } from "react-share";
import { ArrowRight, Clock, MapPin, TimerReset } from "lucide-react";
import { RiMapPinFill } from "react-icons/ri";
import { BsClockFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Props {
  price: number;
  title: string;
  imageUrl: string | undefined;
  from: string;
  to: string;
  description: string;
  availability: string | { morning: string; afternoon: string };
}

export const ServiceCard = ({
  price,
  title,
  imageUrl,
  from,
  to,
  description,
  availability,
}: Props) => {
  const router = useRouter();
  const availString = typeof availability === "string";

  const onBook = () => {
    router.push("booking");
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative h-64 w-full overflow-hidden rounded-md md:h-40 md:w-52">
          <Image
            src={imageUrl || ""}
            fill
            alt="auto"
            className="object-cover"
          />
        </div>
        <div className="flex-1 flex-col">
          <p className="text-xl font-medium">{title}</p>
          <span className="flex items-center gap-1 text-black/70">
            <RiMapPinFill /> {from}
            <ArrowRight className="mx-3 size-4 text-black/40" />{" "}
            <RiMapPinFill /> {to}
          </span>
          <span className="flex items-center gap-1 pl-0.5 text-black/70">
            <BsClockFill className="size-3" />{" "}
            {availString ? "Availability" : "Morning"} :{" "}
            {availString ? availability : availability.morning}
          </span>
          {!availString && (
            <span className="flex items-center gap-1 pl-0.5 text-black/70">
              <BsClockFill className="size-3" />{" "}
              {availString ? "Availability" : "Afternoon"} :{" "}
              {availString ? availability : availability.afternoon}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end justify-end">
          <span className="text-sm text-black/70">Price:</span>
          <p className="text-xl font-semibold">{price}</p>
          <Button onClick={onBook}>Book Now</Button>
        </div>
      </div>
      <hr className="my-2" />
      <div className="flex w-full justify-end">
        <Button variant="outline" className="">
          Description
        </Button>
      </div>
    </Card>
  );
};
