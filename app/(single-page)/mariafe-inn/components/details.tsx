interface DetailsType {
  title: string;
  content: string;
}

const Details = ({ title, content }: DetailsType) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-50 p-4">
      <h5 className="text-xl font-semibold uppercase text-sky-800">{title}</h5>
      <p className="text-slate-400">{content}</p>
    </div>
  );
};

export default Details;
