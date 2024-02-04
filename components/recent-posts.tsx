import { Frontmatter, getAllPosts } from "@/lib/posts";
import { use } from "react";

import { PostDescription } from "./post-description";

export default function RecentPosts() {
  const data: Frontmatter[] = use(getAllPosts(5));
  return (
    <div className="flex flex-col content-center min-h-screen p-10 bg-black">
      <div className="container">
        <div className="text-4xl text-primary tracking-wider pb-16">
          Recent Posts
        </div>
        <div>
          {data.map((post, index) => {
            return <PostDescription key={index} frontmatter={post} />;
          })}
        </div>
      </div>
    </div>
  );
}
