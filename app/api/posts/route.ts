import { Frontmatter, postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
interface PostOutput {
  slug: string;
  frontmatter: Frontmatter;
}
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const rootPath = process.env.NEXT_ROOT_PATH;

  if (!rootPath) {
    return new Response("Internal server error", { status: 500 });
  }

  const apiPath = path.join(rootPath, "api", "posts");

  try {
    const files = await fs.readdir(postsRootDir);
    let posts: PostOutput[] = [];

    for (let i in files) {
      const postData = await fetch(`${apiPath}/${files[i]}`);
      if (!postData.ok) {
        return new Response("Error Fetching Posts", { status: 500 });
      }
      const { frontmatter } = await postData.json();
      const post: PostOutput = {
        slug: files[i].replace(/\.mdx$/, ""),
        frontmatter: frontmatter
      };
      posts.push(post);
    }
    return new Response(JSON.stringify(posts), {
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    console.log(error);
    return new Response("Error Fetching Posts", { status: 500 });
  }
}
