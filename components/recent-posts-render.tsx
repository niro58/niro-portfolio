"use client";

import { PostType } from "@/lib/post-interfaces";
import { FaBook, FaBriefcase, FaFileAlt } from "react-icons/fa";

import { PostSection } from "./recent-posts-data";

export default function RecentPostsRender() {
  const rows = 3;

  return (
    <div className="flex flex-col content-center min-h-screen py-24 bg-gradient-to-b from-background to-neutral-900">
      <div className="px-5">
        <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
          <div className="text-4xl font-thin tracking-wide">
            My recent projects
          </div>
          <div className="text-xl/relaxed font-normal text-neutral-500 tracking-normal">
            Here you can open and check out some of my recent projects
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 text-center py-5 text-4xl font-thin tracking-wide">
          <div className="flex items-center flex-col justify-center gap-3">
            <FaFileAlt size={48} className="inline-block text-neutral-400" />
            Posts
          </div>
          <div className="flex items-center flex-col justify-center gap-3">
            <FaBriefcase className="inline-block text-neutral-400" />
            Projects
          </div>
          <div className="flex items-center flex-col justify-center gap-3">
            <FaBook className="inline-block text-neutral-400" />
            Libaries
          </div>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 min-h-screen gap-5">
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.POST} rows={rows} />
          </div>
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.PROJECT} rows={rows} />
          </div>
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.POST} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}
