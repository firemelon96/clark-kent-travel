"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { tourTypes, unitTypes } from "@/db/schema";
import { fullTourUpdateSchema } from "@/types/drizzle-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Image,
  Loader2Icon,
  MoreVerticalIcon,
  PencilIcon,
  Trash2Icon,
  X,
} from "lucide-react";
import { Suspense, useRef, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { deleteImage } from "@/actions/cloudinary/delete-images";
import { ItineraryForm } from "./itinerary-form";
import { PricingForm } from "./pricing-form";
import { createTour } from "@/actions/admin/create-tour";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateTour } from "@/actions/admin/update-tour";

interface Props {
  tourId: string;
  defaultValues: z.infer<typeof fullTourUpdateSchema>;
}

export const UpdateTourForm = ({ defaultValues, tourId }: Props) => {
  const [inclusionValue, setInclusionValue] = useState("");
  const [exclusioValue, setExclusioValue] = useState("");
  // const [publicId, setPublicId] = useState<string[]>([]);

  const [isPendingDelete, deleteImageTransition] = useTransition();
  const [isPendingCreate, createTourTransition] = useTransition();

  const imageBufferRef = useRef<string[]>([]);
  const publicIdRef = useRef<string[]>([]);

  const router = useRouter();

  const form = useForm<z.infer<typeof fullTourUpdateSchema>>({
    resolver: zodResolver(fullTourUpdateSchema),
    defaultValues,
  });

  const inclusions = form.watch("inclusions") || [];
  const exclusions = form.watch("exclusions") || [];
  const images = form.watch("images") || [];
  const publicIds = form.watch("publicIds");

  const updateInclusions = (array: string[]) => {
    form.setValue("inclusions", array, { shouldValidate: true });
  };

  const updateExclusions = (array: string[]) => {
    form.setValue("exclusions", array, { shouldValidate: true });
  };

  const onKeyDownInclusion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = inclusionValue.trim();
      if (trimmed && !inclusions.includes(trimmed)) {
        updateInclusions([...inclusions, trimmed]);
        setInclusionValue("");
      }
    }
  };

  const onKeyDownExclusion = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = exclusioValue.trim();
      if (trimmed && !exclusions.includes(trimmed)) {
        updateExclusions([...exclusions, trimmed]);
        setExclusioValue("");
      }
    }
  };

  const removeInclusion = (item: string) => {
    updateInclusions(inclusions.filter((i) => i !== item));
  };

  const removeExclusion = (item: string) => {
    updateExclusions(exclusions.filter((i) => i !== item));
  };

  // form.setValue("publicIds", publicId, { shouldValidate: true });

  const onSubmit = (values: z.infer<typeof fullTourUpdateSchema>) => {
    // console.log(values);
    createTourTransition(async () => {
      const res = await updateTour(values);
      if (res?.success) {
        toast.success(res.message);
        router.push("/dashboard/tours");
      }
      if (!res.success) {
        toast.error(res.message);
      }
    });
  };

  // const onDeleteImages = (ids: string[]) => {
  //   deleteImageTransition(async () => {
  //     await deleteImage(ids, tourId);
  //   });
  // };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Update Tour</h1>
            <p className="text-muted-foreground text-xs">
              Update existing tour.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => router.back()}
              type="button"
              className="cursor-pointer"
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPendingCreate || !form.formState.isDirty}
            >
              {isPendingCreate ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <PencilIcon className="size-4" />
              )}{" "}
              Update
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          <div className="col-span-3 flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-xl border p-4">
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPendingCreate || isPendingDelete}
                        placeholder="title"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPendingCreate || isPendingDelete}
                        className="h-44"
                        placeholder="description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="inclusions"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Inclusions</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        disabled={isPendingCreate || isPendingDelete}
                        value={inclusionValue}
                        onChange={(e) => setInclusionValue(e.target.value)}
                        placeholder="Add inclusions and press enter"
                        onKeyDown={onKeyDownInclusion}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap gap-2">
                {inclusions.map((item: string) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-md bg-emerald-100 px-3 py-1 text-sm font-medium text-gray-500"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeInclusion(item)}
                      className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>

              <FormField
                name="exclusions"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Exclusions</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPendingCreate || isPendingDelete}
                        type="text"
                        value={exclusioValue}
                        onChange={(e) => setExclusioValue(e.target.value)}
                        placeholder="Add exclusions and press enter"
                        onKeyDown={onKeyDownExclusion}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-wrap gap-2">
                {exclusions.map((item: string) => (
                  <div
                    key={item}
                    className="inline-flex items-center rounded-md bg-rose-100 px-3 py-1 text-sm font-medium text-gray-500"
                  >
                    {item}
                    <button
                      type="button"
                      onClick={() => removeExclusion(item)}
                      className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-rose-300"
                      aria-label={`Remove ${item}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <ItineraryForm />
          </div>

          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex flex-col gap-4 rounded-xl border p-4">
              <div className="flex flex-col gap-1">
                <div
                  className={cn(
                    "bg-muted flex aspect-video items-center justify-center rounded-xl",
                    images.length > 0 && "hidden",
                    form.formState.errors.images && "border border-rose-500",
                  )}
                >
                  <FormField
                    name="images"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-shadow-white">
                          Upload your image
                        </FormLabel>
                        <FormControl>
                          <CldUploadButton
                            options={{ multiple: true }}
                            onSuccess={(res: any) => {
                              console.log(res);
                              const newUrl = res.info.secure_url;
                              const publicId = res.info.public_id;
                              if (newUrl) {
                                imageBufferRef.current = [
                                  ...imageBufferRef.current,
                                  newUrl,
                                ];

                                field.onChange(imageBufferRef.current);
                                // field.onChange([...(field.value || []), newUrl]);
                              }

                              if (publicId) {
                                publicIdRef.current = [
                                  ...publicIdRef.current,
                                  publicId,
                                ];
                                form.setValue("publicIds", publicIdRef.current);
                                // setPublicId(publicIdRef.current);
                              }
                            }}
                            uploadPreset="clark-kent"
                            className={cn(buttonVariants())}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {images.length > 0 && (
                  <div className="relative aspect-video items-center justify-center overflow-hidden rounded-t-xl">
                    <CldImage
                      fill
                      src={images[0]}
                      alt="Des of my image"
                      className="object-cover"
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className="absolute top-2 right-2"
                      >
                        <Button variant={"secondary"}>
                          <MoreVerticalIcon />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuItem>
                          <Button
                            onClick={() => {
                              form.setValue("images", [], {
                                shouldValidate: true,
                              });
                            }}
                            variant={"secondary"}
                          >
                            <Trash2Icon /> Remove Images
                          </Button>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {images.length > 1 && (
                  <div className="flex h-20 gap-1 overflow-hidden overflow-x-scroll rounded-b-xl">
                    {images.slice(1).map((img: string) => (
                      <div key={img} className="relative aspect-video">
                        <CldImage fill src={img} alt="images" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex">
                <FormField
                  name="duration"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl className="rounded-tr-none rounded-br-none">
                        <Input
                          placeholder="Duration number"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name="durationUnit"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-30 rounded-tl-none rounded-bl-none border-l-0">
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitTypes.enumValues.map((value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Type of tour</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex"
                      >
                        {tourTypes.enumValues.map((name) => (
                          <FormItem
                            key={name}
                            className="flex items-center gap-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={name} />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="isFeatured"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Feature this tour</FormLabel>
                    <FormDescription>
                      Display this tour in featured.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <PricingForm />
          </div>
        </div>
      </form>
    </Form>
  );
};
