"use client";
import { useState, useCallback, useEffect, EmbedHTMLAttributes } from "react";
import styles from "@/styles/skills.module.css";
import { SkillDescription } from "../skills";
import { Button } from "./button";
import React from "react";
interface Props {
  skills: SkillDescription[];
}
export const SkillsShowcase: React.FC<Props> = ({ skills }) => {
  return (
    <>
      <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide">
        My current learning stack
      </div>
      <div className="grid grid-rows-2 grid-flow-col gap-5 content-center container">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="flex flex-col h-96 bg-black ring-2 gap-5 ring-blue-300 rounded-tl-xl rounded-sm p-10"
          >
            <div className="inline-flex space-x-5 p-5 justify-center">
              {skill.headerIcons.map((headerIcon, index) =>
                //if headericon is ',' dont clone it
                React.cloneElement(headerIcon, { key: index })
              )}
              ,
            </div>
            <div className="w-full border-t-2 border-blue-400"></div>
            <div className="inline-flex justify-between tracking-wider text-2xl text-blue-400">
              <div>{skill.type}</div>
              <div>{skill.skillLength}</div>
            </div>
            <div className="w-full">{skill.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};
