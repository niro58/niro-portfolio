"use client";

import { ScrollContext } from "@/lib/scroll-observer";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GenerateHeaderID } from "./mdx-components";

interface TableOfContentsProps {
  content: string;
}
interface HeadingProps {
  id: string;
  text: string;
  level: number;
  yPos: number;
}
function getHeadings(content: string): HeadingProps[] | undefined {
  const regex = /#{1,6}.*/g;
  const headings = content.match(regex);
  if (!headings) return undefined;

  let h: HeadingProps[] = [];

  for (let i = 0; i < headings.length; i++) {
    const text = headings[i].replace(/#/g, "").trim();
    const level = headings[i].match(/#/g)?.length || 0;
    const id = GenerateHeaderID(text);
    const yPos = document.getElementById(id)?.offsetTop || 0;
    h.push({
      id: id,
      text: text,
      level: level,
      yPos: yPos
    });
  }
  h.sort((a, b) => a.yPos - b.yPos);
  return h;
}
export const TableOfContents: React.FC<TableOfContentsProps> = ({
  content
}) => {
  const { scrollY } = useContext(ScrollContext);
  const [headings, setHeadings] = useState<HeadingProps[]>();
  const [highlighted, setHighlighted] = useState<number>(-1);

  useEffect(() => {
    setHeadings(getHeadings(content));
  }, []);
  useEffect(() => {
    if (!headings) return;

    let newHighlighted = -1;
    for (let i = 0; i < headings?.length; i++) {
      const bottomScreen = scrollY + window.innerHeight;
      if (bottomScreen >= headings[i].yPos) {
        newHighlighted = i;
      }
    }
    setHighlighted(newHighlighted);
  }, [scrollY, headings]);
  return (
    <ul className="bg-primary/2 px-30 fixed bottom-0 right-32 top-0 flex w-32 flex-col justify-center">
      {headings?.map((heading, index) => (
        <li
          key={index}
          className={cn(
            "hover: inline-flex gap-3 rounded-xl text-neutral-400 transition-all hover:text-primary/50",
            highlighted === index && "font-bold text-primary"
          )}
          style={{
            paddingLeft: `${heading.level - 1}rem`,
            fontSize: `${1.75 - heading.level * 0.2}rem`
          }}
        >
          <Link href={`#${GenerateHeaderID(heading.text)}`}>
            {heading.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
