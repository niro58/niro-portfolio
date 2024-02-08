import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";

export type Frontmatter = {
  title: string;
  date: Date;
  header_img: string;
  short_description: string;
  categories: Categories[];
  post_type: PostType;
};

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};
export const postsRootDir = path.join(process.cwd(), "posts");

enum Categories {
  GAME_DEV = "Game Development",
  SOFTWARE = "Software",
  UNITY = "Unity",
  DATA_ANALYSIS = "Data Analysis",
  PYTHON = "Python",
  CSHARP = "C#",
  WEB_DEV = "Web Development",
  NOSQL = "NoSQL",
  SQL = "SQL",
  MACHINE_LEARNING = "Machine Learning",
  DESIGN = "Design",
  FIGMA = "Figma",
  MODELLING3D = "3D Modelling"
}
export enum PostType {
  POST = "Post",
  PROJECT = "Project",
  LIBRARY = "Library"
}

export const blank_frontmatter: Frontmatter = {
  title: "",
  date: new Date(1970, 12, 31),
  header_img: "",
  short_description: "",
  categories: [],
  post_type: PostType.POST
};
