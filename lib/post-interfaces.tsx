import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";

export type Frontmatter = {
  title: string;
  start_date: Date;
  end_date: Date;
  short_description: string;
  categories: string[];
  images: string[];
};

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};
export const postsRootDir = path.join(process.cwd(), "posts");

export const blank_frontmatter: Frontmatter = {
  title: "",
  start_date: new Date(),
  end_date: new Date(),
  short_description: "",
  categories: [],
  images: []
};
