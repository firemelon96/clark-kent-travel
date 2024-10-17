import { IconType } from "react-icons";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { BiCheckCircle, BiHelpCircle, BiXCircle } from "react-icons/bi";

interface InclusionsType {
  inclusions: string[];
}

const Inclusions = ({ inclusions }: InclusionsType) => {
  return (
    <div className="flex flex-col gap-2 bg-sky-50 p-4">
      <h5 className="text-xl font-semibold uppercase">Inclusions</h5>
      <ul className="text-xl">
        {inclusions.map((item) => (
          <li key={item} className="flex items-start text-xl">
            <BiCheckCircle className="mr-2 size-4" />
            <span className="flex-1 text-sm text-slate-600">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Inclusions;
