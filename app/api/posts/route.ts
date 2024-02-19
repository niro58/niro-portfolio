import { Frontmatter, PostType, postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import { NextApiRequest } from "next";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";

interface PostOutput {
  slug: string;
  frontmatter: Frontmatter;
}
export async function GET(request: NextApiRequest) {
  //const type: PostType = request.query.type as PostType;
  //const limit: number = Number(request.query.limit);
  const type: PostType = PostType.POST;
  const limit: number = Number(5);
  const rootApiPath = process.env.NEXT_API_PATH;

  if (!rootApiPath || !type || !limit) {
    return Response.error();
  }

  const apiPath = path.join(rootApiPath, "posts");

  try {
    const files = await fs.readdir(postsRootDir);
    let posts: PostOutput[] = [];

    for (let i in files) {
      const postData = await fetch(`${apiPath}/${files[i]}`);

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
    return Response.json(posts);
  } catch (error) {
    console.log(error);
    return Response.error();
  }
}
