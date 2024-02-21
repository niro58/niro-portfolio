import { GetPosts } from "@/lib/api-utils/api-utils-post";
import { Frontmatter, PostType } from "@/lib/post-interfaces";
import { BookOpen } from "lucide-react";
import path from "path";
import { FaBook, FaBriefcase, FaFileAlt } from "react-icons/fa";

import { PostDescription } from "./post-description";
import { Skeleton } from "./ui/skeleton";

const PostSkeleton = () => (
  <div className="w-full bg-transparent border border-primary-foreground rounded-lg p-5">
    <Skeleton className="h-32 w-full" />
    <div className="flex flex-col mt-8 gap-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  </div>
);

async function PostSection({
  type,
  rows
}: {
  type: PostType;
  rows: number;
}): Promise<JSX.Element> {
  const postsData = GetPosts(type);
  const [posts] = await Promise.all([postsData]);
  return (
    <>
      {posts.map((post: { slug: string; frontmatter: Frontmatter }) => (
        <PostDescription
          key={post.slug}
          frontmatter={post.frontmatter}
          slug={post.slug}
        />
      ))}
    </>
  );
}
export default async function RecentPosts() {
  const rows = 3;

  return (
    <div className="flex flex-col content-center min-h-screen py-24 bg-gradient-to-b from-neutral-900 to-background">
      <div className="container">
        <div className="text-center w-full text-4xl mb-5 font-thin tracking-wide pt-24">
          <div className="text-4xl font-thin tracking-wide">
            My recent projects
          </div>
          <div className="text-xl/relaxed font-normal text-gray-600 tracking-normal">
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
          {/* {<div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.POST} rows={rows} />
          </div>
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.PROJECT} rows={rows} />
          </div>} */}
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.POST} rows={rows} />
          </div>
        </div>
      </div>
    </div>
  );
}
