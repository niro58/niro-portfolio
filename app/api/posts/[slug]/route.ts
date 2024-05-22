import { postsRootDir } from "@/lib/post-interfaces";
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

interface Context {
  params: {
    slug: string;
  };
}
export async function GET(request: Request, context: Context) {
  try {
    const { slug } = context.params;
    const correctedSlug = slug.replace(/\.mdx$/, "") + ".mdx";
    const dir = path.join(postsRootDir, correctedSlug);
    await fs.access(dir);
    const raw = await fs.readFile(dir, "utf-8");
    const { data: frontmatter, content } = matter(raw);
    if (frontmatter.start_date && frontmatter.start_date instanceof Date) {
      frontmatter.start_date = frontmatter.start_date.toISOString();
    }
    return Response.json({
      frontmatter,
      content
    });
  } catch (error) {
    return Response.json({ error: "Error fetching post" }, { status: 500 });
  }
}
