import { promises as fs } from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

enum Categories {
  GAME_DEV = "Game Development",
  SOFTWARE = "Software",
  UNITY = "Unity",
  DATA_ANALYSIS = "Data Analysis",
  PYTHON = "Python",
  CSHARP = "C#",
  JAVASCRIPT = "Javascript",
  REACT = "React",
  TYPESCRIPT = "Typescript",
  WEB_DEV = "Web Development",
  NEXT_JS = "Next.js",
  MACHINE_LEARNING = "Machine Learning"
}
export type Frontmatter = {
  title: string;
  date: Date;
  header_img: string;
  short_description: string;
  categories: Categories[];
};

export type Post<TFrontmatter> = {
  serialized: MDXRemoteSerializeResult;
  frontmatter: TFrontmatter;
};
export async function getPost(filepath: string): Promise<Post<Frontmatter>> {
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
      frontmatter: {
        title: "",
        date: new Date(1970, 12, 31),
        header_img: "",
        short_description: "",
        categories: []
      },
      serialized: {} as MDXRemoteSerializeResult
    };
  }
}
