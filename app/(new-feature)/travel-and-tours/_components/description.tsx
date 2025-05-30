"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  description: string;
}
export const Description = ({ description }: Props) => {
  const [isExpand, setIsExpand] = useState(false);

  const onClick = () => {
    setIsExpand((prev) => !prev);
  };
  return (
    <div>
      {!isExpand ? (
        <p className="line-clamp-3 text-justify text-slate-700">
          {description}
        </p>
      ) : (
        <p className="text-justify text-slate-700">{description}</p>
      )}
      <button className="text-sm text-blue-500" onClick={onClick}>
        {!isExpand ? "see more..." : "see less..."}
      </button>
    </div>
  );
};
