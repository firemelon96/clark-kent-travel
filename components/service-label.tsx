export const ServiceLabel = ({
  label,
  subHeading,
}: {
  label: string;
  subHeading: string;
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-semibold tracking-wide text-rose-500">
        {label}
      </h3>
      <p className="text-sm italic tracking-widest">{subHeading}</p>
    </div>
  );
};
