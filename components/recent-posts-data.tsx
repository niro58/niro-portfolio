import { GetPosts } from "@/lib/api-utils/api-utils-post";
import { Frontmatter, PostType } from "@/lib/post-interfaces";
import { BookOpen } from "lucide-react";
import path from "path";
import { FaBook, FaBriefcase, FaFileAlt } from "react-icons/fa";

import { PostDescription } from "./post-description";
import { Skeleton } from "./ui/skeleton";

export const PostSkeleton = () => (
  <div className="w-full bg-transparent border border-primary-foreground rounded-lg p-5">
    <Skeleton className="h-32 w-full" />
    <div className="flex flex-col mt-8 gap-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="h-5 w-3/4" />
    </div>
  </div>
);

export async function PostSection({
  type,
  rows
}: {
  type: PostType;
  rows: number;
}): Promise<JSX.Element> {
  const postsData = GetPosts(type, rows);
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
