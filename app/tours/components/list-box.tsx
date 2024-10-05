import { IconType } from "react-icons";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiCheckCircle, BiHelpCircle, BiXCircle } from "react-icons/bi";
import { MdOutlineStickyNote2 } from "react-icons/md";

interface ListBoxType {
  type: "Inclusion" | "Exclusion" | "Reminder" | "Notes";
  items: string[];
}

const ListBox = ({ type, items }: ListBoxType) => {
  const exclude = type === "Exclusion" && "text-rose-800 fill-rose-800";
  const include = type === "Inclusion" && "text-sky-800 fill-sky-800";
  const remind = type === "Reminder" && "text-primary";

  let Icon: IconType;
  Icon = type === "Inclusion" ? BiCheckCircle : AiOutlineExclamationCircle;

  return (
    <div className="flex flex-col gap-2 bg-sky-50 p-4">
      <h5 className={`text-xl font-semibold uppercase ${include} ${exclude}`}>
        {type}
      </h5>
      <ul className="text-xl">
        {items.map((item) => (
          <li key={item} className="flex items-start text-xl">
            <Icon className={`${exclude} ${include} mr-2 size-4`} />{" "}
            <span className="flex-1 text-sm text-slate-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListBox;
