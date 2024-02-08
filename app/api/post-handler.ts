import { promises as fs } from "fs";
import matter from "gray-matter";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

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
export type Frontmatter = {
  title: string;
  date: Date;
  header_img: string;
  short_description: string;
  categories: Categories[];
  post_type: PostType;
};
export const blank_frontmatter: Frontmatter = {
  title: "",
  date: new Date(1970, 12, 31),
  header_img: "",
  short_description: "",
  categories: [],
  post_type: PostType.POST
};
export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};
export async function GetPost(filepath: string): Promise<Post<Frontmatter>> {
  try {
    await fs.access(filepath);
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
  } catch (error) {
    console.log(error);
    return {
      frontmatter: blank_frontmatter,
      serialized: {} as MDXRemoteSerializeResult
    };
  }
}
export async function GetPostFrontmatter(
  filepath: string
): Promise<Frontmatter> {
  try {
    await fs.access(filepath);
    const raw = await fs.readFile(filepath, "utf-8");

    const { data: frontmatter } = matter(raw);

    // Return the serialized content and frontmatter
    return frontmatter as Frontmatter;
  } catch (error) {
    console.log(error);
    return blank_frontmatter;
  }
}
export async function GetRecentPostsByType(
  limit: number,
  type: PostType
): Promise<Frontmatter[]> {
  try {
    const dir = "./posts";
    const files = await fs.readdir(dir);
    let postData: Frontmatter[] = [];
    for (let i = 0; i < limit; i++) {
      const file = files[i];
      const frontmatter = await GetPostFrontmatter(`${dir}/${file}`);
      if (frontmatter != blank_frontmatter) {
        postData.push(frontmatter);
      }
    }
    return postData;
  } catch (error) {
    console.log(error);
    return [];
  }
}
