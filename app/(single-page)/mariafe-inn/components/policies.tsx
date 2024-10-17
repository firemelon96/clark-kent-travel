import { Policy } from "@/types/partners";
import { IconType } from "react-icons";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiCheckCircle, BiHelpCircle, BiXCircle } from "react-icons/bi";

interface ListType {
  datas: Policy[];
  title: string;
}

export const Policies = ({ datas, title }: ListType) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-50 p-4">
      <h5 className="text-xl font-semibold uppercase text-sky-800">{title}</h5>
      <ul className="text-xl">
        {datas.map((item) => (
          <div key={item.title}>
            <p className="text-md text-sky-700">{item.title}</p>
            <li className="flex items-start text-xl">
              <BiCheckCircle className="mr-2 size-4" />
              <span className="flex-1 text-sm text-slate-600">{item.list}</span>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};
