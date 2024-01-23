"use client";

import { ArchivedSkills } from "@/data/archived-skills";
import { ActiveSkills } from "@/data/active-skills";

import React, { useCallback, useEffect, useState } from "react";
import { SkillsShowcase } from "./ui/skills-showcase";
export interface SkillDescription {
  id: string;
  type: string;
  description: string;
  skillLength: string;
  headerIcons: JSX.Element[];
  headerIconsTooltip: string[];
}
export const Skills: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-24">
      <SkillsShowcase skills={ActiveSkills} />
      <SkillsShowcase skills={ArchivedSkills} />
    </div>
  );
};
