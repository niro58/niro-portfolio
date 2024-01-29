import { MdxContent } from "@/components/mdx-content";
import { promises as fs } from "fs";
import { MDXRemoteSerializeResult } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";

export default async function Page({ slug }: { slug: string }) {
  // Get the serialized content and frontmatter
  const { serialized, frontmatter } = await getPost("content/" + slug + ".mdx");

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>{frontmatter.title}</h1>
      <p>Published {frontmatter.date}</p>
      <hr />
      <MdxContent source={serialized} />
    </div>
  );
}
