import { Frontmatter, PostType, postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import { serialize } from "next-mdx-remote/serialize";

export async function GET(request: Request) {
  //const { type, limit } = await request.json();
  const type: PostType = PostType.POST;
  const limit: number = 5;
  if (!type || !limit) {
    return Response.json({ message: "error" });
  }

  try {
    const files = await fs.readdir(postsRootDir);
    let posts: Frontmatter[] = [];
    for (let i in files) {
      const postData = await fetch(`/api/posts/${files[i]}`);
      const { frontmatter } = await postData.json();
      if (frontmatter.post_type === type) {
        posts.push(frontmatter);
        if (posts.length === limit) {
          break;
        }
      }
    }
    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "error" });
  }
}
