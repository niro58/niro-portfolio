import { useState, useCallback, useEffect, EmbedHTMLAttributes } from "react";
import styles from "@/styles/skills.module.css";
import { SkillDescription } from "../skills";
import { Button } from "./button";
interface Props {
  skills: SkillDescription[];
}
export const SkillsShowcase: React.FC<Props> = ({ skills }) => {
  const [slidesOpacity, setSlidesOpacity] = useState<
    { index: number; opacity: number }[]
  >(
    Array.from({ length: skills.length }, (_, index) => ({
      index,
      opacity: index === 0 ? 1 : 0.1,
    }))
  );
  const updateSlidesOpacity = useCallback((index: number) => {
    setSlidesOpacity((prev) =>
      prev.map((slide) => ({
        ...slide,
        opacity: slide.index === index ? 1 : 0.1,
      }))
    );
  }, []);

  return <div></div>;
};
