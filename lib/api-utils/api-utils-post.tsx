import { Frontmatter, PostType, blank_frontmatter } from "../post-interfaces";

export async function GetPosts(
  type?: PostType,
  limit?: number
): Promise<OutputPost[]> {
  const url = new URL("/api/posts", process.env.NEXT_ROOT_PATH);

  const res = await fetch(url.href, {
    method: "GET"
  });
  if (!res.ok) {
    return [];
  }
  const posts = await res.json();
  for (let post of posts) {
    post.frontmatter.date = new Date(post.frontmatter.date);
  }

  posts.sort((a: OutputPost, b: OutputPost) => {
    return b.frontmatter.date.getTime() - a.frontmatter.date.getTime();
  });
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
