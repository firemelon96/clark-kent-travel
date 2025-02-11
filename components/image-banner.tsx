import Image from "next/image";
import { ImageDialog } from "./image-dialog";

type Props = {
  images?: string[];
};

export const ImageBanner = ({ images }: Props) => {
  return (
    <div>
      <div className="overflow-hidden rounded-md">
        <div className="relative grid h-96 grid-cols-3 grid-rows-2 gap-1">
          {images?.slice(0, 3).map((image, i) => (
            <div
              key={image}
              className="relative h-48 w-full overflow-hidden bg-rose-200 first:col-span-3 first:row-span-2 first:h-full even:col-span-2 md:first:col-span-2 md:first:row-span-2 md:even:col-span-1"
            >
              <Image src={image} fill alt="image" className="object-cover" />
            </div>
          ))}
          {/* <ImageDialog images={images} /> */}
        </div>
      </div>
    </div>
  );
};
