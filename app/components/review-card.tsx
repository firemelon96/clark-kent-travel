import { Card } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  imageUrl: string;
  name: string;
  title: string;
  message: string;
}

export const ReviewCard = ({ imageUrl, name, title, message }: Props) => {
  return (
    <Card className="rounded-none border-rose-200 bg-transparent p-4 shadow-none">
      <div className="flex items-center gap-4">
        <div className="relative size-14 overflow-hidden rounded-full">
          <Image unoptimized src={imageUrl} fill alt="profile" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-lg font-medium tracking-wide">{name}</h5>
          <p className="text-slate-500">{title}</p>
        </div>
      </div>
      <span className="text-base text-slate-500">{message}</span>
    </Card>
  );
};
