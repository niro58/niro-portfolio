import { Frontmatter, PostType, postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import rehypePrism from 'rehype-prism-plus';
import rehypeCodeTitles from 'rehype-code-titles';
interface PostOutput {
  slug: string;
  frontmatter: Frontmatter;
}
export async function GET(req: NextRequest) {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }
  const type: PostType = req.nextUrl.searchParams.get("type") as PostType;
  const limit: Number = Number(req.nextUrl.searchParams.get("limit")) || 5;

  const rootPath = process.env.NEXT_ROOT_PATH;

  if (!rootPath || !type || !limit) {
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
      if (frontmatter.post_type === type) {
        const post: PostOutput = {
          slug: files[i].replace(/\.mdx$/, ""),
          frontmatter: frontmatter
        };
        posts.push(post);
        if (posts.length === limit) {
          break;
        }
      }
    }
    return new Response(JSON.stringify(posts), {
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    console.log(error);
    return new Response("Error Fetching Posts", { status: 500 });
  }
}
