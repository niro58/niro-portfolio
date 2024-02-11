import { Frontmatter, PostType, postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

export async function GET(request: Request) {
  const { type, limit } = await request.json();

  const rootApiPath = process.env.NEXT_API_PATH;

  if (!rootApiPath || !type || !limit) {
    return Response.json({ message: "error" });
  }

  const apiPath = path.join(rootApiPath, "posts");

  try {
    const files = await fs.readdir(postsRootDir);
    let posts: Frontmatter[] = [];
    for (let i in files) {
      const postData = await fetch(`${apiPath}/${files[i]}`);

      const { frontmatter } = await postData.json();
      if (frontmatter.post_type === type) {
        posts.push(frontmatter);
        if (posts.length === limit) {
          break;
        }
      }
    }
    console.log(posts);
    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "error" });
  }
}
