import { Frontmatter, PostType, blank_frontmatter } from "../post-interfaces";

export async function GetPosts(type: PostType, limit: number) {
  const url = new URL("/api/posts", process.env.NEXT_ROOT_PATH);
  const params = new URLSearchParams({ type: type, limit: limit.toString() });

  url.search = params.toString();
  const res = await fetch(url.href, {
    method: "GET"
  });
  if (!res.ok) {
    return "";
  }
  const posts = await res.json();
  return posts;
}
interface OutputPost {
  frontmatter: Frontmatter;
  content: string;
}
export async function GetPost(slug: string): Promise<OutputPost> {
  if (process.env.NEXT_ROOT_PATH === undefined)
    return { frontmatter: blank_frontmatter, content: "" };
  const url = new URL(`/api/posts/${slug}`, process.env.NEXT_ROOT_PATH);
  const res = await fetch(url, {
    method: "GET"
  });
  if (!res.ok) {
    return { frontmatter: blank_frontmatter, content: "" };
  }

  const post = await res.json();
  const { frontmatter, content } = post;
  if (frontmatter.date) {
    frontmatter.date = new Date(frontmatter.date);
  }
  return { frontmatter, content: content };
}
