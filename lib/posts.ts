import { promises as fs } from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

export type Frontmatter = {
  title: string;
  date: string;
};

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};
export async function getPost(filepath: string): Promise<Post<Frontmatter>> {
  const raw = await fs.readFile(filepath, "utf-8");

  const serialized = await serialize(raw, {
    parseFrontmatter: true
  });
  const frontmatter = serialized.frontmatter as Frontmatter;

  // Return the serialized content and frontmatter
  return {
    frontmatter,
    serialized
  };
}
interface PageProps {
  slug: string;
}
