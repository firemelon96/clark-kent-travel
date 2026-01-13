"use client";

import {
  GoogleMap,
  Marker,
  Rectangle,
  Circle,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "./ui/popover";
import { useRef, useState } from "react";
import { set } from "date-fns";
import { toast } from "sonner";
import { X } from "lucide-react";
import { generateGoogleMapLink } from "@/app/lib/helpers";

type MapLink = {
  lat: number;
  lng: number;
  placeId?: string;
};

const ALLOWED_BOUNDS = {
  north: 9.8292326,
  south: 9.7240098,
  east: 118.7787015,
  west: 118.7211949,
};

const center = {
  lat: (ALLOWED_BOUNDS.north + ALLOWED_BOUNDS.south) / 2,
  lng: (ALLOWED_BOUNDS.east + ALLOWED_BOUNDS.west) / 2,
};

export const MapLocation = ({
  setMaplink,
}: {
  setMaplink: (link: string) => void;
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  //   const [mapLink, setMapLink] = useState("");
  const [marker, setMarker] = useState<MapLink | null>(null);
  const [open, setOpen] = useState(false);

  //   console.log(mapLink);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  // 🔐 Rectangle validation
  const isInsideBounds = (lat: number, lng: number) => {
    const bounds = new google.maps.LatLngBounds(
      { lat: ALLOWED_BOUNDS.south, lng: ALLOWED_BOUNDS.west },
      { lat: ALLOWED_BOUNDS.north, lng: ALLOWED_BOUNDS.east },
    );
    return bounds.contains(new google.maps.LatLng(lat, lng));
  };

  const handleSelect = ({ lat, lng, placeId }: MapLink) => {
    if (!isInsideBounds(lat, lng)) {
      toast.error("Selected location is outside the allowed area.");
      return;
    }
    setMarker({ lat, lng });
    const link = generateGoogleMapLink({ lat, lng, placeId });
    setMaplink(link);
  };

  return (
    <Popover>
      <PopoverTrigger
        className="text-xs text-blue-500 underline"
        onClick={() => setOpen(!open)}
      >
        Add pickup location
      </PopoverTrigger>
      <PopoverContent className="mr-2 w-96 rounded-none p-1" align="start">
        {/*  */}
        {!isLoaded ? (
          <p>Loading map...</p>
        ) : (
          <div className="relative space-y-1">
            <Autocomplete
              className="absolute top-2 left-2 z-10 w-72"
              onLoad={(auto) => (autocompleteRef.current = auto)}
              onPlaceChanged={() => {
                const place = autocompleteRef.current?.getPlace();
                if (!place?.geometry?.location) return;
                handleSelect({
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                  placeId: place.place_id,
                });
              }}
            >
              <input
                type="text"
                placeholder="Search Hotel or Pick up location"
                className="absolute w-full rounded border border-gray-300 bg-white p-2"
              />
            </Autocomplete>
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={12}
              center={center}
              onClick={(e) => {
                const lat = e.latLng?.lat();
                const lng = e.latLng?.lng();

                if (!lat || !lng) return;
                const newMarker = { lat, lng };
                handleSelect(newMarker);
              }}
              options={{
                disableDefaultUI: true,
                zoomControl: true,
              }}
            >
              {marker && <Marker zIndex={2} position={marker} />}
              <Rectangle
                bounds={ALLOWED_BOUNDS}
                options={{
                  fillColor: "#2563eb",
                  fillOpacity: 0.1,
                  strokeColor: "#2563eb",
                  strokeOpacity: 0.6,
                  strokeWeight: 2,
                  zIndex: 1,
                  clickable: false,
                }}
              />
            </GoogleMap>
          </div>
        )}
        <PopoverClose className="absolute top-4 right-5">
          <X />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
