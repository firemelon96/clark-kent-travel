"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Copy, CopyCheck } from "lucide-react";

export const CopyText = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-3xl font-black tracking-wider md:text-4xl">
        {text}
      </span>

      <Button className="z-10" type="button" onClick={handleCopy}>
        {copied ? (
          <CopyCheck className="size-9" />
        ) : (
          <Copy className="size-9" />
        )}
      </Button>
    </div>
  );
};
