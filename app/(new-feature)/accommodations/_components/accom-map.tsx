"use client";
export const AccomMap = ({ mapLink }: { mapLink: string }) => {
  return (
    <div className="w-full overflow-hidden rounded-md border border-rose-500">
      <iframe src={mapLink} width="350" height="400" loading="lazy"></iframe>
    </div>
  );
};
