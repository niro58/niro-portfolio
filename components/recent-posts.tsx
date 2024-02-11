import { Frontmatter, PostType } from "@/lib/post-interfaces";
import path from "path";

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
async function GetPosts(type: PostType) {
  if (process.env.NEXT_API_PATH === undefined) return;
  const url = path.join(process.env.NEXT_API_PATH, "posts");
  console.log(url);

  const res = await fetch(url, {
    method: "GET",
    body: JSON.stringify({ type, limit: 5 })
  });
  const posts = await res.json();
  return posts;
}
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
      {postsData === undefined
        ? Array.from({ length: rows }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map((post: Frontmatter) => (
            <PostDescription key={post.title} frontmatter={post} />
          ))}
    </>
  );
}
export default async function RecentPosts() {
  const rows = 3;
  return (
    <div className="flex flex-col content-center min-h-screen py-24 bg-black">
      <div className="container">
        <div className="grid grid-cols-2 items-center tracking-wider pb-16">
          <div className="text-4xl text-primary">Recent</div>
          <div className="text-2xl text-end  tracking-wider">
            View all &gt;&gt;
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 text-center text-2xl py-5 tracking-wide">
          <span>Posts</span>
          <span>Projects</span>
          <span>Libaries</span>
        </div>
        <div className="grid grid-cols-3 grid-rows-1 min-h-screen gap-5">
          {/* <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.POST} rows={rows} />
          </div>
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.PROJECT} rows={rows} />
          </div>
          <div className="grid grid-rows-3 grid-cols-1 gap-5">
            <PostSection type={PostType.LIBRARY} rows={rows} />
  </div>*/}
        </div>
      </div>
    </div>
  );
}
