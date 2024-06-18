"use client"
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { ReactNode, useState } from "react";
import { Button } from "./ui/button";

export function CopyButton({ children }: { children: ReactNode }) {

  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="icon"
      className="absolute right-2 top-2 rounded-lg bg-primary/50 transition-all hover:bg-primary/100"
      onClick={() => {
        navigator.clipboard.writeText(children as string);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? <FaRegCircleCheck /> : <MdContentCopy />}
    </Button>
  );
}
